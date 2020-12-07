import { RouteConfig, RouteMeta } from "@/router"

export enum MONITOR_ROUTES {
  LISTAGEM_USUARIOS = "/monitor/listagem-usuarios"
}

const rotas: RouteConfig[] = [
  {
    path: MONITOR_ROUTES.LISTAGEM_USUARIOS,
    component: () => import(/* webpackChunkName: "PageListagemUsuarios" */ "@/pages/monitor/ListagemUsuarios.vue"),
    meta: {
      requireRole: false,
      requireLogin: false
    }
  }
]

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = { requireLogin: true, requireRole: "monitor" }

  route.meta = { ...defaultMeta, ...route.meta }
})

export default rotas
