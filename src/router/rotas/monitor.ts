import { RouteConfig, RouteMeta } from "@/router"

const rotas: RouteConfig[] = [
  {
    path: "/monitor/listagem-usuarios",
    component: () => import(/* webpackChunkName: "PageListagemUsuarios" */ "@/pages/monitor/ListagemUsuarios.vue"),
    meta: {
      requireRole: false,
      requireLogin: false
    }
  }
]

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = {
    requireLogin: true
    // @TODO: ao implementar com o back
    // requireRole: ["monitor"]
  }

  route.meta = { ...route.meta, ...defaultMeta }
})

export default rotas
