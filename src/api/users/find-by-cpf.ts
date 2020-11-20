import handleAxiosError from "@/api/axios-error-handler"
import axios from "@/api/axios-instance-creator"
import { RawUser } from "@/store/modules/users-types"

export default (cpf: string): Promise<RawUser> => {
  return new Promise((resolve, reject) => {
    axios()
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
