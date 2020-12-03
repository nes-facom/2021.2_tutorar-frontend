import { RawProfessor } from "@/store/modules/users-types"
import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"

export interface DadosCadastroProfessor {
  nome: string
  email: string
  celular: string
  password: string
  fotoPerfil: string
  cpf: string
  dataNascimento: string
  genero: string

  professor: {
    formacaoAcademica: FORMACAO_ACADEMICA

    nivelLecionamento: NIVEL_LECIONAMENTO

    inicioLecionamento: string
  }
}

export function cadastroProfessorService(dados: DadosCadastroProfessor): Promise<RawProfessor> {
  return new Promise((resolve, reject) => {
    api()
      .post("users/professores", dados)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
