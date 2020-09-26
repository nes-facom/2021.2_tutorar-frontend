import { DrawerRoute } from ".";

const rotas: DrawerRoute[] = [
  {
    icon: "mdi-account",
    title: "Meu Usuário",
    to: "usuario"
  },
  {
    title: "Agenda",
    icon: "mdi-calendar",
    to: "agenda"
  },
  {
    title: "Mensagens",
    icon: "mdi-android-messages",
    to: "mensagens"
  },
  {
    title: "Procurar Tutoria",
    icon: "mdi-google-classroom",
    to: "procurar-tutoria"
  },
  {
    title: "Dev",
    icon: "mdi-dev-to",
    subrotas: [
      {
        icon: "mdi-toy-brick",
        title: "Sandbox",
        to: "teste"
      }
    ]
  }
];

rotas.map(rota => {
  if (rota.to) {
    rota.to = `/professor/${rota.to}`;
  }

  if (rota.subrotas) {
    rota.subrotas.map(subrota => {
      if (subrota.to) subrota.to = `/professor/${subrota.to}`;
    });
  }
});

export default rotas;
