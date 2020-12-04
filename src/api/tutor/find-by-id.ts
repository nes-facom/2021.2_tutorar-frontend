import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { RawTutor } from "@/store/modules/users-types"

export function findTutorByIdService(id: string): Promise<RawTutor[]> {
  return new Promise((resolve, reject) => {
    api()
      .get(`users/tutores/${id}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
