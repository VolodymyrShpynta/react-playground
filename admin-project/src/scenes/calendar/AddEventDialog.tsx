import { useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material'
import { MobileDatePicker, MobileDateTimePicker } from '@mui/x-date-pickers'

export interface EventFormData {
  title: string
  description: string
  start: string
  end: string
  allDay: boolean
}

interface AddEventDialogProps {
  open: boolean
  initialStart: string
  initialEnd: string
  initialAllDay: boolean
  onClose: () => void
  onAdd: (data: EventFormData) => void
}

const toLocalDateTimeStr = (iso: string) =>
  iso.includes('T') ? iso : `${iso}T00:00`

const AddEventDialogContent = ({
  initialStart,
  initialEnd,
  initialAllDay,
  onClose,
  onAdd,
}: Omit<AddEventDialogProps, 'open'>) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [allDay, setAllDay] = useState(initialAllDay)
  const [start, setStart] = useState<Dayjs | null>(
    dayjs(toLocalDateTimeStr(initialStart)),
  )
  const [end, setEnd] = useState<Dayjs | null>(
    dayjs(toLocalDateTimeStr(initialEnd)),
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
    onAdd({
      title: trimmed,
      description: description.trim(),
      start: allDay ? start.format('YYYY-MM-DD') : start.toISOString(),
      end: allDay ? end.format('YYYY-MM-DD') : end.toISOString(),
      allDay,
    })
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

  const Picker = allDay ? MobileDatePicker : MobileDateTimePicker

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <DialogTitle>Add New Event</DialogTitle>
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
          Add
        </Button>
      </DialogActions>
    </Box>
  )
}

export const AddEventDialog = ({
  open,
  ...contentProps
}: AddEventDialogProps) => (
  <Dialog
    open={open}
    onClose={contentProps.onClose}
    fullWidth
    maxWidth="sm"
  >
    {open && <AddEventDialogContent {...contentProps} />}
  </Dialog>
)
