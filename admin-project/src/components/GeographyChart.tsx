/**
 * GeographyChart — An interactive choropleth world map built with D3-geo.
 *
 * How it works:
 * 1. **GeoJSON data** (`mockGeoFeatures`) contains polygon shapes for every country.
 *    Each feature has an `id` (ISO 3166-1 alpha-3 code, e.g. "USA", "FRA").
 *
 * 2. **Value data** (`mockGeographyData`) maps each country `id` to a numeric value
 *    in the range [0, `DOMAIN_MAX`].
 *
 * 3. **D3-geo projection** (`geoMercator`) converts lat/lng coordinates into SVG pixel
 *    positions. `scale` controls zoom level, `translate` shifts the map center within
 *    the SVG viewBox (`VIEW_WIDTH` × `VIEW_HEIGHT`).
 *
 * 4. **`geoPath`** takes the projection and converts each GeoJSON feature into an SVG
 *    `<path d="...">` string that the browser renders as a country shape.
 *
 * 5. **Color mapping** uses a stepped scale: the value range is divided into
 *    `COLOR_STOPS.length` equal buckets, each assigned a color from `COLOR_STOPS`
 *    (light grey-blue → deep teal). Countries without data get a neutral grey fill
 *    via `theme.palette.grey[600]`.
 *
 * 6. **Zoom** (full-page mode only) — `ZoomControls` provides +/− buttons that
 *    adjust the Mercator projection `scale` within [`MIN_SCALE`, `MAX_SCALE`].
 *
 * 7. **Pan** (full-page mode only) — click-and-drag on the SVG tracks a pixel offset
 *    (`offset` state) that shifts the projection `translate`. A ref (`dragStart`)
 *    captures the initial mouse position to avoid accumulated drift. `isDragging`
 *    state drives the cursor style (`grab` ↔ `grabbing`).
 *
 * 8. **Legend** (`Legend` component, full-page mode only) shows the color scale with
 *    formatted value ranges, pre-computed in `LEGEND_ITEMS`.
 *
 * Props:
 * - `isDashboard` — when true, uses a smaller projection scale, disables zoom/pan
 *   controls, and hides the legend. Suitable for embedding in a dashboard card.
 */

import { useCallback, useMemo, useRef, useState } from 'react'
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { geoPath, geoMercator } from 'd3-geo'
import type { Feature, Geometry } from 'geojson'
import { geoFeatures } from '../data/mockGeoFeatures'
import { mockGeographyData as data } from '../data/mockData'

/** Upper bound of the data domain — values are expected in the range [0, DOMAIN_MAX] */
const DOMAIN_MAX = 1_000_000

/** SVG viewBox dimensions used for projection calculations */
const VIEW_WIDTH = 800
const VIEW_HEIGHT = 450

const DEFAULT_SCALE = 100
const DASHBOARD_SCALE = 40
/** Zoom increment per button click */
const ZOOM_STEP = 20
/** Minimum allowed projection scale (most zoomed out) */
const MIN_SCALE = 40
/** Maximum allowed projection scale (most zoomed in) */
const MAX_SCALE = 300

/**
 * Stepped color palette from light grey-blue to deep teal.
 * Each entry corresponds to one value bucket (DOMAIN_MAX / COLOR_STOPS.length wide).
 */
const COLOR_STOPS = [
  '#cfd8dc', // 0–110k
  '#b0bec5', // 110k–220k
  '#90a4ae', // 220k–330k
  '#5b9bd5', // 330k–440k
  '#42a5f5', // 440k–560k
  '#1e88e5', // 560k–670k
  '#0d47a1', // 670k–780k
  '#00897b', // 780k–890k
  '#004d40', // 890k–1M
]

const BUCKET_SIZE = DOMAIN_MAX / COLOR_STOPS.length

/** Pre-computed legend items — static since COLOR_STOPS and DOMAIN_MAX never change */
const LEGEND_ITEMS = COLOR_STOPS.map((color, i) => ({
  color,
  label: `${formatValue(i * BUCKET_SIZE)} - ${formatValue((i + 1) * BUCKET_SIZE)}`,
}))

