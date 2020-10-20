import createAxiosInstance from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { User } from "@/store/modules/auth"

export interface ExpectedResponseData {
  user: User
  token: string
}

/**
 * @param username - O username do usuário
 * @param password - A senha do usuario
 */
// export default (username: string, password: string): Promise<ExpectedResponseData> => {
//   return new Promise((resolve, reject) => {
//     createAxiosInstance({ baseUrl: "users" })
//       .post("auth/login", { username, password })
//       .then(response => {
//         resolve(response.data)
//       })
//       .catch(error => {
//         const errorMessage = handleAxiosError(error, "Erro do servidor ao realizar login")
//         reject(errorMessage)
//       })
//   })
// }

export default (username: string, password: string): Promise<ExpectedResponseData> => {
  return new Promise((resolve, reject) => {
    resolve({
      user: {
        nome: "Ciclano",
        role: "tutorando"
      },
      token: "ASJDIOAJS"
    })
  })
}
