import { RawAgendaHorarios } from "@/pages/tutor/agenda/agenda"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"
import { Pessoa } from "./auth-types"

interface DadosTutor {
  universidade: string
  semestreAtual: number
  cursoLicensiatura: string
  habilidades: string[]
  agenda?: RawAgendaHorarios
}

interface DadosProfessor {
  formacaoAcademica: FORMACAO_ACADEMICA
  nivelLecionamento: NIVEL_LECIONAMENTO
  inicioLecionamento: string
}

/**
 * Raw são os formatos dos dados como a api os retorna
 */
export interface RawUser extends Pessoa {
  isActive: boolean

  tutor?: DadosTutor

  professor?: DadosProfessor
}

export interface RawTutor extends Pessoa {
  tutor: DadosTutor
}

export interface RawProfessor extends Pessoa {
  professor: DadosProfessor
}
