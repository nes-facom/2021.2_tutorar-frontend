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
    return tutor
  }

  if (dadosProfessor) {
    const professor: Professor = { ...dadosProfessor, ...dadosPessoa, role: "professor" }
    return professor
  }

  console.log(rawUser)

  /**
   * @TODO FIXME
   * não quero ir além pq estou esperando login do victor mas a ideia aqui é que o usuario so pode ter 3 roles
   * e se chegou aqui ele deve ser monitor
   */
  return { ...rawUser, role: "monitor" }
}
//TODO RETIRAR
const mockLogin = (): Promise<LoginResponse> => {
  return new Promise(resolve => {
    const responseMock: LoginApiResponse = {
      user: {
        isAdmin: false,
        isActive: true,
        _id: "5fb706d74f06c9004459a4b8",
        nome: "Vitor Andrade Guidorizzi",
        email: "teste@gmail.com",
        dataNascimento: "1997-02-21T00:00:00.000Z",
        cpf: "03690208122",
        genero: "M",
        celular: "67998801996",
        tutor: {
          universidade: "UFMS",
          cursoLicensiatura: "batata",
          semestreAtual: 7,
          habilidades: ["5fb002fbda264700ecec5677", "5fb002fbda264700ecec5678", "5fb002fbda264700ecec5694"]
        },
        __v: 0
      },
      token: {
        type: "bearer",
        value:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmI3MDZkNzRmMDZjOTAwNDQ1OWE0YjgiLCJpYXQiOjE2MDU4MzAzNjQsImV4cCI6MTYwNTgzMDQyNH0.jn_XbZLWydbkF8txVsDEsMKROGPCwL7hlYwnhPl48q0"
      }
    }
    const { user: rawUser, token } = responseMock

    const user = normalizaUsuario(rawUser)

    resolve({ user, token })
  })
}

export default (email: string, password: string): Promise<LoginResponse> => {
  console.log(email, password)
  return mockLogin()
}