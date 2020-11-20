import { RouteConfig, RouteMeta } from "@/router"

export enum TUTOR_ROUTES {
  MINHAS_HABILIDAES = "/minhas-habilidades"
}

const rotas: RouteConfig[] = [
  {
    path: TUTOR_ROUTES.MINHAS_HABILIDAES,
    component: () => import(/* webpackChunkName: "PageHabilidades" */ "@/pages/tutor/SelecaoHabilidades.vue")
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
