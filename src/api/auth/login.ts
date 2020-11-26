import axios from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { Professor, Tutor, User } from "@/store/modules/auth-types"
import { RawUser } from "@/store/modules/users-types"
import { AxiosError } from "axios"

export enum LOGIN_ERRORS {
  INVALID_REQUEST = "Invalid request",
  INVALID_PASSWORD = "Senha inválida",
  EMAIL_NAO_ENCONTRADO = "Usuário não encontrado com este email"
}

export interface JWT {
  type: string
  value: string
}

interface LoginApiResponse {
  user: RawUser
  token: JWT
}

export interface LoginResponse {
  user: User
  token: JWT
}

function normalizaUsuario(rawUser: RawUser): User {
  const { tutor: dadosTutor, professor: dadosProfessor, ...dadosPessoa } = rawUser

  if (dadosTutor) {
    const tutor: Tutor = { ...dadosTutor, ...dadosPessoa, role: "tutor" }
    return { ...tutor, isMonitor: false }
  }

  if (dadosProfessor) {
    const professor: Professor = { ...dadosProfessor, ...dadosPessoa, role: "professor" }
    return { ...professor, isMonitor: false }
  }

  /**
   * @TODO FIXME
   * não quero ir além pq estou esperando login do victor mas a ideia aqui é que o usuario so pode ter 3 roles
   * e se chegou aqui ele deve ser monitor
   */
  return { ...rawUser, role: "monitor" }
}

/**
 * @param username - O username do usuário
 * @param password - A senha do usuario
 */
export default (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    axios()
      .post("users/auth/login", { email, password })
      .then(response => {
        const { user: rawUser, token } = response.data as LoginApiResponse

        const user = normalizaUsuario(rawUser)

        resolve({ user, token })
      })
      .catch((error: AxiosError) => {
        let { message } = handleAxiosError(error)

        if (error.response?.data?.statusCode === 400) message = LOGIN_ERRORS.INVALID_REQUEST
        if (error.response?.data?.statusCode === 401) message = LOGIN_ERRORS.INVALID_PASSWORD
        if (error.response?.data?.statusCode === 404) message = LOGIN_ERRORS.EMAIL_NAO_ENCONTRADO

        console.log(error.response?.data)

        reject(message)
      })
  })
}
