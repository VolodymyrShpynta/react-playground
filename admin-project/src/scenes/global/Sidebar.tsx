import { alpha, useTheme, type Theme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  type TooltipProps,
} from '@mui/material'
import { colorTokens } from '../../theme'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { useResizable } from '../../components/useResizable'
import { NavLink } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarItemConfig {
  title: string
  to: string
  icon: ReactNode
}

interface SidebarSectionConfig {
  heading?: string
  items: SidebarItemConfig[]
}

interface SidebarItemProps {
  item: SidebarItemConfig
  isCollapsed: boolean
  colors: ColorTokens
  dynamicPaddingLeft: number
  tooltipSlotProps: TooltipProps['slotProps']
}

interface SidebarUserProfileProps {
  colors: ColorTokens
}

type ColorTokens = ReturnType<typeof colorTokens>

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIDEBAR_MIN_WIDTH = 180
const SIDEBAR_MAX_WIDTH = 400
const SIDEBAR_DEFAULT_WIDTH = 250
const SIDEBAR_COLLAPSED_WIDTH = 80

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------

const sections: SidebarSectionConfig[] = [
  {
    items: [{ title: 'Dashboard', to: '/', icon: <HomeOutlinedIcon /> }],
  },
  {
    heading: 'Data',
    items: [
      { title: 'Manage Team', to: '/team', icon: <PeopleOutlinedIcon /> },
      { title: 'Contacts Information', to: '/contacts', icon: <ContactsOutlinedIcon /> },
      { title: 'Invoices Balances', to: '/invoices', icon: <ReceiptOutlinedIcon /> },
    ],
  },
  {
    heading: 'Pages',
    items: [
      { title: 'Profile Form', to: '/form', icon: <PersonOutlinedIcon /> },
      { title: 'Calendar', to: '/calendar', icon: <CalendarTodayOutlinedIcon /> },
      { title: 'FAQ Page', to: '/faq', icon: <HelpOutlineOutlinedIcon /> },
    ],
  },
  {
    heading: 'Charts',
    items: [
      { title: 'Bar Chart', to: '/bar', icon: <BarChartOutlinedIcon /> },
      { title: 'Pie Chart', to: '/pie', icon: <PieChartOutlineOutlinedIcon /> },
      { title: 'Line Chart', to: '/line', icon: <TimelineOutlinedIcon /> },
      { title: 'Geography Chart', to: '/geography', icon: <MapOutlinedIcon /> },
    ],
  },
]

// ---------------------------------------------------------------------------
// Typed shim — ListItemButton extends OverridableComponent and supports
// `component` at runtime, but TypeScript's overload resolution on
// ExtendButtonBase can't infer NavLink's extra props (`to`, `end`).
// This shim bridges the gap without `any` or `@ts-ignore`.
// ---------------------------------------------------------------------------

type NavListItemButtonProps = Omit<
  React.ComponentProps<typeof ListItemButton>,
  'component'
> & {
  component?: React.ElementType
  to?: string
  end?: boolean
}

const NavListItemButton = ListItemButton as React.ComponentType<NavListItemButtonProps>

// ---------------------------------------------------------------------------
// Style factories
// ---------------------------------------------------------------------------

/**
 * Builds the slotProps for the collapsed-mode Tooltip, styled to match the
 * sidebar theme. Extracted as a pure factory so the useMemo call site stays
 * concise and the object reference stays stable.
 */
const buildTooltipSlotProps = (
  colors: ColorTokens,
  theme: Theme
): TooltipProps['slotProps'] => ({
  tooltip: {
    sx: {
      ...theme.typography.body2,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: 1.35,
      px: 1.5,
      py: 1,
      backgroundColor: colors.primary[400],
      color: colors.grey[100],
      border: `1px solid ${colors.blueAccent[500]}`,
      boxShadow: `0 8px 24px ${alpha(colors.primary[900], 0.4)}`,
    },
  },
  arrow: {
    sx: {
      color: colors.primary[400],
      '&::before': {
        boxSizing: 'border-box',
        border: `1px solid ${colors.blueAccent[500]}`,
      },
    },
  },
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Avatar, name, and role displayed below the header when expanded. */
const SidebarUserProfile = ({ colors }: SidebarUserProfileProps) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        alt="profile-user"
        src="../../assets/user.png"
        sx={{ width: 100, height: 100, cursor: 'pointer' }}
      />
    </Box>
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mt: 1.25 }}>
        Ed Roh
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[500]}>
        VP Fancy Admin
      </Typography>
    </Box>
  </Box>
)

/**
 * A single nav row using MUI ListItemButton rendered as a NavLink.
 *
 * ListItemButton provides full MUI button semantics: ripple effect, focus
 * ring, keyboard activation (Enter/Space), and proper ARIA role. NavLink
 * automatically adds the `active` CSS class and `aria-current="page"` when
 * the route matches — the `&.active` selector in `sx` targets that class.
 *
 * When collapsed the item is wrapped in a Tooltip so the title stays accessible.
 */
