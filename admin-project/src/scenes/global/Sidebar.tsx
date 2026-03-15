import { useTheme } from "@mui/material/styles";
import { IconButton, Tooltip, Typography, type TooltipProps } from "@mui/material";
import { colorTokens } from "../../theme";
import { useMemo, useState, type ReactNode } from "react";
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
  isCollapsed: boolean
  isActive: boolean
  /** Shared tooltip appearance — memoised by the parent to avoid object churn. */
  tooltipSlotProps: TooltipProps['slotProps']
}

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

/**
 * Returns `true` when `to` matches the current `pathname`.
 * The root route requires an exact match to prevent it from activating on every path.
 */
const isRouteActive = (to: string, pathname: string): boolean =>
  to === '/' ? pathname === '/' : pathname.startsWith(to)

/**
 * A single row in the sidebar navigation.
 * When collapsed, the label is hidden and a Tooltip is added so the title stays accessible.
 * The `Box component="span"` wrapper is required so MUI Tooltip can attach its ref.
 */
const SidebarItem = ({ item, isCollapsed, isActive, tooltipSlotProps }: SidebarItemProps) => {
  const menuItem = (
    <MenuItem
      active={isActive}
      icon={item.icon}
      component={<NavLink end={item.to === '/'} to={item.to} />}
    >
      {!isCollapsed && <Typography>{item.title}</Typography>}
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

const Sidebar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const colors = useMemo(() => colorTokens(theme.palette.mode), [theme.palette.mode]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleSidebar = () => setIsCollapsed((prev) => !prev)

  // Memoised so the same object reference is passed to every SidebarItem,
  // preventing unnecessary Tooltip re-renders when the sidebar re-renders.
  const tooltipSlotProps = useMemo<TooltipProps['slotProps']>(
    () => ({
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
    }),
    [colors, theme]
  )

  // Memoised to avoid recalculating CSS strings on every render; only changes
  // when the colour theme or collapse state actually changes.
  const menuItemStyles = useMemo<MenuItemStyles>(
    () => ({
      button: {
        padding: isCollapsed ? '8px 0' : '5px 35px 5px 20px',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        margin: isCollapsed ? '4px 8px' : '4px 12px',
        borderRadius: '10px',
        boxSizing: 'border-box',
        color: colors.grey[100],
        backgroundColor: 'transparent',
        transition: 'background-color 120ms ease, color 120ms ease',
        // react-pro-sidebar injects inline padding styles that take precedence;
        // !important is the only reliable way to override them when collapsed.
        ...(isCollapsed && {
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
        }),
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
          ...(isCollapsed
            ? { boxShadow: `inset 0 0 0 2px ${colors.blueAccent[500]}` }
            : { boxShadow: `inset 3px 0 0 ${colors.blueAccent[500]}` }),
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
    }),
    [colors, isCollapsed]
  )

  return (
    <Box>
      <ProSidebar
        collapsed={isCollapsed}
        width="280px"
        collapsedWidth="80px"
        rootStyles={{
          height: 'auto',
          minHeight: '100vh',
          backgroundColor: colors.primary[400],
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
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
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
                  onClick={(event) => {
                    event.stopPropagation()
                    handleToggleSidebar()
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
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
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            {sections.map((section) => (
              <Box key={section.heading ?? section.items[0].to}>
                {!isCollapsed && section.heading && (
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
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
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar;