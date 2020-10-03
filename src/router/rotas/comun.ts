import { RouteConfig } from "@/router";

const rotas: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "PageHome" */ "@/pages/Home.vue")
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "PageLogin" */ "@/pages/auth/Login.vue"),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: "/cadastro/professor",
    component: () =>
      import(
        /* webpackChunkName: "PageCadastroProfessor" */ "@/pages/auth/CadastroProfessor.vue"
      ),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: "/cadastro/tutor",
    component: () =>
      import(
        /* webpackChunkName: "PageCadastroTutor" */ "@/pages/auth/CadastroTutor.vue"
      ),
    meta: {
      fullpage: true,
      requireLogoff: true
    }
  },
  {
    path: "/teste",
    component: () =>
      import(/* webpackChunkName: "PageTeste" */ "@/pages/Teste.vue")
  }
];

export default rotas;