/** Formats a numeric value as "123k" or "1.0M" for legend labels */
function formatValue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`
  return `${value}`
}

/** Maps a value to its COLOR_STOPS index (0-based bucket) */
const getColorIndex = (value: number): number =>
  Math.min(Math.floor(value / BUCKET_SIZE), COLOR_STOPS.length - 1)

/** Extracts the feature id — GeoJSON features in our dataset carry `id` at the top level */
const getFeatureId = (feature: Feature): string =>
  String((feature as Feature & { id?: string }).id ?? '')

interface GeographyChartProps {
  isDashboard?: boolean
}

const GeographyChart = ({ isDashboard = false }: GeographyChartProps) => {
  const theme = useTheme()
  const [scale, setScale] = useState(isDashboard ? DASHBOARD_SCALE : DEFAULT_SCALE)

  // Pan state — offset is in screen pixels, converted to viewBox ratios when applied
  const [offset, setOffset] = useState<[number, number]>([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  // Ref (not state) to avoid re-renders on every mouse move during drag
  const dragStart = useRef<{ x: number; y: number; offset: [number, number] } | null>(null)

  // Pre-compute a lookup map for O(1) country value access
  const valueMap = useMemo(
    () => new Map(data.map((d) => [d.id, d.value])),
    [],
  )

  // Base position: ratio of the SVG viewBox — [0.5, 0.65] shifts the map up to show Antarctica
  const baseTranslate: [number, number] = isDashboard ? [0.49, 0.6] : [0.5, 0.65]
  // Final translate combines the base position with the user's drag offset (converted to ratios)
  const translate: [number, number] = [
    baseTranslate[0] + offset[0] / VIEW_WIDTH,
    baseTranslate[1] + offset[1] / VIEW_HEIGHT,
  ]

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + ZOOM_STEP, MAX_SCALE))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - ZOOM_STEP, MIN_SCALE))
  }, [])

  // Drag start: snapshot the mouse origin and current offset to compute deltas from
  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    dragStart.current = { x: e.clientX, y: e.clientY, offset: [...offset] }
    setIsDragging(true)
  }, [offset])

  // Drag move: compute delta from the snapshot and apply it (no accumulation drift)
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setOffset([
      dragStart.current.offset[0] + dx,
      dragStart.current.offset[1] + dy,
    ])
  }, [])

  // Drag end: clear the ref and reset cursor
  const handleMouseUp = useCallback(() => {
    dragStart.current = null
    setIsDragging(false)
  }, [])

  const getFill = (featureId: string) => {
    const value = valueMap.get(featureId)
    if (value == null) return theme.palette.grey[600]
    return COLOR_STOPS[getColorIndex(value)]
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        style={{
          width: '100%',
          height: '100%',
          cursor: isDashboard ? 'default' : isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={isDashboard ? undefined : handleMouseDown}
        onMouseMove={isDashboard ? undefined : handleMouseMove}
        onMouseUp={isDashboard ? undefined : handleMouseUp}
        onMouseLeave={isDashboard ? undefined : handleMouseUp}
      >
        <Paths
          features={geoFeatures.features}
          scale={scale}
          translate={translate}
          getFill={getFill}
          borderColor={theme.palette.common.white}
        />
      </svg>
      {!isDashboard && (
        <ZoomControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          disableZoomIn={scale >= MAX_SCALE}
          disableZoomOut={scale <= MIN_SCALE}
        />
      )}
      {!isDashboard && <Legend />}
    </Box>
  )
}

interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  disableZoomIn: boolean
  disableZoomOut: boolean
}

/** ZoomControls — floating +/− buttons (top-right) to adjust the projection scale */
const ZoomControls = ({ onZoomIn, onZoomOut, disableZoomIn, disableZoomOut }: ZoomControlsProps) => (
  <Box
    sx={{
      position: 'absolute',
      top: 16,
      right: 16,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 2,
    }}
  >
    <IconButton size="small" onClick={onZoomIn} disabled={disableZoomIn} aria-label="Zoom in">
      <AddIcon fontSize="small" />
    </IconButton>
    <IconButton size="small" onClick={onZoomOut} disabled={disableZoomOut} aria-label="Zoom out">
      <RemoveIcon fontSize="small" />
    </IconButton>
  </Box>
)

/** Legend — color scale key (bottom-left) showing value ranges for each `COLOR_STOPS` bucket */
const Legend = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 16,
      left: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 0.25,
    }}
  >
    {LEGEND_ITEMS.map(({ color, label }) => (
      <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{ width: 16, height: 16, bgcolor: color, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
          {label}
        </Typography>
      </Box>
    ))}
  </Box>
)

interface PathsProps {
  features: Feature<Geometry>[]
  scale: number
  translate: [number, number]
  getFill: (id: string) => string
  borderColor: string
}

/**
 * Paths — renders each GeoJSON feature as an SVG <path>.
 *
 * D3's geoMercator projection converts geographic coordinates (lat/lng) into
 * pixel positions within the SVG viewBox. geoPath then generates the SVG path
 * "d" attribute string for each country polygon.
 */
const Paths = ({ features, scale, translate, getFill, borderColor }: PathsProps) => {
  // Mercator projection: projects the spherical Earth onto a flat rectangle
  const projection = geoMercator()
    .scale(scale)
    .translate([VIEW_WIDTH * translate[0], VIEW_HEIGHT * translate[1]])

  // Converts GeoJSON geometry → SVG path "d" attribute using the projection
  const pathGenerator = geoPath().projection(projection)

  return (
    <g>
      {features.map((feature) => {
        const id = getFeatureId(feature)
        const name = feature.properties?.name ?? id
        const d = pathGenerator(feature) ?? undefined

        return (
          <Tooltip key={id} title={name} followCursor>
            <path
              d={d}
              fill={getFill(id)}
              stroke={borderColor}
              strokeWidth={1.5}
            />
          </Tooltip>
        )
      })}
    </g>
  )
}

export default GeographyChart