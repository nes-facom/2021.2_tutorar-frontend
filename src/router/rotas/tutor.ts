import { RouteConfig, RouteMeta } from "@/router"

export enum TUTOR_ROUTES {
  AGENDA = "/tutor/minha-agenda",
  PERFIL_PROPRIO = "/tutor/meu-perfil",
  HABILIDADES = "/tutor/minhas-habilidades"
}

const rotas: RouteConfig[] = [
  {
    path: TUTOR_ROUTES.PERFIL_PROPRIO,
    component: () =>
      import(
        /* webpackChunkName: "PagePerfilUsuarioTutor" */ "@/pages/tutor/perfil/usuario/PagePerfilUsuarioTutor.vue"
      ),
    meta: {
      requireLogin: true,
      requireRole: "tutor"
    }
  },
  {
    path: TUTOR_ROUTES.HABILIDADES,
    component: () => import(/* webpackChunkName: "PageSelecaoHabilidades" */ "@/pages/tutor/PageSelecaoHabilidades.vue")
  },
  {
    path: "/tutor/:id/perfil",
    component: () => import(/* webpackChunkName: "PagePerfilTutor" */ "@/pages/tutor/perfil/outro/PagePerfilTutor.vue"),
    meta: {
      requireRole: false,
      requireLogin: true
    }
  },
  {
    path: TUTOR_ROUTES.AGENDA,
    component: () => import(/* webpackChunkName: "PageAgenda" */ "@/pages/tutor/agenda/PageAgenda.vue")
  }
]

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = {
    requireLogin: true,
    requireRole: "tutor"
  }

  route.meta = { ...defaultMeta, ...route.meta }
})

export default rotas
