import loginService, { ExpectedResponseData as LoginResponse } from "@/api/auth/login"
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { LogoutOptions, User } from "./auth-types"

@Module({
  namespaced: true,
  name: "auth"
})
export default class Auth extends VuexModule {
  token: string | null = null

  user: User | null = null

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
  }

  /**
   * Chamado quando o usuário realiza logout:
   *
   * @param payload.clearLocalStorage - se a localStorage deve ser limpa
   */
  @Mutation
  AUTH_LOGOUT(payload?: LogoutOptions) {
    localStorage.removeItem("api_token")

    this.token = null
    const def = { redirectTo: "/home", clearLocalStorage: true }
    const { clearLocalStorage } = { ...def, ...payload }

    if (clearLocalStorage) localStorage.clear()
  }

  @Action({ rawError: true })
  async login({ username, password }: { username: string; password: string }) {
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
