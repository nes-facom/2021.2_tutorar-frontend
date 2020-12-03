import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { RawUser } from "@/store/modules/users-types"

export function findUserByCpfService(cpf: string): Promise<RawUser> {
  return new Promise((resolve, reject) => {
    api()
      .post("users/find-by-cpf", { cpf })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        const apiError = handleAxiosError(err)
        reject(apiError)
      })
  })
}
