import error from "@/router/rotas/error";
import comun from "@/router/rotas/comun";
import tutorando from "@/router/rotas/tutorando";
import professor from "@/router/rotas/professor";

const rotas = [
  ...error,
  ...comun,
  ...professor,
  ...tutorando
]

export default rotas;

// Infelizmente o TS não tem suporte a criar um tipo
// com base nas rotas informadas no arquivos acima pois
// const assertions can only be applied immediately on simple literal expressions.

// VER: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

// Então tenho que fazer na mão mesmo
const paths = [
  '/',
  '/home',
  '/professor/usuario',
  '/tutorando/usuario',
  '/acesso-negado',
  '*'
] as const

export type AppRoute = typeof paths[number];