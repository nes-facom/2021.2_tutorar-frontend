import router from "@/router";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import loginService, {
  ExpectedResponseData as LoginResponse
} from "@/api/auth/login";

interface LogoutOptions {
  redirectTo?: string;
  clearLocalStorage?: boolean;
}

/**
 * @TODO: Rascunho de tipagem de usuário
 * quando o formulário / padrão / tipo
 * dos dados de professor tiver 100%
 * implementar tipagem
 */
interface BaseUser {
  cpf: string;
  nome: string;
  email: string;
  celular: string;
  dataNascimento: string;
  genero: "masculino" | "feminino" | "não informado";
}

export interface UserProfessor extends BaseUser {
  dataInicioEnsino: string;
  formacaoAcademica: "basica" | "tecnica" | "superior";
  nivelLecionamento: "infantil" | "fundamental" | "médio" | "superior";
}

export interface UserTutor extends BaseUser {
  universidade: string;
  cursoLicensiatura: string;
  semestreNoCadastro: string;

  anoFimLicensiatura: string;
  anoInicioLicensiatura: string;
}

/**
 * Tipagem temporaria, ver acima
 */
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
    return !!this.token;
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

    this.user = user;
    this.token = token;

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
    let path = "/home";

    this.token = null;
    window.localStorage.removeItem("token");

    if (payload) {
      const { redirectTo, clearLocalStorage } = payload;

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
  @Action({ rawError: true })
  async LOGIN({ username, password }: { username: string; password: string }) {
    return loginService(username, password).then(response => {
      this.context.commit("AUTH_SUCCESS", response);
    });
  }

  /**
   * @param payload.resetState - se todo o estado da aplicação deve ser resetado
   * @param payload.clearLocalStorage - se toda a localStorage deve ser limpa
   */
  @Action({ rawError: true })
  LOGOUT(payload?: LogoutOptions) {
    this.context.commit("AUTH_LOGOUT");

    const redirectTo = payload?.redirectTo || "/home";

    if (redirectTo && router.currentRoute.path !== redirectTo) {
      router.push({ path: redirectTo });
    }
  }
}
