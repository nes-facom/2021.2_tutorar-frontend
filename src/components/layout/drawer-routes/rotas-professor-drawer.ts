import { COMMON_ROUTES } from "@/router/rotas/comun"
import { DrawerRoute } from "."

const rotas: DrawerRoute[] = [
  {
    icon: "mdi-account",
    title: "Meu Usuário",
    to: COMMON_ROUTES.MEU_PERFIL
  },
  {
    title: "Mensagens",
    icon: "mdi-android-messages",
    to: "/professor/mensagens"
  },
  {
    title: "Procurar Tutoria",
    icon: "mdi-google-classroom",
    to: "/professor/procurar-tutoria"
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
