import { useCallback, useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import type { CalendarApi, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import dayjs from 'dayjs'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import { AddEventDialog, type EventFormData } from './AddEventDialog'
import { EventDetailDialog } from './EventDetailDialog'
import './calendar.css'
import type { Theme } from '@mui/material/styles'

interface SelectionSnapshot {
  calendarApi: CalendarApi
  startStr: string
  endStr: string
  allDay: boolean
}

// Sample events in the current week for a realistic demo
const getInitialEvents = (palette: Theme['palette']) => {
  const today = dayjs()
  const monday = today.startOf('week').add(1, 'day')
  return [
    {
      id: '1',
      title: 'Sprint Planning',
      start: monday.hour(9).minute(30).toISOString(),
      end: monday.hour(10).minute(30).toISOString(),
      backgroundColor: palette.info.main,
    },
    {
      id: '2',
      title: 'Design Review',
      start: monday.add(1, 'day').hour(11).minute(0).toISOString(),
      end: monday.add(1, 'day').hour(12).minute(0).toISOString(),
      backgroundColor: palette.info.light,
    },
    {
      id: '3',
      title: 'Team Standup',
      start: today.hour(9).minute(0).toISOString(),
      end: today.hour(9).minute(30).toISOString(),
      backgroundColor: palette.info.main,
      extendedProps: { description: 'Daily sync — share blockers and progress' },
    },
    {
      id: '4',
      title: 'Lunch with Alex',
      start: today.hour(12).minute(0).toISOString(),
      end: today.hour(13).minute(0).toISOString(),
      backgroundColor: palette.secondary.light,
      extendedProps: { description: 'Café downstairs' },
    },
    {
      id: '5',
      title: 'Product Demo',
      start: today.add(1, 'day').hour(14).minute(0).toISOString(),
      end: today.add(1, 'day').hour(15).minute(0).toISOString(),
      backgroundColor: palette.info.dark,
      extendedProps: { description: 'Show new dashboard features to stakeholders' },
    },
    {
      id: '6',
      title: 'Company All-Hands',
      start: today.add(2, 'day').startOf('day').format('YYYY-MM-DD'),
      end: today.add(2, 'day').startOf('day').format('YYYY-MM-DD'),
      allDay: true,
      backgroundColor: palette.info.dark,
    },
    {
      id: '7',
      title: '1:1 with Manager',
      start: today.add(2, 'day').hour(10).minute(0).toISOString(),
      end: today.add(2, 'day').hour(10).minute(30).toISOString(),
      backgroundColor: palette.info.main,
    },
  ]
}

const Calendar = () => {
  const theme = useTheme()
  const { palette } = theme
  const calendarRef = useRef<FullCalendar>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [miniDate, setMiniDate] = useState(dayjs())
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Re-measure FullCalendar when its container resizes (e.g. app sidebar toggle)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      calendarRef.current?.getApi().updateSize()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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

  const handleNewEvent = useCallback(() => {
    const api = calendarRef.current?.getApi()
    if (!api) return
    const now = dayjs()
    const base = miniDate.isSame(now, 'day') ? now : miniDate.hour(now.hour())
    const start = base.minute(0).second(0).add(1, 'hour')
    setSelection({
      calendarApi: api,
      startStr: start.toISOString(),
      endStr: start.add(1, 'hour').toISOString(),
      allDay: false,
    })
    setAddDialogOpen(true)
  }, [miniDate])

  const handleAddEvent = useCallback((data: EventFormData) => {
    if (!selection) return
    selection.calendarApi.unselect()
    selection.calendarApi.addEvent({
      id: `${data.start}-${data.title}`,
      title: data.title,
      start: data.start,
      end: data.end,
      allDay: data.allDay,
      backgroundColor: palette.info.main,
      extendedProps: { description: data.description },
    })
    setSelection(null)
    setAddDialogOpen(false)
  }, [selection, palette.info.main])

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

  const handleUpdateEvent = useCallback((data: EventFormData) => {
    if (!clickedEvent) return
    clickedEvent.setProp('title', data.title)
    clickedEvent.setExtendedProp('description', data.description)
    clickedEvent.setAllDay(data.allDay)
    clickedEvent.setDates(data.start, data.end)
    setClickedEvent(null)
    setDetailDialogOpen(false)
  }, [clickedEvent])

  const handleDetailDialogClose = useCallback(() => {
    setClickedEvent(null)
    setDetailDialogOpen(false)
  }, [])

  // Sync mini calendar ↔ main calendar
  const handleMiniDateChange = useCallback((date: dayjs.Dayjs | null) => {
    if (!date) return
    setMiniDate(date)
    calendarRef.current?.getApi().gotoDate(date.toDate())
  }, [])

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* ── LEFT SIDEBAR ── */}
      <Box
        sx={{
          width: sidebarOpen ? 240 : 0,
          flexShrink: 0,
          border: sidebarOpen ? 1 : 0,
          borderColor: 'divider',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          ml: sidebarOpen ? 1 : 0,
          my: 1,
          overflow: 'hidden',
          transition: 'width 0.2s ease, margin 0.2s ease',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            onClick={handleNewEvent}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            New event
          </Button>
        </Box>

        <DateCalendar
          value={miniDate}
          onChange={handleMiniDateChange}
          sx={{
            width: '100%',
            '& .MuiPickersCalendarHeader-root': { px: 1 },
            '& .MuiDayCalendar-weekDayLabel': { fontSize: '0.7rem' },
            '& .MuiPickersDay-root': { fontSize: '0.75rem', width: 28, height: 28 },
          }}
        />

        <Divider />

        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            My calendars
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="span"
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'info.main',
                display: 'inline-block',
              }}
            />
            Calendar
          </Typography>
        </Box>
      </Box>

      {/* ── MAIN CALENDAR ── */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          overflow: 'hidden',
          p: 1,
          color: 'text.primary',
        }}
      >
        <Box
          style={{
            '--fc-page-bg-color': palette.background.default,
            '--fc-border-color': palette.divider,
            '--fc-today-bg-color': `${palette.info.main}0A`,
            '--fc-now-indicator-color': palette.error.main,
            '--fc-neutral-bg-color': palette.background.paper,
            '--fc-neutral-text-color': palette.text.secondary,
            '--fc-list-event-hover-bg-color': palette.action.selected,
          } as React.CSSProperties}
          sx={{ height: '100%' }}
        >
        <FullCalendar
          ref={calendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          customButtons={{
            toggleSidebar: {
              icon: sidebarOpen ? 'chevron-left' : 'chevron-right',
              hint: sidebarOpen ? 'Hide navigation pane' : 'Show navigation pane',
              click: () => setSidebarOpen((prev) => !prev),
            },
          }}
          headerToolbar={{
            start: 'toggleSidebar prev,next today',
            center: 'title',
            end: 'timeGridWeek,timeGridDay,dayGridMonth,listMonth',
          }}
          initialView="timeGridWeek"
          eventDisplay="block"
          nowIndicator
          editable
          selectable
          selectMirror
          dayMaxEvents
          slotMinTime="07:00:00"
          slotMaxTime="21:00:00"
          scrollTime="08:00:00"
          select={handleDateClick}
          eventClick={handleEventClick}
          initialEvents={getInitialEvents(palette)}
        />
        </Box>
      </Box>

      {/* ── DIALOGS ── */}
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
        onUpdate={handleUpdateEvent}
      />
    </Box>
  )
}

export default Calendar;