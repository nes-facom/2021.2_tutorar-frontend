import { RouteConfig } from "@/router"
import { HOME_ROUTES } from "../utils/get-home-route"

export enum AUTH_ROUTES {
  LOGIN = "/login",
  CADASTRO_TUTOR = "/cadastro/tutor",
  CADASTRO_PROFESSOR = "/cadastro/professor"
}

export enum COMMON_ROUTES {
  MEU_PERFIL = "/meu-perfil"
}

const rotas: RouteConfig[] = [
  {
    path: "/",
    redirect: HOME_ROUTES.DEFAULT
  },
  {
    path: HOME_ROUTES.DEFAULT,
    component: () => import(/* webpackChunkName: "PageHome" */ "@/pages/common/Home.vue")
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
    component: () =>
      import(/* webpackChunkName: "PageExibicaoPerfilUsuario" */ "@/pages/common/MeuPerfil/MeuPerfil.vue"),
    meta: {
      requireLogoff: false
    }
  },
  {
    path: "/agenda",
    component: () => import(/* webpackChunkName: "PageAgenda" */ "@/pages/agenda/Agenda.vue")
  }
]

export default rotas
