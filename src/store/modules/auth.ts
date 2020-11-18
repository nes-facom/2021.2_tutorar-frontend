import loginService, { LoginResponse, JWT } from "@/api/auth/login"
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators"
import { LogoutPayload, UpdateUserPayload, User } from "./auth-types"
import TutorModule, { isProfessor, isTutor } from "./tutor-module"
import { UpdateTutorPayload } from "@/store/modules/tutor-module"
import store from ".."

@Module({
  namespaced: true,
  name: "auth"
})
export default class Auth extends VuexModule {
  token: JWT | null = null

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

    localStorage.setItem("api_token", token.value)

    this.user = user
    this.token = token
  }

  /**
   * Atualiza o usuário e o seu JWT
   */
  @Mutation
  AUTH_UPDATE(payload: { user: User; token?: JWT }) {
    const { user, token } = payload

    if (token) {
      localStorage.setItem("api_token", token.value)
      this.token = token
    }
    this.user = user
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
  async login({ email, password }: { email: string; password: string }) {
    return loginService(email, password).then(response => {
      this.AUTH_SUCCESS(response)
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
  logout(payload?: LogoutPayload) {
    const options = { ...{ clearState: true }, ...payload }

    if (options?.clearState) this.context.dispatch("RESET_VUEX_STATE", null, { root: true })

    this.AUTH_LOGOUT()
  }

  @Action({ rawError: true })
  updateUser(payload: UpdateUserPayload) {
    const { user, id, foto } = payload

    if (isTutor(user)) {
      const payload: UpdateTutorPayload = {
        data: { tutor: user, id, foto },
        options: { updateRecord: false }
      }
      const tutorModule = getModule(TutorModule, store)

      tutorModule.updateTutor(payload).then(updatedUser => {
        this.AUTH_UPDATE({ user: updatedUser })
      })
    }

    if (isProfessor(user)) console.log("A implementar update de usuario professor")
  }
}
