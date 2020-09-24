import { RouteConfig } from "@/router";

const rotas: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "PageHome" */ "@/pages/PageHome.vue")
    // meta: {
    //   requiredResources: ['tutorias']
    // }
  },

  // =========================== ROTAS DE ERROS ===========================
  {
    path: "/acesso-negado",
    component: () =>
      import(
        /* webpackChunkName: "DefaultUnauthorizedPage" */ "@/pages/errors/DefaultUnauthorizedPage.vue"
      )
  },
  {
    path: "*",
    component: () =>
      import(
        /* webpackChunkName: "DefaultNotFoundPage" */ "@/pages/errors/DefaultNotFoundPage.vue"
      )
  }
];

export default rotas;
