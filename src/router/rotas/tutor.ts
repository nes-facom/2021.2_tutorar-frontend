import { RouteConfig, RouteMeta } from "@/router"

export enum TUTOR_ROUTES {
  AGENDA = "/tutor/minha-agenda",
  HOME = "/tutor/home",
  PERFIL_PROPRIO = "/tutor/meu-perfil"
}

const rotas: RouteConfig[] = [
  {
    path: TUTOR_ROUTES.HOME,
    component: () =>
      import(
        /* webpackChunkName: "PagePerfilUsuarioTutor" */ "@/pages/tutor/home/PageHomeTutor.vue"
      ),
    meta: {
      requireLogin: true,
      requireRole: "tutor"
    }
  },
  {
    path: TUTOR_ROUTES.PERFIL_PROPRIO,
    component: () => import(/* webpackChunkName: "PagePerfilTutor" */ "@/pages/tutor/perfil/usuario/PagePerfilUsuarioTutor.vue")
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
