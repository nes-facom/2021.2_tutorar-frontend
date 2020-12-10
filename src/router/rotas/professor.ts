import { RouteConfig, RouteMeta } from "@/router"

export enum PROFESSOR_ROUTES {
  PERFIL = "/professor/meu-perfil",
  PERFIL_RESUMIDO = "/professor/perfil",
  ESCOLHER_TUTOR = "/professor/escolher-tutor"
}

const rotas: RouteConfig[] = [
  {
    path: PROFESSOR_ROUTES.ESCOLHER_TUTOR,
    component: () =>
      import(/* webpackChunkName: "escolher-tutor" */ "@/pages/professor/escolher-tutor/PageEscolherTutor.vue"),
    meta: {
      requireLogin: true,
      requireRole: "professor"
    }
  },
  {
    path: PROFESSOR_ROUTES.PERFIL,
    component: () =>
      import(
        /* webpackChunkName: "PagePerfilUsuarioProfessor" */ "@/pages/professor/perfil/usuario/PagePerfilUsuarioProfessor.vue"
      ),
    meta: {
      requireLogin: true,
      requireRole: "professor"
    }
  },
  {
    path: PROFESSOR_ROUTES.PERFIL_RESUMIDO,
    component: () =>
      import(
        /* webpackChunkName: "CardPerfilResumidoProfessor" */ "@/pages/professor/perfil/outro/CardPerfilResumidoProfessor.vue"
      ),
    meta: {
      requireRole: false,
      requireLogin: false
    }
  }
]

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = {
    requireLogin: true,
    requireRole: "professor"
  }

  route.meta = { ...route.meta, ...defaultMeta }
})

export default rotas
