import { AgendaHorarios } from "@/pages/tutor/agenda/agenda"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"
import { MongoDocument } from "../utils/crud-module-utils"

interface LogoutPayload {
  redirectTo?: string
  clearLocalStorage?: boolean
}

interface UpdateUserPayload {
  id: string
  user: Professor | Tutor | Monitor
  foto?: File
}

interface Pessoa extends MongoDocument {
  nome: string
  email: string
  dataNascimento: string
  cpf: string
  genero: "M" | "F"
  isAdmin: boolean
  celular: string
  fotoPerfil?: string
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

export type User = (Professor | Tutor | Monitor) &
  MongoDocument & {
    isAdmin: boolean

    // Essa flag is monitor é redundante,
    // é que no back não temos nenhum dado especifico para monitor,
    // então criamos essa flag
    isMonitor: boolean
  }
