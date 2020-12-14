import { RawProfessor } from "@/store/modules/users-types"
import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"

export function getProfessorByIdService(id: string): Promise<RawProfessor> {
  return new Promise((resolve, reject) => {
    api()
      .get(`users/${id}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
