import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators"
import { LogoutPayload, UpdateUserPayload, User } from "./auth-types"
import { LoginResponse, JWT, loginService } from "@/api/auth/login"
import { deleteUserService } from "@/api/users/delete"
import TutorModule, { isTutor } from "./tutor-module"
import { AUTH_ROUTES } from "@/router/rotas/comun"
import ProfessorModule, { isProfessor } from "./professor-module"
import store from ".."
import router from "@/router"

@Module({
  name: "auth",
  namespaced: true
})
export default class Auth extends VuexModule {
  token: JWT | null = null

  user: User | null = null

  isLoggingOut = false

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

  @Mutation
  AUTH_UPDATE(payload: { user: User; token?: JWT }) {
    const { user, token } = payload

    if (token) {
      localStorage.setItem("api_token", token.value)
      this.token = token
    }

    this.user = user
  }

  @Mutation
  AUTH_LOGOUT(redirectTo?: string) {
    this.isLoggingOut = true

    localStorage.removeItem("api_token")

    this.token = null
    this.user = null

    if (redirectTo) router.push(redirectTo)

    this.isLoggingOut = false
  }

  @Action({ rawError: true })
  async login({ email, password }: { email: string; password: string }) {
    return loginService(email, password).then(response => {
      this.AUTH_SUCCESS(response)
    })
  }

  /**
   * Realiza logout, unica diferença de chamar AUTH_LOGOUT é que aqui podemos
   * especificar se queremos limpar TODO o state da aplicação
   *
   * @fires AUTH_LOGOUT
   * @fires root/RESET_VUEX_STATE - se payload.clearState é true
   *
   * @param payload.clearState - defaults to true
   */
  @Action({ rawError: true })
  logout(payload?: LogoutPayload) {
    const defaultOptions = { clearState: true, redirectTo: AUTH_ROUTES.LOGIN }

    const options = { ...defaultOptions, ...payload }

    this.AUTH_LOGOUT(options?.redirectTo)

    if (options?.clearState) this.context.dispatch("RESET_VUEX_STATE", null, { root: true })
  }

  @Action({ rawError: true })
  async deleteUser(userId: string): Promise<boolean> {
    return deleteUserService(userId).then(() => true)
  }

  @Action({ rawError: true })
  async updateUser(payload: UpdateUserPayload): Promise<void> {
    const { user, id, foto } = payload

    if (isTutor(user)) {
      const tutorModule = getModule(TutorModule, store)
      console.log("user", user)
      return tutorModule
        .updateTutor({
          data: { tutor: user, id, foto },
          options: { updateRecord: true }
        })
        .then(updatedTutor => {
          const updatedUser = { ...updatedTutor, isAdmin: user.isAdmin }
          console.log("updatedUser", updatedUser)
          this.AUTH_UPDATE({ user: { ...updatedUser, isMonitor: false } })
        })
    }

    if (isProfessor(user)) {
      const professorModule = getModule(ProfessorModule, store)

      return professorModule
        .updateProfessor({
          data: { professor: user, id, foto },
          options: { updateRecord: false }
        })
        .then(updatedProfessor => {
          const updated = { ...updatedProfessor, isAdmin: user.isAdmin }
          this.AUTH_UPDATE({ user: { ...updated, isMonitor: false } })
        })
    }
  }
}
