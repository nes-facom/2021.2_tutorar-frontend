/* eslint-disable @typescript-eslint/no-explicit-any */


// Tipagem de componentes do vuetify
export type VForm = Vue & {
  validate: () => boolean
  reset: () => void
  resetValidation: () => void
}

export interface VCalendar extends Vue {
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
