import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Tutoria } from "@/store/modules/tutoria-module"

export function deleteTutoriaService(idTutoria: string): Promise<void> {
  return new Promise((resolve, reject) => {
    api()
      .delete(`tutoring/delete-tutoring/${idTutoria}`)
      .then(() => resolve())
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
