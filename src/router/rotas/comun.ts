import { RouteConfig } from "@/router"
import store from "../../store/index"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { ERROR_ROUTES } from "./error"
import { isTutor } from "@/store/modules/tutor-module"
import { TUTOR_ROUTES } from "./tutor"
import { PROFESSOR_ROUTES } from "./professor"
import { MONITOR_ROUTES } from "./monitor"
import { isProfessor } from "@/store/modules/professor-module"
import { isMonitor } from "@/store/modules/users-module"

export enum AUTH_ROUTES {
  LOGIN = "/login",
  CADASTRO_TUTOR = "/cadastro/tutor",
  CADASTRO_PROFESSOR = "/cadastro/professor"
}

export enum COMMON_ROUTES {
  HOME = "/home",
  MEU_PERFIL = "/meu-perfil",
  NOVA_SENHA = "/nova-senha",
  RECUPERAR_SENHA = "/recuperar-senha"
}

const rotas: RouteConfig[] = [
  {
    path: "/",
    redirect: COMMON_ROUTES.HOME
  },
  {
    path: COMMON_ROUTES.HOME,
    redirect: () => {
      const { user } = getModule(Auth, store)

      if (isTutor(user)) return TUTOR_ROUTES.PERFIL_PROPRIO
      if (isMonitor(user)) return MONITOR_ROUTES.LISTAGEM_USUARIOS
      if (isProfessor(user)) return PROFESSOR_ROUTES.ESCOLHER_TUTOR

      return AUTH_ROUTES.LOGIN
    }
  },
  {
    path: AUTH_ROUTES.LOGIN,
    component: () => import(/* webpackChunkName: "PageLogin" */ "@/pages/auth/Login.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: AUTH_ROUTES.CADASTRO_PROFESSOR,
    component: () => import(/* webpackChunkName: "PageCadastroProfessor" */ "@/pages/auth/CadastroProfessor.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: AUTH_ROUTES.CADASTRO_TUTOR,
    component: () => import(/* webpackChunkName: "PageCadastroTutor" */ "@/pages/auth/CadastroTutor.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: COMMON_ROUTES.MEU_PERFIL,
    redirect: () => {
      const { user } = getModule(Auth, store)
      if (!user) return ERROR_ROUTES.FORBIDDEN

      if (isTutor(user)) return TUTOR_ROUTES.PERFIL_PROPRIO
      if (isProfessor(user)) return PROFESSOR_ROUTES.PERFIL

      return "/home"
    },
    meta: {
      requireLogin: true
    }
  },
  {
    path: COMMON_ROUTES.RECUPERAR_SENHA,
    component: () => import(/* webpackChunkName: "RecuperarSenha" */ "@/pages/auth/RecuperarSenha.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: COMMON_ROUTES.NOVA_SENHA,
    component: () => import(/* webpackChunkName: "NovaSenha" */ "@/pages/auth/NovaSenha.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  }
]

export default rotas
