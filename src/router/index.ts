import Vue from "vue"
import VueRouter from "vue-router"

import store from "@/store"
import routes from "@/router/rotas"

import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { RouteConfigSingleView } from "vue-router/types/router"

import { AUTH_ROUTES, COMMON_ROUTES } from "./rotas/comun"
import { ERROR_ROUTES } from "./rotas/error"

export interface RouteMeta {
  // Auth
  requireRole?: false | "tutor" | "monitor" | "admin" | "professor"
  requireLogin?: boolean
  requireLogoff?: boolean

  // Styling
  fullpage?: boolean
  centered?: boolean

  // Roteamento
  onFailRedirectTo?: string

  // Error
  isErrorRoute?: boolean
}

export interface RouteConfig extends Omit<RouteConfigSingleView, "meta"> {
  path: string
  meta?: RouteMeta
}

Vue.use(VueRouter)

/**
 * Se a rota não é de redirect, tem um path e não tem um name específico
 * o name é a conversão do path para o padrão a seguir
 * Ex: /meu/path/test -> Meu_Path_Test
 */
routes.map(route => {
  if (!route.redirect && !route.name && route.path) {
    route.name = route.path
      .split("/")
      .filter(v => v)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join("_")
  }
})

const router = new VueRouter({ mode: "history", base: "/", routes })

/**
 * Aqui acontece toda a lógica necessária antes de entrar em uma rota, como:
 * Verificar permissões do usuário
 * Verificar papeis do usuário
 * Enviar requests a API preemptivamente
 */
router.beforeEach((to, from, next) => {
  const meta: RouteMeta = to.meta || {}
  const { isLoggedIn, user, isLoggingOut } = getModule(Auth, store)

  // Barra usuários logados tentando acessar login para home
  if (meta.requireLogoff && isLoggedIn && !isLoggingOut) return next(COMMON_ROUTES.HOME)

  // Barra usuários deslogados se a rota requer login
  if (meta.requireLogin && !isLoggedIn) return next(AUTH_ROUTES.LOGIN)

  // Barro usuários sem papel necessário pra acessar a rota
  if (user && meta.requireRole && meta.requireRole !== user.role) return next(ERROR_ROUTES.FORBIDDEN)

  return next()
})

export default router
