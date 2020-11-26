import { RouteConfig } from "@/router"
import { HOME_ROUTES } from "../utils/get-home-route"

export enum AUTH_ROUTES {
  LOGIN = "/login",
  CADASTRO_TUTOR = "/cadastro/tutor",
  CADASTRO_PROFESSOR = "/cadastro/professor"
}

export enum COMMON_ROUTES {
  MEU_PERFIL = "/meu-perfil",
  AGENDA = "/agenda",
  RECUPERAR_SENHA =  "/recuperar-senha",
  NOVA_SENHA = "/nova-senha"
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
    path: COMMON_ROUTES.AGENDA,
    component: () => import(/* webpackChunkName: "PageAgenda" */ "@/pages/agenda/Agenda.vue")
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
