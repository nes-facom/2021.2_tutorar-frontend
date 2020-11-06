import createAxiosInstance from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { User } from "@/store/modules/auth-types"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"

const userMock: User = {
  _id: "2",

  role: "professor",

  cpf: "03690208122",
  nome: "Fulano Da Silva Sanches",
  email: "fulano.silva@hotmail.com",
  celular: "67998801996",
  dataNascimento: "23/10/1996",
  genero: "M",

  dataInicioEnsino: "12/04/2015",
  formacaoAcademica: FORMACAO_ACADEMICA.BACHARELADO,
  nivelLecionamento: NIVEL_LECIONAMENTO.EDUCACAO_INFANTIL,

  isAdmin: false
}

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
//     createAxiosInstance({ baseURL: "users" })
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
    resolve({ user: userMock, token: "token" })
  })
}
