import { DrawerRoute } from "."

const rotas: DrawerRoute[] = [
  {
    icon: "mdi-account",
    title: "Meu Usuário",
    to: "/meu-perfil"
  },
  {
    title: "Agenda",
    icon: "mdi-calendar",
    to: "/professor/agenda"
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
        to: "/perfil"
      }
    ]
  }
]

export default rotas