const SidebarItem = ({
  item,
  isCollapsed,
  colors,
  dynamicPaddingLeft,
  tooltipSlotProps,
}: SidebarItemProps) => {
  const button = (
    <NavListItemButton
      component={NavLink}
      to={item.to}
      end={item.to === '/'}
      disableRipple={false}
      sx={{
        pl: isCollapsed ? 0 : `${dynamicPaddingLeft}px`,
        pr: isCollapsed ? 0 : '20px',
        py: '10px',
        my: '4px',
        mx: isCollapsed ? '8px' : '12px',
        borderRadius: '10px',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        color: colors.grey[100],
        transition: 'background-color 120ms ease, color 120ms ease',
        '&:hover': {
          backgroundColor: alpha(colors.blueAccent[500], 0.12),
          color: colors.blueAccent[400],
        },
        // NavLink adds .active when this route is current
        '&.active': {
          backgroundColor: alpha(colors.blueAccent[500], 0.19),
          color: colors.blueAccent[500],
          boxShadow: `inset 0 0 0 2px ${colors.blueAccent[500]}`,
          '&:hover': {
            backgroundColor: alpha(colors.blueAccent[500], 0.25),
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: isCollapsed ? 'unset' : '40px',
          color: 'inherit',
          justifyContent: 'center',
        }}
      >
        {item.icon}
      </ListItemIcon>

      {!isCollapsed && (
        <ListItemText
          primary={item.title}
          sx={{ my: 0, color: 'inherit' }}
        />
      )}
    </NavListItemButton>
  )

  if (!isCollapsed) return button

  return (
    <Tooltip title={item.title} placement="right" arrow slotProps={tooltipSlotProps}>
      {/* Box wrapper required so MUI Tooltip can attach its ref to a DOM node */}
      <Box>
        {button}
      </Box>
    </Tooltip>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Collapsible, resizable navigation sidebar built on MUI Drawer.
 *
 * - Collapsed: 80 px, icon-only with tooltips
 * - Expanded: 180–400 px (default 250 px), drag-to-resize right edge
 * - Dynamic left padding scales with sidebar width
 * - Active route highlighted with blue background + outline ring
 *
 * Drawer Paper is overridden to `position: relative` so the sidebar
 * lives in the normal document flow instead of being fixed.
 */
export const Sidebar = () => {
  const theme = useTheme()
  const colors = useMemo(() => colorTokens(theme.palette.mode), [theme.palette.mode])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { width: sidebarWidth, handleResizeStart } = useResizable({
    defaultWidth: SIDEBAR_DEFAULT_WIDTH,
    minWidth: SIDEBAR_MIN_WIDTH,
    maxWidth: SIDEBAR_MAX_WIDTH,
  })

  const handleToggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), [])

  const tooltipSlotProps = useMemo(
    () => buildTooltipSlotProps(colors, theme),
    [colors, theme]
  )

  const dynamicPaddingLeft = Math.round(sidebarWidth * 0.07)
  const currentWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : sidebarWidth

  return (
    <Box sx={{ display: 'flex', flexShrink: 0 }}>
      {/*
        variant="permanent" keeps the Drawer in the DOM without a backdrop.
        position: relative overrides Drawer's default fixed positioning so
        it participates in the .app flex layout instead of overlapping content.
        display: flex is needed because the Drawer's internal wrapper doesn't
        stretch to fill the parent height by default.
      */}
      <Drawer
        variant="permanent"
        sx={{ width: currentWidth, flexShrink: 0, display: 'flex' }}
        slotProps={{
          paper: {
            sx: {
              width: currentWidth,
              position: 'relative',
              overflowX: 'hidden',
              overflowY: 'auto',
              backgroundColor: colors.primary[400],
              borderRight: 'none',
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px',
              boxSizing: 'border-box',
              color: colors.grey[100],
            },
          },
        }}
      >
        {/* ── Header: collapse toggle + branding ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            m: '10px 12px 20px',
          }}
        >
          {isCollapsed ? (
            <IconButton onClick={handleToggleSidebar} aria-label="Toggle sidebar" sx={{ color: colors.grey[100] }}>
              <MenuOutlinedIcon />
            </IconButton>
          ) : (
            <>
              <Typography
                variant="h4"
                noWrap
                sx={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: colors.grey[100],
                  ml: '15px',
                }}
              >
                ADMIN PANEL
              </Typography>
              <IconButton
                onClick={handleToggleSidebar}
                aria-label="Toggle sidebar"
                sx={{ color: colors.grey[100] }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* ── User profile ── */}
        {!isCollapsed && <SidebarUserProfile colors={colors} />}

        {/* ── Navigation ── */}
        <List component="nav" disablePadding>
          {sections.map((section) => (
            <Box key={section.heading ?? section.items[0].to}>
              {!isCollapsed && section.heading && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 0', pl: `${dynamicPaddingLeft}px` }}
                >
                  {section.heading}
                </Typography>
              )}

              {section.items.map((item) => (
                <SidebarItem
                  key={item.to}
                  item={item}
                  isCollapsed={isCollapsed}
                  colors={colors}
                  dynamicPaddingLeft={dynamicPaddingLeft}
                  tooltipSlotProps={tooltipSlotProps}
                />
              ))}
            </Box>
          ))}
        </List>
      </Drawer>

      {/* ── Drag-to-resize handle ── */}
      {!isCollapsed && (
        <Box
          onMouseDown={handleResizeStart}
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: `${sidebarWidth - 5}px`,
            width: '5px',
            cursor: 'col-resize',
            zIndex: 1201,
            transition: 'background-color 120ms ease',
            '&:hover': {
              backgroundColor: alpha(colors.blueAccent[500], 0.5),
            },
          }}
        />
      )}
    </Box>
  )
}

export default Sidebar
