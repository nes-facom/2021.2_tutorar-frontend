import { RouteConfig } from "@/router"

export enum AUTH_ROUTES {
  LOGIN = "/login"
}

const rotas: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import(/* webpackChunkName: "PageHome" */ "@/pages/Home.vue")
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
    path: "/cadastro/professor",
    component: () => import(/* webpackChunkName: "PageCadastroProfessor" */ "@/pages/auth/CadastroProfessor.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: "/cadastro/tutor",
    component: () => import(/* webpackChunkName: "PageCadastroTutor" */ "@/pages/auth/CadastroTutor.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: "/perfil",
    component: () => import(/* webpackChunkName: "PageTeste" */ "@/pages/Perfil.vue")
  }
]

export default rotas
