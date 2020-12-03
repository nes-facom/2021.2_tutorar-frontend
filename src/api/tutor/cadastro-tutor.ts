import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { RawTutor } from "@/store/modules/users-types"

export interface DadosCadastroTutor {
  nome: string
  email: string
  celular: string
  password: string
  fotoPerfil: string
  cpf: string
  dataNascimento: string
  genero: string
  tutor: {
    universidade: string
    cursoLicensiatura: string
    semestreAtual: string
  }
}

export function cadastroTutorService(dados: DadosCadastroTutor): Promise<RawTutor> {
  return new Promise((resolve, reject) => {
    api()
      .post("users/tutores/", dados)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
