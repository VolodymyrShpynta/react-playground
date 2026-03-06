import { useState } from 'react'
import {
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from '@mui/material'

// MUI SpeedDial docs: https://mui.com/material-ui/react-speed-dial/
// SpeedDial is a Floating Action Button (FAB) that reveals a set of related actions on click.
// Required prop: ariaLabel (accessibility)
//
// Modern MUI v7 API for SpeedDialAction (all legacy direct props → slotProps):
//   slotProps.tooltip.title     — tooltip label  (replaces legacy tooltipTitle)
//   slotProps.tooltip.open      — always-visible label (replaces legacy tooltipOpen)
//   slotProps.tooltip.arrow     — show tooltip arrow pointer
//   slotProps.tooltip.placement — tooltip placement ('left' | 'right' | 'top' | 'bottom' …)
//   slotProps.fab               — props on the inner Fab button (replaces legacy FabProps)

import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import SaveIcon from '@mui/icons-material/Save'
import FavoriteIcon from '@mui/icons-material/Favorite'

// Common set of actions reused across demos
const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
]

// Helper: a Box that constrains the SpeedDial within the demo area
const DemoBox = ({ height = 200, children }: { height?: number; children: React.ReactNode }) => (
  <Box sx={{ position: 'relative', height, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}>
    {children}
  </Box>
)

export const MuiSpeedDial = () => {
  // --- controlled open state ---
  const [controlledOpen, setControlledOpen] = useState(false)

  // --- last clicked action feedback ---
  const [lastAction, setLastAction] = useState<string | null>(null)

  // --- hidden demo state ---
  const [hidden, setHidden] = useState(false)

  return (
    <Stack spacing={4}>

      {/* Basic SpeedDial — uncontrolled, direction defaults to "up" */}
      <Box>
        <Typography variant="h6" gutterBottom>Basic SpeedDial (uncontrolled)</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Click the button — actions expand upward by default.
        </Typography>
        <DemoBox>
          <SpeedDial
            ariaLabel="basic speed dial"
            icon={<SpeedDialIcon />}   // default: EditIcon (pencil) closed, animates to CloseIcon when open
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{ tooltip: { title: action.name, arrow: true } }}
              />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* direction prop — up | down | left | right */}
      <Box>
        <Typography variant="h6" gutterBottom>direction prop</Typography>
        <Stack spacing={2}>
          {/* up & down in taller boxes */}
          <Stack direction="row" spacing={2}>
            {(['up', 'down'] as const).map((dir) => (
              <Box key={dir} sx={{ flex: 1 }}>
                <Typography variant="body2" gutterBottom>direction="{dir}"</Typography>
                <DemoBox height={220}>
                  <SpeedDial
                    ariaLabel={`speed dial ${dir}`}
                    icon={<SpeedDialIcon />}
                    direction={dir}
                    sx={{
                      position: 'absolute',
                      ...(dir === 'up' && { bottom: 16, right: 16 }), // adds bottom+right only when dir==='up'
                      ...(dir === 'down' && { top: 16, right: 16 }), // adds top+right only when dir==='down'
                    }}
                  >
                    {actions.map((a) => (
                      <SpeedDialAction key={a.name} icon={a.icon} slotProps={{ tooltip: { title: a.name } }} />
                    ))}
                  </SpeedDial>
                </DemoBox>
              </Box>
            ))}
          </Stack>

          {/* left & right in wider, shorter boxes */}
          <Stack direction="row" spacing={2}>
            {(['left', 'right'] as const).map((dir) => (
              <Box key={dir} sx={{ flex: 1 }}>
                <Typography variant="body2" gutterBottom>direction="{dir}"</Typography>
                <DemoBox height={80}>
                  <SpeedDial
                    ariaLabel={`speed dial ${dir}`}
                    icon={<SpeedDialIcon />}
                    direction={dir}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      ...(dir === 'left' && { right: 16 }),
                      ...(dir === 'right' && { left: 16 }),
                    }}
                  >
                    {actions.map((a) => (
                      <SpeedDialAction key={a.name} icon={a.icon} slotProps={{ tooltip: { title: a.name } }} />
                    ))}
                  </SpeedDial>
                </DemoBox>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* SpeedDialIcon — openIcon shows a different icon when the dial is open */}
      <Box>
        <Typography variant="h6" gutterBottom>SpeedDialIcon with openIcon</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          The icon animates to <code>openIcon</code> when the dial is open.
        </Typography>
        <DemoBox>
          <SpeedDial
            ariaLabel="speed dial with open icon"
            // SpeedDialIcon: icon= is shown when closed, openIcon= replaces it (with animation) when open
            icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<CloseIcon />} />}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} slotProps={{ tooltip: { title: action.name } }} />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* Controlled open state — manage open yourself via open/onOpen/onClose */}
      <Box>
        <Typography variant="h6" gutterBottom>Controlled open / onOpen / onClose</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          State: <code>open</code> = {String(controlledOpen)} — interact with the FAB or click away to toggle.
        </Typography>
        <DemoBox>
          <SpeedDial
            ariaLabel="controlled speed dial"
            icon={<SpeedDialIcon />}
            open={controlledOpen}
            onOpen={() => setControlledOpen(true)}
            onClose={() => setControlledOpen(false)}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} slotProps={{ tooltip: { title: action.name, arrow: true } }} />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* slotProps.tooltip.open — always show the tooltip label next to the action */}
      <Box>
        <Typography variant="h6" gutterBottom>slotProps.tooltip.open — persistent tooltip labels</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <code>open: true</code> keeps each label visible whenever the dial is expanded (not just on hover).
          <code>arrow: true</code> is also set here.
        </Typography>
        <DemoBox height={240}>
          <SpeedDial
            ariaLabel="speed dial with persistent tooltips"
            icon={<SpeedDialIcon />}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{ tooltip: { title: action.name, open: true, arrow: true } }}  // open: true = always visible
              />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* slotProps.tooltip — arrow & placement */}
      <Box>
        <Typography variant="h6" gutterBottom>slotProps.tooltip — arrow &amp; placement</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Builds on the previous demo — adds <code>placement: 'left'</code> to pin the label
          to the left side. All three (<code>open</code>, <code>arrow</code>, <code>placement</code>)
          are passed together inside <code>slotProps.tooltip</code>.
        </Typography>
        <DemoBox height={240}>
          <SpeedDial
            ariaLabel="speed dial with arrow tooltips"
            icon={<SpeedDialIcon />}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{
                  tooltip: {
                    title: action.name,
                    open: true,           // label always visible
                    arrow: true,          // show the arrow pointer
                    placement: 'left',    // 'left' | 'right' | 'top' | 'bottom' etc.
                  },
                }}
              />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* onClick on SpeedDialAction + feedback */}
      <Box>
        <Typography variant="h6" gutterBottom>onClick on SpeedDialAction</Typography>
        {lastAction && (
          <Typography variant="body2" color="primary" gutterBottom>
            Last action: <strong>{lastAction}</strong>
          </Typography>
        )}
        <DemoBox>
          <SpeedDial
            ariaLabel="speed dial with click handlers"
            icon={<SpeedDialIcon icon={<AddIcon />} />}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {[
              { icon: <DeleteIcon />, name: 'Delete' },
              { icon: <FavoriteIcon />, name: 'Favourite' },
              { icon: <ShareIcon />, name: 'Share' },
            ].map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{ tooltip: { title: action.name } }}
                onClick={() => setLastAction(action.name)}
              />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* hidden prop — conditionally hide the entire SpeedDial */}
      <Box>
        <Typography variant="h6" gutterBottom>hidden prop</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Use <code>hidden</code> to show/hide the FAB based on scroll position or app state.
        </Typography>
        <Stack direction="row" spacing={2} mb={1}>
          <Button variant="outlined" size="small" onClick={() => setHidden(false)}>Show</Button>
          <Button variant="outlined" size="small" color="error" onClick={() => setHidden(true)}>Hide</Button>
        </Stack>
        <DemoBox>
          <SpeedDial
            ariaLabel="hidden speed dial"
            icon={<SpeedDialIcon />}
            hidden={hidden}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} slotProps={{ tooltip: { title: action.name } }} />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

      {/* slotProps.fab — customise the underlying Fab button (replaces legacy FabProps on SpeedDialAction) */}
      {/* Note: SpeedDial itself still uses FabProps for its main button */}
      <Box>
        <Typography variant="h6" gutterBottom>slotProps.fab — custom FAB color &amp; size</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <code>SpeedDial.FabProps</code> targets the main FAB (color, size, shadow).
          <code>SpeedDialAction.slotProps.fab</code> targets each action button.
        </Typography>
        <DemoBox>
          <SpeedDial
            ariaLabel="custom fab speed dial"
            icon={<SpeedDialIcon />}
            FabProps={{
              color: 'secondary',  // SpeedDial.FabProps targets the main FAB (not deprecated)
              size: 'small',
              sx: { boxShadow: 6 },
            }}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{
                  tooltip: { title: action.name },
                  fab: { size: 'small' },   // SpeedDialAction.slotProps.fab (replaces SpeedDialAction.FabProps)
                }}
              />
            ))}
          </SpeedDial>
        </DemoBox>
      </Box>

    </Stack>
  )
}
