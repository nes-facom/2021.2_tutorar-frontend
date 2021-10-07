import { api } from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { AxiosError } from "axios"

export function resetPasswordService(token: string, password: string, passwordConfirmation: string) {
  return new Promise((reject) => {

  api()
    .patch("users/auth/reset-password/" + `${token}`, { password, passwordConfirmation })
    .then(response => {
      if (response.status == 200 || response.status == 201 || response.status == 204) {
        console.log(response.data)
      }
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
