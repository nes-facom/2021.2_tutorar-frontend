import { RouteConfig, RouteMeta } from "@/router"

export enum TUTOR_ROUTES {
  PERFIL = "/tutor/meu-perfil",
  PERFIL_RESUMIDO = "/tutor/perfil",
  MINHAS_HABILIDAES = "/tutor/minhas-habilidades"
}

const rotas: RouteConfig[] = [
  {
    path: TUTOR_ROUTES.PERFIL,
    component: () => import(/* webpackChunkName: "PagePerfilTutor" */ "@/pages/tutor/perfil/PagePerfilTutor.vue"),
    meta: {
      requireLogin: true,
      requireRole: "tutor"
    }
  },
  {
    path: TUTOR_ROUTES.MINHAS_HABILIDAES,
    component: () => import(/* webpackChunkName: "PageSelecaoHabilidades" */ "@/pages/tutor/PageSelecaoHabilidades.vue")
  },
  {
    path: TUTOR_ROUTES.PERFIL_RESUMIDO,
    component: () =>
      import(/* webpackChunkName: "CardPerfilResumidoTutor" */ "@/pages/tutor/perfil/CardPerfilResumidoTutor.vue"),
    meta: {
      requireLogin: true
    }
  }
]

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = {
    requireLogin: true,
    requireRole: "tutor"
  }

  route.meta = { ...route.meta, ...defaultMeta }
})

export default rotas
