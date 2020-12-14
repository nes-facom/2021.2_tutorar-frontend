import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Tutoria } from "@/store/modules/tutoria-module"

export function getTutoriasFromTutorService(idTutor: string): Promise<Tutoria[]> {
  return new Promise((resolve, reject) => {
    api()
      .get(`tutoring/find-tutorings-by-tutor/${idTutor}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
