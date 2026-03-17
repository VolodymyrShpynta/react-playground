import { useTheme, type Theme } from "@mui/material/styles";
import { IconButton, Tooltip, Typography, type TooltipProps } from "@mui/material";
import { colorTokens } from "../../theme";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import Box from "@mui/material/Box";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  menuClasses,
  sidebarClasses,
  type MenuItemStyles,
} from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

/** A single navigation entry in the sidebar. */
interface SidebarItemConfig {
  title: string
  to: string
  icon: ReactNode
}

/** A labelled group of navigation items. `heading` is hidden when the sidebar is collapsed. */
interface SidebarSectionConfig {
  heading?: string
  items: SidebarItemConfig[]
}

/** Props forwarded from the parent Sidebar to each individual nav item. */
interface SidebarItemProps {
  item: SidebarItemConfig
  /** Whether the sidebar is currently in collapsed (icon-only) mode. */
  isCollapsed: boolean
  /** Whether this item's route matches the current URL. */
  isActive: boolean
  /** Shared tooltip appearance — memoised by the parent to keep the object reference stable. */
  tooltipSlotProps: TooltipProps['slotProps']
}

const SIDEBAR_MIN_WIDTH = 180
const SIDEBAR_MAX_WIDTH = 480
const SIDEBAR_DEFAULT_WIDTH = 250
const SIDEBAR_COLLAPSED_WIDTH = 80

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

type ColorTokens = ReturnType<typeof colorTokens>

/**
 * Builds the slotProps for the collapsed-mode Tooltip, styled to match the sidebar theme.
 * Extracted as a pure factory so the useMemo call site stays concise.
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
      boxShadow: `0 8px 24px ${colors.primary[900]}66`,
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

/**
 * Builds the react-pro-sidebar `MenuItemStyles` object.
 * `isCollapsed` drives all layout branching: padding, icon sizing, and label visibility.
 * Extracted as a pure factory so the `useMemo` call site stays concise.
 */
const buildMenuItemStyles = (
  colors: ColorTokens,
  isCollapsed: boolean,
  sidebarWidth: number
): MenuItemStyles => {
  // Scale left padding proportionally to sidebar width (clamped to a sensible range)
  const dynamicPaddingLeft = Math.round(sidebarWidth * 0.07)

  return {
    button: {
      padding: isCollapsed ? '8px 0' : `5px 20px 5px ${dynamicPaddingLeft}px`,
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      margin: isCollapsed ? '4px 8px' : '4px 12px',
      borderRadius: '10px',
      boxSizing: 'border-box',
      color: colors.grey[100],
      backgroundColor: 'transparent',
      transition: 'background-color 120ms ease, color 120ms ease',
      // react-pro-sidebar injects inline padding styles that take precedence;
      // !important is the only reliable way to override them.
      paddingLeft: isCollapsed ? '0 !important' : `${dynamicPaddingLeft}px !important`,
      paddingRight: isCollapsed ? '0 !important' : '20px !important',
      '&:hover': {
        // 1F ≈ 12 % opacity — subtle highlight without washing out the icon colour
        backgroundColor: `${colors.blueAccent[500]}1F`,
        color: `${colors.blueAccent[400]} !important`,
      },
      [`&.${menuClasses.active}`]: {
        // 30 ≈ 19 % opacity — stronger fill for the active item
        backgroundColor: `${colors.blueAccent[500]}30`,
        color: `${colors.blueAccent[500]} !important`,
        // Use an inset box-shadow to simulate a border without affecting layout.
        // Collapsed: full outline ring; expanded: left-edge accent strip.
        boxShadow: `inset 0 0 0 2px ${colors.blueAccent[500]}`,
      },
    },
    icon: {
      marginRight: isCollapsed ? '0 !important' : undefined,
      minWidth: isCollapsed ? '100%' : undefined,
      width: isCollapsed ? '100%' : undefined,
      display: 'flex',
      justifyContent: 'center',
    },
    label: {
      display: isCollapsed ? 'none' : undefined,
    },
  }
}

/**
 * Builds the `rootStyles` object for the `ProSidebar` container.
 * Removes the default border, applies rounded corners, and clips overflow so the inner
 * container's background respects the radius. Sizing and background are applied on the
 * inner `.${sidebarClasses.container}` so the outer wrapper stays dimension-neutral.
 * Extracted as a pure factory so the `useMemo` call site stays concise.
 */
const buildSidebarRootStyles = (colors: ColorTokens) => ({
  borderRight: 'none',
  borderTopRightRadius: '6px',
  borderBottomRightRadius: '6px',
  overflow: 'hidden',
  [`&.${sidebarClasses.rtl}`]: {
    borderLeft: 'none',
  },
  [`.${sidebarClasses.container}`]: {
    height: 'auto',
    minHeight: '100vh',
    backgroundColor: colors.primary[400],
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
  },
})

/**
 * Returns `true` when `to` matches the current `pathname`.
 * The root route requires an exact match to prevent it from activating on every path.
 */
const isRouteActive = (to: string, pathname: string): boolean =>
  to === '/' ? pathname === '/' : pathname.startsWith(to)

interface SidebarUserProfileProps {
  colors: ColorTokens
}

