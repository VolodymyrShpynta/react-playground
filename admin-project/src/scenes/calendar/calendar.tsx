import { useCallback, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { formatDate } from '@fullcalendar/core'
import type { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Header } from '../../components/Header'
import { AddEventDialog, type EventFormData } from './AddEventDialog'
import { EventDetailDialog } from './EventDetailDialog'

interface SelectionSnapshot {
  calendarApi: DateSelectArg['view']['calendar']
  startStr: string
  endStr: string
  allDay: boolean
}

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])

  // --- Add-event dialog state ---
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selection, setSelection] = useState<SelectionSnapshot | null>(null)

  const handleDateClick = useCallback((selected: DateSelectArg) => {
    setSelection({
      calendarApi: selected.view.calendar,
      startStr: selected.startStr,
      endStr: selected.endStr,
      allDay: selected.allDay,
    })
    setAddDialogOpen(true)
  }, [])

  const handleAddEvent = useCallback((data: EventFormData) => {
    if (!selection) return

    selection.calendarApi.unselect()
    selection.calendarApi.addEvent({
      id: `${data.start}-${data.title}`,
      title: data.title,
      start: data.start,
      end: data.end,
      allDay: data.allDay,
      extendedProps: { description: data.description },
    })

    setSelection(null)
    setAddDialogOpen(false)
  }, [selection])

  const handleAddDialogClose = useCallback(() => {
    selection?.calendarApi.unselect()
    setSelection(null)
    setAddDialogOpen(false)
  }, [selection])

  // --- Event-detail / delete dialog state ---
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [clickedEvent, setClickedEvent] = useState<EventApi | null>(null)

  const handleEventClick = useCallback((selected: EventClickArg) => {
    setClickedEvent(selected.event)
    setDetailDialogOpen(true)
  }, [])

  const handleDeleteEvent = useCallback(() => {
    clickedEvent?.remove()
    setClickedEvent(null)
    setDetailDialogOpen(false)
  }, [clickedEvent])

  const handleDetailDialogClose = useCallback(() => {
    setClickedEvent(null)
    setDetailDialogOpen(false)
  }, [])

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          sx={{
            flex: '1 1 20%',
            backgroundColor: 'background.paper',
            p: '15px',
            borderRadius: '4px',
          }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: 'secondary.main',
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start!, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>

      {/* Dialogs */}
      <AddEventDialog
        open={addDialogOpen}
        initialStart={selection?.startStr ?? ''}
        initialEnd={selection?.endStr ?? ''}
        initialAllDay={selection?.allDay ?? true}
        onClose={handleAddDialogClose}
        onAdd={handleAddEvent}
      />
      <EventDetailDialog
        open={detailDialogOpen}
        event={clickedEvent}
        onClose={handleDetailDialogClose}
        onDelete={handleDeleteEvent}
      />
    </Box>
  )
}

export default Calendar;