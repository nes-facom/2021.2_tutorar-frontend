import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { RawUser } from "@/store/modules/users-types"

export function findByEmailService(email: string): Promise<RawUser> {
  return new Promise((resolve, reject) => {
    api()
      .post("users/find-by-email", { email })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        const apiError = handleAxiosError(err)
        reject(apiError)
      })
  })
}
