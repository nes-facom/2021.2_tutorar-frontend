import router from "@/router"
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import loginService, { ExpectedResponseData as LoginResponse } from "@/api/auth/login"
import store from ".."

interface LogoutOptions {
  redirectTo?: string
  clearLocalStorage?: boolean
}

/**
 * @TODO: Rascunho de tipagem de usuário
 * quando o formulário / padrão / tipo
 * dos dados de professor tiver 100%
 * implementar tipagem
 */
interface BaseUser {
  role: UserRoles

  cpf: string
  nome: string
  email: string
  celular: string
  dataNascimento: string
  genero: "masculino" | "feminino" | "não informado"
}

export interface UserProfessor extends BaseUser {
  dataInicioEnsino: string
  formacaoAcademica: "basica" | "tecnica" | "superior"
  nivelLecionamento: "infantil" | "fundamental" | "médio" | "superior"
}

export interface UserTutor extends BaseUser {
  universidade: string
  cursoLicensiatura: string
  semestreNoCadastro: string

  anoFimLicensiatura: string
  anoInicioLicensiatura: string
}

/**
 * @TODO Tipagem temporaria, ver acima
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type User = UserProfessor | UserTutor | null | any

export type UserRoles = "tutorando" | "professor"

@Module({ namespaced: true, name: "auth" })
export default class Auth extends VuexModule {
  token: string | null = null

  // Implementando sem tipagem por enquanto
  user: User = {
    role: "professor",

    cpf: "03690208122",
    nome: "Fulano Da Silva Sanches",
    email: "fulano.silva@hotmail.com",
    celular: "67998801996",
    dataNascimento: "23/10/1996",
    genero: "masculino",

    dataInicioEnsino: "12/04/2015",
    formacaoAcademica: "superior",
    nivelLecionamento: "superior"
  }

  get isLoggedIn() {
    return !!this.token
  }

  /**
   * Chamado quando o usuário realiza login ou se atualiza
   *
   * @param payload.token - O JWT do usuário
   * @param payload.user  - O objeto do usuário
   */
  @Mutation
  AUTH_SUCCESS(payload: LoginResponse) {
    const { token, user } = payload

    localStorage.setItem("api_token", token)

    this.user = user
    this.token = token

    if (router.currentRoute.path !== "/home") router.push({ path: "/home" })
  }

  /**
   * Chamado quando o usuário realiza logout:
   *
   * @param payload.redirectTo - path da rota ao redirecionar após logout
   * @param payload.clearLocalStorage - se a localStorage deve ser limpa
   */
  @Mutation
  AUTH_LOGOUT(payload?: LogoutOptions) {
    localStorage.removeItem("api_token")

    this.token = null
    const def = { redirectTo: "/home", clearLocalStorage: true }
    const { redirectTo, clearLocalStorage } = { ...def, ...payload }

    if (clearLocalStorage) localStorage.clear()

    if (router.currentRoute.path !== redirectTo) router.push({ path: redirectTo })
  }

  @Action({ rawError: true })
  async LOGIN({ username, password }: { username: string; password: string }) {
    return loginService(username, password).then(response => {
      this.context.commit("AUTH_SUCCESS", response)
    })
  }

  /**
   * Essa action existe pois provavelmente vou ter mais lógica
   * ex: chamar outras mutações aqui
   */
  @Action({ rawError: true })
  LOGOUT(payload?: LogoutOptions) {
    this.context.commit("AUTH_LOGOUT", payload)
  }
}
