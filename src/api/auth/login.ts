import axios from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { Professor, Tutor, User } from "@/store/modules/auth-types"
import { RawUser } from "@/store/modules/users-types"

export interface LoginResponse {
  user: User
  token: string
}

function normalizaUsuario(rawUser: RawUser): User {
  const { tutor: dadosTutor, professor: dadosProfessor, ...dadosPessoa } = rawUser

  if (dadosTutor) {
    const tutor: Tutor = { ...dadosTutor, ...dadosPessoa, role: "tutor" }
    return tutor
  }

  if (dadosProfessor) {
    const professor: Professor = { ...dadosProfessor, ...dadosPessoa, role: "professor" }
    return professor
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
export default (username: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    axios()
      // .post("users/5fb07bd6951cf60186e4df2d", { username, password })
      .get("users/5fb07bd6951cf60186e4df2d")
      .then(response => {
        const raw: RawUser = response.data
        const user = normalizaUsuario(raw)
        resolve({ user, token: "123" })
      })
      .catch(error => {
        const errorMessage = handleAxiosError(error, "Erro do servidor ao realizar login")
        reject(errorMessage)
      })
  })
}
