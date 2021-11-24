import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Tutoria } from "@/store/modules/tutoria-module"

export function updateTutoriaService(idTutoria: string, dadosTutoria: Tutoria): Promise<void> {
  return new Promise((resolve, reject) => {
    api()
      .put(`tutoring/${idTutoria}`, dadosTutoria)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
