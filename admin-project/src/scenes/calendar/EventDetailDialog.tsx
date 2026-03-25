import { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import type { EventApi } from '@fullcalendar/core'
import dayjs, { type Dayjs } from 'dayjs'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NotesIcon from '@mui/icons-material/Notes'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { MobileDatePicker, MobileDateTimePicker } from '@mui/x-date-pickers'
import type { EventFormData } from './AddEventDialog'

interface EventDetailDialogProps {
  open: boolean
  event: EventApi | null
  onClose: () => void
  onDelete: () => void
  onUpdate: (data: EventFormData) => void
}

const formatEventDate = (date: Date | null, allDay: boolean) => {
  if (!date) return ''
  return formatDate(date, allDay
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  )
}

const pickerSlotProps = {
  textField: { fullWidth: true, required: true } as const,
  dialog: {
    sx: {
      '& .MuiDialogContent-root': {
        overflow: 'hidden',
      },
    },
  },
}

const DetailView = ({
  event,
  onClose,
  onDelete,
  onEdit,
}: {
  event: EventApi
  onClose: () => void
  onDelete: () => void
  onEdit: () => void
}) => {
  const description = event.extendedProps?.description as string | undefined

  return (
    <>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {event.title}
        </Typography>
        <IconButton size="small" onClick={onEdit} aria-label="Edit event">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={onDelete} color="error" aria-label="Delete event">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
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
      </DialogActions>
    </>
  )
}

const EditView = ({
  event,
  onClose,
  onUpdate,
}: {
  event: EventApi
  onClose: () => void
  onUpdate: (data: EventFormData) => void
}) => {
  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(
    (event.extendedProps?.description as string) ?? '',
  )
  const [allDay, setAllDay] = useState(event.allDay)
  const [start, setStart] = useState<Dayjs | null>(
    event.start ? dayjs(event.start) : null,
  )
  const [end, setEnd] = useState<Dayjs | null>(
    event.end ? dayjs(event.end) : null,
  )

  const handleStartChange = (newStart: Dayjs | null) => {
    setStart(newStart)
    if (newStart) {
      setEnd(newStart.add(1, allDay ? 'day' : 'hour'))
    }
  }

  const handleSubmit = () => {
    const trimmed = title.trim()
    if (!trimmed || !start || !end) return
    onUpdate({
      title: trimmed,
      description: description.trim(),
      start: allDay ? start.format('YYYY-MM-DD') : start.toISOString(),
      end: allDay ? end.format('YYYY-MM-DD') : end.toISOString(),
      allDay,
    })
  }

  const Picker = allDay ? MobileDatePicker : MobileDateTimePicker

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
            }
            label="All day"
          />
          <Stack spacing={2}>
            <Picker
              label="Start"
              value={start}
              onChange={handleStartChange}
              ampmInClock
              slotProps={pickerSlotProps}
            />
            <Picker
              label="End"
              value={end}
              onChange={setEnd}
              ampmInClock
              slotProps={pickerSlotProps}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Box>
  )
}

export const EventDetailDialog = ({
  open,
  event,
  onClose,
  onDelete,
  onUpdate,
}: EventDetailDialogProps) => {
  const [editing, setEditing] = useState(false)

  if (!event) return null

  const handleClose = () => {
    setEditing(false)
    onClose()
  }

  const handleUpdate = (data: EventFormData) => {
    setEditing(false)
    onUpdate(data)
  }

  const handleDelete = () => {
    setEditing(false)
    onDelete()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={editing ? 'sm' : 'xs'}>
      {editing ? (
        <EditView event={event} onClose={handleClose} onUpdate={handleUpdate} />
      ) : (
        <DetailView event={event} onClose={handleClose} onDelete={handleDelete} onEdit={() => setEditing(true)} />
      )}
    </Dialog>
  )
}
