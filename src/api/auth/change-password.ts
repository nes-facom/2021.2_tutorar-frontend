import { api } from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { AxiosError } from "axios"

export function changePasswordService(id: string, password: string, passwordConfirmation: string) {
  return new Promise((resolve, reject) => {

  api()
    .patch("users/auth/change-password/" + `${id}`, { password, passwordConfirmation })
    .then(response => {
        resolve(response)
    })
    .catch((error: AxiosError) => {
      let { message } = handleAxiosError(error)

        if (error.response?.data?.statusCode === 400) message = 'Dados inválidos'
        if (error.response?.data?.statusCode === 401) message = 'Dados inválidos'
        if (error.response?.data?.statusCode === 404) message = 'Método não encontrado'

        reject(message)
    })
  })
}
