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
  universidade: string
  semestreAtual: number
  cursoLicensiatura: string
}

export interface Monitor extends Pessoa {
  role: "monitor"
}

export type User = (Professor | Tutor | Monitor) & {
  isAdmin: boolean
  isMonitor: boolean
}
