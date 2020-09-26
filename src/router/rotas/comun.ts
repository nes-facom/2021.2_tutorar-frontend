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
];

export default rotas;