/** Displays the avatar, name, and role below the header when the sidebar is expanded. */
const SidebarUserProfile = ({ colors }: SidebarUserProfileProps) => (
  <Box mb="25px">
    <Box display="flex" justifyContent="center" alignItems="center">
      <img
        alt="profile-user"
        width="100px"
        height="100px"
        src="../../assets/user.png"
        style={{ cursor: 'pointer', borderRadius: '50%' }}
      />
    </Box>
    <Box textAlign="center">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: '10px 0 0 0' }}
      >
        Ed Roh
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[500]}>
        VP Fancy Admin
      </Typography>
    </Box>
  </Box>
)

/**
 * A single row in the sidebar navigation.
 * When collapsed, the label is hidden via `menuItemStyles.label` (CSS) and a Tooltip is added
 * so the title stays accessible. The `Box component="span"` wrapper is required so MUI Tooltip
 * can attach its ref.
 */
const SidebarItem = ({ item, isCollapsed, isActive, tooltipSlotProps }: SidebarItemProps) => {
  const menuItem = (
    <MenuItem
      active={isActive}
      icon={item.icon}
      component={<NavLink end={item.to === '/'} to={item.to} />}
    >
      {/* Always rendered — menuItemStyles.label controls visibility via display:none */}
      <Typography>{item.title}</Typography>
    </MenuItem>
  )

  if (!isCollapsed) {
    return menuItem
  }

  return (
    <Tooltip title={item.title} placement="right" arrow slotProps={tooltipSlotProps}>
      <Box component="span" sx={{ display: 'block' }}>
        {menuItem}
      </Box>
    </Tooltip>
  )
}

/**
 * Collapsible navigation sidebar.
 *
 * Expanded: shows icon + label + section headings + user profile.
 * Collapsed: shows icon only; each item gains a Tooltip for accessibility.
 *
 * Styling is driven by three pure factory functions (`buildTooltipSlotProps`,
 * `buildMenuItemStyles`, `buildSidebarRootStyles`) that are each wrapped in
 * `useMemo` to avoid re-creating style objects on every render.
 */
const Sidebar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const colors = useMemo(() => colorTokens(theme.palette.mode), [theme.palette.mode]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH)
  const isResizingRef = useRef(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(SIDEBAR_DEFAULT_WIDTH)
  const handleToggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), [])

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      isResizingRef.current = true
      startXRef.current = e.clientX
      startWidthRef.current = sidebarWidth
      e.preventDefault()
    },
    [sidebarWidth]
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return
      const delta = e.clientX - startXRef.current
      const newWidth = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, startWidthRef.current + delta)
      )
      setSidebarWidth(newWidth)
    }
    const handleMouseUp = () => {
      isResizingRef.current = false
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Memoised to keep the object reference stable across renders.
  // A new object on every render would cause Emotion to re-hash the styles unnecessarily.
  const tooltipSlotProps = useMemo(
    () => buildTooltipSlotProps(colors, theme),
    [colors, theme]
  )

  // Memoised to avoid recalculating CSS strings on every render; only changes
  // when the colour theme, collapse state, or sidebar width changes.
  const menuItemStyles = useMemo(
    () => buildMenuItemStyles(colors, isCollapsed, sidebarWidth),
    [colors, isCollapsed, sidebarWidth]
  )

  // Memoised for the same reason — rootStyles only depends on the colour theme.
  const rootStyles = useMemo(
    () => buildSidebarRootStyles(colors),
    [colors]
  )

  return (
    // The Box wrapper is intentional — it prevents ProSidebar from being a direct flex
    // child of .app, which would clamp its height to 100vh and break internal scrolling.
    <Box sx={{ position: 'relative' }}>
      <ProSidebar
        collapsed={isCollapsed}
        width={`${sidebarWidth}px`}
        collapsedWidth={`${SIDEBAR_COLLAPSED_WIDTH}px`}
        rootStyles={rootStyles}
      >
        <Menu menuItemStyles={menuItemStyles}>
          {/* Header: collapse toggle + branding */}
          {/* MenuItem is from react-pro-sidebar (not MUI) so it only accepts style, not sx */}
          <MenuItem
            onClick={handleToggleSidebar}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography
                  variant="h4"
                  noWrap
                  sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  ADMIN PANEL
                </Typography>
                <IconButton
                  aria-label="Toggle sidebar"
                  sx={{ color: colors.grey[100] }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && <SidebarUserProfile colors={colors} />}

          {sections.map((section) => (
            <Box key={section.heading ?? section.items[0].to}>
              {!isCollapsed && section.heading && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 0', pl: `${Math.round(sidebarWidth * 0.07)}px` }}
                >
                  {section.heading}
                </Typography>
              )}

              {section.items.map((item) => (
                <SidebarItem
                  key={item.to}
                  item={item}
                  isCollapsed={isCollapsed}
                  isActive={isRouteActive(item.to, pathname)}
                  tooltipSlotProps={tooltipSlotProps}
                />
              ))}
            </Box>
          ))}
        </Menu>
      </ProSidebar>

      {!isCollapsed && (
        <Box
          onMouseDown={handleResizeStart}
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            // Position at the right edge of the sidebar
            left: `${sidebarWidth - 5}px`,
            width: '5px',
            cursor: 'col-resize',
            zIndex: 10,
            transition: 'background-color 120ms ease',
            '&:hover': {
              backgroundColor: `${colors.blueAccent[500]}80`,
            },
          }}
        />
      )}
    </Box>
  )
}

export default Sidebar;