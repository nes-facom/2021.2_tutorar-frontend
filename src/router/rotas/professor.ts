import { defaults } from "lodash";
import { RouteConfig } from "@/router";

const rotas: RouteConfig[] = [
  {
    path: "/professor/usuario",
    component: () =>
      import(/* webpackChunkName: "PageUsuario" */ "@/pages/PageUsuario.vue"),
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
    requireRole: ["professor"]
  };

  defaults(route.meta, defaultMeta);
});

export default rotas;
