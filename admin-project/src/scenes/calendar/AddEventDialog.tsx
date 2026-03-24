import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

interface AddEventDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (title: string) => void
}

export const AddEventDialog = ({ open, onClose, onAdd }: AddEventDialogProps) => {
  const [title, setTitle] = useState('')

  const handleSubmit = () => {
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  const handleClose = () => {
    setTitle('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Event title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
