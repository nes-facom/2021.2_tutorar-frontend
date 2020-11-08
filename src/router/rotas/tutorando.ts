import { RouteConfig, RouteMeta } from "@/router"

const rotas: RouteConfig[] = []

rotas.map(route => {
  if (!route.meta) route.meta = {}

  const defaultMeta: RouteMeta = {
    requireLogin: true,
    requireRole: "tutorando"
  }

  route.meta = { ...route.meta, ...defaultMeta }
})

export default rotas
