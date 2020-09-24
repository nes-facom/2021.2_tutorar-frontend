const rotas = [
  {
    icon: "mdi-chart-bar",
    title: "Informações Gerais",
    to: "informacoes-gerais"
  },
  {
    title: "Mapa",
    icon: "mdi-map",
    to: "mapa"
  },
  {
    title: "Cadastro",
    icon: "mdi-clipboard-outline",
    subrotas: [
      {
        icon: "mdi-message-alert",
        title: "Mensagem do Sistema",
        to: "cadastro/mensagem"
      }
    ]
  }
];

rotas.map(rota => {
  if (rota.to) rota.to = `/desenvolvedor/${rota.to}`;
  if (rota.subrotas)
    rota.subrotas.map(subrota => {
      if (subrota.to) subrota.to = `/desenvolvedor/${subrota.to}`;
    });
});

export default rotas;
