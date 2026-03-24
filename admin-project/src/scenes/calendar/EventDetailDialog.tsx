import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface EventDetailDialogProps {
  open: boolean
  eventTitle: string
  onClose: () => void
  onDelete: () => void
}

export const EventDetailDialog = ({
  open,
  eventTitle,
  onClose,
  onDelete,
}: EventDetailDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle>{eventTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Would you like to remove this event from the calendar?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onDelete} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)
