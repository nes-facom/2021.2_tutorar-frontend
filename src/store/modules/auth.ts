import loginService, { LoginResponse } from "@/api/auth/login"
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
   */
  @Mutation
  AUTH_LOGOUT() {
    localStorage.removeItem("api_token")

    this.token = null
    this.user = null
  }

  @Action({ rawError: true })
  async login({ username, password }: { username: string; password: string }) {
    return loginService(username, password).then(response => {
      this.context.commit("AUTH_SUCCESS", response)
    })
  }

  /**
   * Realiza logout, unica diferença de chamar AUTH_LOGOUT é que aqui podemos
   * especificar se queremos limpar todo o state da aplicação
   *
   * @fires AUTH_LOGOUT
   * @fires root/RESET_VUEX_STATE - se payload.clearState é true
   *
   * @param payload.clearState - defaults to true
   */
  @Action({ rawError: true })
  logout(payload?: LogoutOptions) {
    const options = { ...{ clearState: true }, ...payload }

    if (options?.clearState) this.context.dispatch("RESET_VUEX_STATE", null, { root: true })

    this.context.commit("AUTH_LOGOUT")
  }
}
