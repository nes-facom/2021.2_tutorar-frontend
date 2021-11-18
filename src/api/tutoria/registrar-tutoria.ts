import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"

export function registraTutoriaService(idTutoria: string): Promise<void> {
  const newStatus = { requestState: "registrada" }
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
