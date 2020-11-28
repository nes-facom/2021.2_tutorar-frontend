import { COMMON_ROUTES } from "@/router/rotas/comun"
import { TUTOR_ROUTES } from "@/router/rotas/tutor"
import { DrawerRoute } from "."

const rotas: DrawerRoute[] = [
  {
    icon: "mdi-account",
    title: "Meu Usuário",
    to: COMMON_ROUTES.MEU_PERFIL
  },
  {
    title: "Agenda",
    icon: "mdi-calendar",
    to: TUTOR_ROUTES.AGENDA
  },
  {
    title: "Minhas Habilidades",
    icon: "mdi-account-details",
    to: TUTOR_ROUTES.HABILIDADES
  },
  {
    title: "Dev",
    icon: "mdi-dev-to",
    subrotas: [
      {
        icon: "mdi-toy-brick",
        title: "Sandbox",
        to: "/teste"
      }
    ]
  }
]

export default rotas
