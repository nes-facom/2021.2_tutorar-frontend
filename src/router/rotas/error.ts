import { RouteConfig, RouteMeta } from "@/router"

const rotas: RouteConfig[] = [
  {
    path: "/acesso-negado",
    component: () =>
      import(/* webpackChunkName: "DefaultUnauthorizedPage" */ "@/pages/errors/DefaultUnauthorizedPage.vue")
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "DefaultNotFoundPage" */ "@/pages/errors/DefaultNotFoundPage.vue")
  }
]

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = {
    isErrorRoute: true
  }

  route.meta = { ...route.meta, ...defaultMeta }
})

export default rotas
