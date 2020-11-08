export interface RawUser {
  _id: string
  nome: string
  email: string
  dataNascimento: string
  cpf: string
  genero: "M" | "F"
  isAdmin: boolean
  celular: string
  tutor?: RawTutor
  professor?: RawProfessor
  __v: number
}

export interface RawTutor {
  universidade: string
  semestreAtual: number
  cursoLicensiatura: string
}

export interface RawProfessor {
  formacaoAcademica: string
  nivelLecionamento: string
  tempoLecionamento: string
}
