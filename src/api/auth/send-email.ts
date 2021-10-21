import { api } from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { AxiosError } from "axios"

export function emailService(email: string): Promise<any> {
  return new Promise((resolve, reject) => {

  api()
    .post("users/auth/send-recover-email", { email })
    .then(response => {
        resolve(response.data)
    }).catch(error => {
      const { message } = handleAxiosError(error)
        reject(message)
    })
  })
}
