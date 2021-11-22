import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Tutoria } from "@/store/modules/tutoria-module"

export interface DadosSolicitacaoTutoria {
  tutorId: string
  professorId: string
  tutoringDate: string
  tutoringHour: string
  requestMessage?: string
  tutoringTopic: string
}

export function solicitarTutoriaService(dados: DadosSolicitacaoTutoria): Promise<Tutoria> {
  return new Promise((resolve, reject) => {
    api()
      .post("tutoring", dados)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
