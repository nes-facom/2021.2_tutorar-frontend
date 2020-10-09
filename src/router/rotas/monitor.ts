import { defaults } from "lodash";
import { RouteConfig } from "@/router";

const rotas: RouteConfig[] = [
  {
    path: "/monitor/listagem-usuarios",
    component: () =>
      import(/* webpackChunkName: "PageListagemUsuarios" */ "@/pages/monitor/ListagemUsuarios.vue"),
    meta: {
      requireRole: false,
      requireLogin: false
    }
  }
];

rotas.map(route => {
  if (!route.meta) route.meta = {};

  const defaultMeta = {
    requireLogin: true,
    // @TODO: ao implementar com o back
    // requireRole: ["monitor"]
  };

  defaults(route.meta, defaultMeta);
});

export default rotas;
