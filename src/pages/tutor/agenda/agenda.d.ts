export interface AgendaHorarios {
  segunda: HorarioLivre[]
  terca: HorarioLivre[]
  quarta: HorarioLivre[]
  quinta: HorarioLivre[]
  sexta: HorarioLivre[]
}

export interface RawAgendaHorarios extends AgendaHorarios {
  _id: string
  __v: number
}

export interface HorarioLivre {
  inicio: string
  fim: string
}
