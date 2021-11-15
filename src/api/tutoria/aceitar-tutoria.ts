import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"

export function aceitaTutoriaService(idTutoria: string): Promise<void> {
  const newStatus = { requestState: "aceita" }
  return new Promise((resolve, reject) => {
    api()
      .put(`tutoring/${idTutoria}`, newStatus)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
