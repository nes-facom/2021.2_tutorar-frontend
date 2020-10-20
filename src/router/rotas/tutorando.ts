import { RouteConfig, RouteMeta } from "@/router"

const rotas: RouteConfig[] = [
  {
    path: "/tutorando/usuario",
    component: () => import(/* webpackChunkName: "PageUsuario" */ "@/pages/MeuUsuario/MeuUsuario.vue"),
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
    requireRole: "tutorando"
  }

  route.meta = { ...route.meta, ...defaultMeta }
})

export default rotas
