import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import rotas from "@/router/rotas";

import { getModule } from "vuex-module-decorators";
import Auth, { UserRoles } from "@/store/modules/auth";
import { RouteConfigSingleView } from "vue-router/types/router";

import fetchResourcesPreenptively, {
  resources
} from "@/router/utils/fetchResourcesPreenptively";

export interface RouteMeta {
  requireRole?: false | UserRoles;
  requireLogin?: boolean;
  requireLogoff?: boolean;
  requiredResources?: resources[];

  fullPage?: boolean;
  centered?: boolean;
}

export interface RouteConfig extends Omit<RouteConfigSingleView, "meta"> {
  path: string;
  meta?: RouteMeta;
}

Vue.use(VueRouter);

const {
  comun: rotasComuns,
  tutorando: rotasTutorandos,
  professor: rotasProfessores
} = rotas;

const routes: RouteConfig[] = [
  ...rotasComuns,
  ...rotasTutorandos,
  ...rotasProfessores
];

/**
 * Se a rota não é de redirect, tem um path e não tem um name específico
 * o name é a conversão do path para o padrão a seguir
 * Ex: /meu/path/maroto -> Meu_Path_Maroto
 */
routes.map(route => {
  if (!route.redirect && !route.name && route.path) {
    route.name = route.path
      .split("/")
      .filter(v => v)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join("_");
  }
});

const router = new VueRouter({ mode: "history", base: "/", routes });

/**
 * Aqui acontece toda a lógica necessária antes de entrar em uma rota, como:
 * Verificar permissões do usuário
 * Verificar papeis do usuário
 * Enviar requests a API preemptivamente
 * Etc..
 *
 * Obviamente isso deve ficar simples e conter lógica uteis a todas as rotas
 * para executar a lógica em apenas uma rota basta definir a prop beforeEnter
 * na rota desejada
 */
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const { isLoggedIn, user } = getModule(Auth, store);

  const redirectWithFallback = (fallback = `${user.role}/home`) =>
    meta.onFailRedirectTo ? next(meta.onFailRedirectTo) : next(fallback);

  // Barra usuários logados tentando acessar login para home
  if (meta.requireLogoff && isLoggedIn) {
    return redirectWithFallback();
  }

  // Barra usuários deslogados se a rota requer login
  if (meta.requireLogin && !isLoggedIn) {
    return redirectWithFallback("/login");
  }

  // Barro usuários sem papel necessário pra acessar a rota
  if (
    Array.isArray(meta.requireRole) &&
    meta.requireRole.indexOf(user.role) === -1
  ) {
    return redirectWithFallback("/acesso-negado");
  }

  // Se a rota requer alguns recursos eu a os pego
  if (
    Array.isArray(meta.requiredResources) &&
    meta.requiredResources.length > 0
  ) {
    fetchResourcesPreenptively(meta.requiredResources);
  }

  return next();
});

export default router;
