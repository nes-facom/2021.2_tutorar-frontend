import { DrawerRoute } from "."

const rotas: DrawerRoute[] = [
  {
    icon: "mdi-chart-bar",
    title: "Informações Gerais",
    to: "/tutorando/informacoes-gerais"
  },
  {
    title: "Mapa",
    icon: "mdi-map",
    to: "/tutorando/mapa"
  },
  {
    title: "Cadastro",
    icon: "mdi-clipboard-outline",
    subrotas: [
      {
        icon: "mdi-message-alert",
        title: "Mensagem do Sistema",
        to: "/tutorando/cadastro/mensagem"
      }
    ]
  }
]

export default rotas
