import { formatDate } from '@fullcalendar/core'
import type { EventApi } from '@fullcalendar/core'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import NotesIcon from '@mui/icons-material/Notes'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'

interface EventDetailDialogProps {
  open: boolean
  event: EventApi | null
  onClose: () => void
  onDelete: () => void
}

const formatEventDate = (date: Date | null, allDay: boolean) => {
  if (!date) return ''
  return formatDate(date, allDay
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  )
}

export const EventDetailDialog = ({
  open,
  event,
  onClose,
  onDelete,
}: EventDetailDialogProps) => {
  if (!event) return null

  const description = event.extendedProps?.description as string | undefined

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {formatEventDate(event.start, event.allDay)}
              {event.end && ` — ${formatEventDate(event.end, event.allDay)}`}
            </Typography>
          </Stack>
          {description && (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
              <NotesIcon fontSize="small" color="action" sx={{ mt: 0.25 }} />
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {description}
              </Typography>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
