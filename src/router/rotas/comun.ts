import { RouteConfig } from "@/router"
import { HOME_ROUTES } from "../utils/get-home-route"

export enum AUTH_ROUTES {
  LOGIN = "/login",
  CADASTRO_TUTOR = "/cadastro/tutor",
  CADASTRO_PROFESSOR = "/cadastro/professor"
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
    path: "/meu-perfil",
    component: () =>
      import(/* webpackChunkName: "PageExibicaoPerfilUsuario" */ "@/pages/common/MeuPerfil/MeuPerfil.vue"),
    meta: {
      requireLogoff: false
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
<<<<<<< HEAD
  },
  {
    path: "/perfil",
    component: () => import(/* webpackChunkName: "PageTeste" */ "@/pages/Perfil.vue")
  },
  {
    path: "/agenda",
    component: () => import(/* webpackChunkName: "PageTeste" */ "@/pages/agenda/Agenda.vue")
=======
>>>>>>> DV-004
  }
]

export default rotas
