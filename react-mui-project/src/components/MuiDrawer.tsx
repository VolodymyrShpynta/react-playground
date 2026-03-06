import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

// MUI Drawer docs: https://mui.com/material-ui/react-drawer/
// Drawer slides in a panel from an edge of the screen.
// variant="temporary"  — overlays content, closes on backdrop click (default)
// variant="persistent" — pushes or overlaps content, stays open until explicitly closed
// variant="permanent"  — always visible, never closes

import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import StarIcon from '@mui/icons-material/Star'
import DeleteIcon from '@mui/icons-material/Delete'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type Anchor = 'left' | 'right' | 'top' | 'bottom'

// Reusable nav list used inside several drawers below
const NavList = ({ onClose }: { onClose?: () => void }) => (
  <Box role="presentation" onClick={onClose} sx={{ width: 250 }}>
    <List>
      {[
        { label: 'Inbox', icon: <InboxIcon /> },
        { label: 'Starred', icon: <StarIcon /> },
        { label: 'Sent mail', icon: <MailIcon /> },
      ].map(({ label, icon }) => (
        <ListItem key={label} disablePadding>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {[{ label: 'Trash', icon: <DeleteIcon /> }].map(({ label, icon }) => (
        <ListItem key={label} disablePadding>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
)

export const MuiDrawer = () => {
  // --- anchor demo state ---
  const [anchorOpen, setAnchorOpen] = useState<Record<Anchor, boolean>>({
    left: false,
    right: false,
    top: false,
    bottom: false,
  })

  const openAnchor = (anchor: Anchor) =>
    setAnchorOpen((prev) => ({ ...prev, [anchor]: true }))
  const closeAnchor = (anchor: Anchor) =>
    setAnchorOpen((prev) => ({ ...prev, [anchor]: false }))

  // --- persistent drawer state ---
  const [persistentOpen, setPersistentOpen] = useState(false)

  // --- custom width state ---
  const [wideOpen, setWideOpen] = useState(false)

  return (
    <Stack spacing={4}>

      {/* Temporary drawer — default variant, closes on backdrop click or Escape */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Temporary drawer (default) — anchor positions
        </Typography>
        <Stack direction="row" spacing={2}>
          {(['left', 'right', 'top', 'bottom'] as Anchor[]).map((anchor) => (
            <Box key={anchor}>
              <Button variant="outlined" onClick={() => openAnchor(anchor)}>
                Open {anchor}
              </Button>
              <Drawer
                anchor={anchor} // which edge the drawer should slide in from
                open={anchorOpen[anchor]}
                onClose={() => closeAnchor(anchor)}
              >
                <Typography variant="subtitle1" sx={{ p: 2 }}>
                  {anchor.charAt(0).toUpperCase() + anchor.slice(1)} drawer
                </Typography>
                <NavList onClose={() => closeAnchor(anchor)} />
              </Drawer>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Persistent drawer — stays open, does not close on backdrop click */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Persistent drawer — stays open until explicitly closed
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<MenuIcon />}
            onClick={() => setPersistentOpen(true)}
            disabled={persistentOpen}
          >
            Open
          </Button>
          {persistentOpen && (
            <Typography variant="body2" color="text.secondary">
              Drawer is open — click the arrow inside to close it
            </Typography>
          )}
        </Stack>
        <Drawer
          variant="persistent"
          anchor="left"
          open={persistentOpen}
        >
          {/* Persistent drawers need their own close control */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, pl: 1 }}>
              Navigation
            </Typography>
            <IconButton onClick={() => setPersistentOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Divider />
          <NavList />
        </Drawer>
      </Box>

      {/* Permanent drawer — always visible, no open/close state needed */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Permanent drawer — always visible
        </Typography>
        <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', height: 220 }}>
          <Drawer
            variant="permanent"
            // anchor is left by default
            sx={{
              width: 200,
              flexShrink: 0,            // prevent the drawer from shrinking when placed next to content
              position: 'relative',     // keep it inside the demo box
              '& .MuiDrawer-paper': {
                width: 200,
                position: 'relative',   // override fixed positioning for demo
                height: '100%',
              },
            }}
          >
            <NavList />
          </Drawer>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Main content area — the permanent drawer is always visible alongside it.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Custom width and styling via sx / slotProps.paper */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Custom width &amp; styling via <code>slotProps.paper.sx</code>
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ChevronRightIcon />}
          onClick={() => setWideOpen(true)}
        >
          Open wide drawer (400 px)
        </Button>
        <Drawer
          anchor="right"
          open={wideOpen}
          onClose={() => setWideOpen(false)}
          slotProps={{
            paper: {
              sx: {
                width: 400,
                backgroundColor: 'primary.dark',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': { color: 'primary.contrastText' }
              }
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Custom styled drawer
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Width, background color, and icon color are all set via{' '}
              <code>slotProps.paper.sx</code>.
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'primary.light' }} />
          <NavList onClose={() => setWideOpen(false)} />
        </Drawer>
      </Box>

    </Stack>
  )
}
