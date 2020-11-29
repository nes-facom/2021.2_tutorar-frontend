/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Tipagens adicionais para o compodente de calendário / agenda,
 * o vuetify fornece algumas mas não todas, ver DOCS
 *
 * @see https://vuetifyjs.com/en/api/v-calendar/#events
 */
import { CalendarTimeDelta, CalendarTimestamp, CalendarTimeToY } from "vuetify"

/**
 * Componente do calendário, para utilizar como REF
 */
export interface VuetifyCalendarComponent extends Vue {
  prev: () => void
  next: () => void
  checkChange: () => void
}

export interface CalendarChangeEvent {
  start: CalendarTimestamp
  end: CalendarTimestamp
}

export interface CalendarClickDateEvent extends CalendarTimestamp {
  timeToY: CalendarTimeToY
  timeDelta: CalendarTimeDelta
  minutesToPixels: (minutes: number) => number
  week: CalendarTimestamp[]
}

export interface CalendarClickAtEventEvent {
  event: any
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  outside: boolean
  start: boolean
  end: boolean
  timed: boolean
  singleline: boolean
  overlapsNoon: boolean
  formatTime: (time: VTimestamp, ampm: boolean) => string
  timeSummary: () => string
  eventSummary: () => string
}
