import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"

interface LogoutOptions {
  clearLocalStorage?: boolean
}

interface Pessoa {
  _id: string

  nome: string
  email: string
  dataNascimento: string
  cpf: string
  genero: "M" | "F"
  isAdmin: boolean
  celular: string
}

export interface Professor extends Pessoa {
  dataInicioEnsino: string
  formacaoAcademica: FORMACAO_ACADEMICA
  nivelLecionamento: NIVEL_LECIONAMENTO
}

export interface Tutor extends Pessoa {
  universidade: string
  semestreAtual: number
  cursoLicensiatura: string
}

export type User = (Professor | Tutor) & {
  role: "professor" | "tutor" | "monitor"
}
