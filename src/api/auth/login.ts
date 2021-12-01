import { api } from "@/api/axios-instance-creator"
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

  if (dadosTutor && !dadosPessoa.isMonitor) {
    const tutor: Tutor = { ...dadosTutor, ...dadosPessoa, role: "tutor" }
    return { ...tutor, isMonitor: false }
  }

  if (dadosProfessor && !dadosPessoa.isMonitor) {
    const professor: Professor = { ...dadosProfessor, ...dadosPessoa, role: "professor" }
    return { ...professor, isMonitor: false }
  }

   return { ...rawUser, role: "monitor", isMonitor: true }

}

/**
 * Dispara request de login
 *
 * @param username - O username do usuário
 * @param password - A senha do usuario
 */
export function loginService(email: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    api()
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

        reject(message)
      })
  })
}
