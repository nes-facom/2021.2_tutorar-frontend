import { AgendaHorarios } from "@/pages/tutor/agenda/agenda"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"

interface LogoutPayload {
  clearLocalStorage?: boolean
}

interface UpdateUserPayload {
  id: string
  user: User
  foto?: File
}

interface Pessoa {
  _id: string
  __v: string | number

  nome: string
  email: string
  dataNascimento: string
  cpf: string
  genero: "M" | "F"
  isAdmin: boolean
  celular: string
}

export interface Professor extends Pessoa {
  role: "professor"

  inicioLecionamento: string
  formacaoAcademica: FORMACAO_ACADEMICA
  nivelLecionamento: NIVEL_LECIONAMENTO
}

export interface Tutor extends Pessoa {
  role: "tutor"

  habilidades: string[]

  agenda?: AgendaHorarios

  universidade: string
  semestreAtual: number
  cursoLicensiatura: string
}

export interface Monitor extends Pessoa {
  role: "monitor"
}

export type User = (Professor | Tutor | Monitor) & {
  isAdmin: boolean

  // Essa flag is monitor é redundante,
  // é que no back não temos nenhum dado especifico para monitor,
  // então criamos essa flag
  isMonitor: boolean
}
