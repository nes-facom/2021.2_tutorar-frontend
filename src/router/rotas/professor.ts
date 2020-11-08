import { RouteConfig, RouteMeta } from "@/router"

export enum PROFESSOR_ROUTES {
  EXIBIR_PERFIL = "/professor/perfil"
}

const rotas: RouteConfig[] = [
  {
    path: PROFESSOR_ROUTES.EXIBIR_PERFIL,
    component: () => import(/* webpackChunkName: "PagePerfilProfessor" */ "@/pages/professor/PerfilProfessor.vue"),
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
