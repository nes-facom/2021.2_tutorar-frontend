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
  },
  {
    path: "/teste",
    component: () =>
      import(/* webpackChunkName: "PageTeste" */ "@/pages/PageTeste.vue")
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "PageLogin" */ "@/pages/PageLogin.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  }
];

export default rotas;
