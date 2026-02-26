import { AppBar, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material"
import HealingIcon from '@mui/icons-material/Healing';
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const MuiNavbar = () => {
  /*
    BUTTON ↔ MENU WIRING
    ─────────────────────
    anchorEl stores a reference to the DOM element the menu should appear below.
    - null  → menu is closed
    - <element> → menu is open, positioned relative to that element

    Full lifecycle:
      1. User clicks "Resources" button
      2. handleMenuClick stores event.currentTarget (the button DOM node) in anchorEl
      3. isMenuOpen becomes true → Menu renders, anchored below the button
      4. User clicks a MenuItem or outside → handleCloseMenu sets anchorEl to null
      5. isMenuOpen becomes false → Menu disappears
  */
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const isMenuOpen = Boolean(anchorEl)

  // Stores the clicked button as the anchor point for the Menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // Resets the anchor, which closes the Menu
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="health app logo" size="large">
          <HealingIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Health App
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">About</Button>
          <Button
            color="inherit"
            id='resources-button'
            onClick={handleMenuClick}
            // ARIA ATTRIBUTES — for screen reader accessibility:
            // aria-controls: tells screen readers which menu element this button controls (linked by id)
            //                only set when the menu is open, otherwise undefined
            // aria-haspopup: signals that clicking this button opens a popup/menu
            // aria-expanded: tells screen readers whether the menu is currently open or closed
            aria-controls={isMenuOpen ? 'resources-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Resources
          </Button>
          <Button color="inherit">Login</Button>
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          slotProps={{
            list: {
              // aria-labelledby links the menu list back to the button that opened it
              // screen readers will announce the button label when navigating the menu
              'aria-labelledby': 'resources-button'
            }
          }}
          /*
            MENU POSITIONING
            ─────────────────────────────────────────────────────────────
            anchorOrigin:    the point ON THE BUTTON where the menu attaches
            transformOrigin: the point ON THE MENU that aligns to anchorOrigin

            Current config: both right-aligned → menu drops down flush with
            the right edge of the button.

            Examples:
              anchorOrigin   {{ vertical: 'bottom', horizontal: 'left'  }}  → menu aligns to bottom-left of button
              transformOrigin{{ vertical: 'top',    horizontal: 'left'  }}  → menu's top-left anchors there

              anchorOrigin   {{ vertical: 'bottom', horizontal: 'center' }} → centered below button
              transformOrigin{{ vertical: 'top',    horizontal: 'center' }}

            For full positioning docs see:
            https://mui.com/material-ui/react-popover/
          */
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleCloseMenu}>Blog</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Podcast</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Newsletter</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}