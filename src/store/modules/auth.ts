import router from "@/router";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import loginService, { ExpectedResponseData as LoginResponse } from "@/api/auth/login";

interface LogoutOptions {
  redirectTo?: string;
  clearLocalStorage?: boolean;
}

export interface User {
  name: string;
  role: UserRoles;
}

export type UserRoles = "tutorando" | "professor";

@Module({ namespaced: true, name: "auth" })
export default class Auth extends VuexModule {
  token = window.localStorage.getItem("token");

  user: User | null = null;

  get isLoggedIn() {
    // return !!this.token;
    return true;
  }

  /**
   * Chamado quando o usuário realiza login ou se atualiza
   *
   * @param payload.token - O JWT do usuário
   * @param payload.user  - O objeto do usuário
   */
  @Mutation
  AUTH_SUCCESS(payload: LoginResponse) {
    const { token, user } = payload;

    window.localStorage.setItem("token", `Bearer ${token}`);

    this.token = token;
    this.user = user;

    if (router.currentRoute.path !== "/home") {
      router.push({ path: "/home" });
    }
  }

  /**
   * Chamado quando o usuário realiza logout:
   *
   * @param payload.redirectTo - path da rota ao redirecionar após logout
   * @param payload.clearLocalStorage - se a localStorage deve ser limpa
   */
  @Mutation
  AUTH_LOGOUT(payload?: LogoutOptions) {

    let path = "/home"
    this.token = null;
    window.localStorage.removeItem("token");

    if (payload) {
      const { redirectTo, clearLocalStorage } = payload

      if (clearLocalStorage) localStorage.clear();
      if (redirectTo) path = redirectTo;
    }

    if (router.currentRoute.path !== path) {
      router.push({ path });
    }
  }

  /**
   * @param payload.username - o nome de usuário
   * @param payload.password - a senha do usuário
   */
  @Action
  async LOGIN({ username, password }: { username: string; password: string }) {
    return loginService(username, password).then(response =>
      this.context.commit("AUTH_SUCCESS", response)
    );
  }

  /**
   * @param payload.resetState - se todo o estado da aplicação deve ser resetado
   * @param payload.clearLocalStorage - se toda a localStorage deve ser limpa
   */
  @Action
  LOGOUT(payload?: LogoutOptions) {
    this.context.commit("AUTH_LOGOUT");

    // if (payload && payload.resetState) {
    //   this.context.dispatch(
    //     "RESET_VUEX_STATE",
    //     { clearLocalStorage: payload.clearLocalStorage },
    //     { root: true }
    //   );
    // }
  }
}
