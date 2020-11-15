import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"
import { Pessoa } from "./auth-types"

export interface RawUser extends Pessoa {
  _id: string
  __v: number

  tutor?: RawTutor
  professor?: RawProfessor
}

export interface RawTutor {
  universidade: string
  semestreAtual: number
  cursoLicensiatura: string
  habilidades: string[]
}

export interface RawProfessor {
  formacaoAcademica: FORMACAO_ACADEMICA
  nivelLecionamento: NIVEL_LECIONAMENTO
  tempoLecionamento: string
}
