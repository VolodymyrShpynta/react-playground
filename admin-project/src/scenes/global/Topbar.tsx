import { useContext } from "react";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { ColorModeToggleContext } from "../../theme";
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const Topbar = () => {
  const theme = useTheme();
  const colorModeToggle = useContext(ColorModeToggleContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search bar */}
      <Box
        display="flex"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "3px"
        }}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorModeToggle.toggleColorMode}>
          {theme.palette.mode === "dark"
            ? (<DarkModeIcon />)
            : (<LightModeIcon />)}
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <PersonIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar;