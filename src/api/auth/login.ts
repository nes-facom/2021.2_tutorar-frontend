import axios from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"
import { Professor, Tutor, User } from "@/store/modules/auth-types"
import { RawUser } from "@/store/modules/users-types"

const userMock: User = {
  _id: "5fb07bd6951cf60186e4df2d",
  _v: "a",

  role: "tutor",

  cpf: "03690208122",
  nome: "Fulano Da Silva Sanches",
  email: "fulano.silva@hotmail.com",
  celular: "67998801996",
  dataNascimento: "1996-10-23",
  genero: "M",

  universidade: "UFMS",
  cursoLicensiatura: "batata",
  semestreAtual: 7,

  isAdmin: false,

  habilidades: ["5fb002fbda264700ecec5677", "5fb002fbda264700ecec5694"]
}

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
  console.log("loggin IN", username, password)

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
