export interface AgendaHorarios {
  segunda: HorarioLivre[]
  terca: HorarioLivre[]
  quarta: HorarioLivre[]
  quinta: HorarioLivre[]
  sexta: HorarioLivre[]
}

export interface HorarioLivre {
  inicio: string
  fim: string
}
