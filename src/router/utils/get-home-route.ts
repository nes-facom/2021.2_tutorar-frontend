import { getModule } from "vuex-module-decorators"
import auth from "@/store/modules/auth"
import store from "@/store"
import { isTutor } from "@/store/modules/tutor-module"
import { PROFESSOR_ROUTES } from "../rotas/professor"
import { TUTOR_ROUTES } from "../rotas/tutor"
import { isProfessor } from "@/store/modules/professor-module"

export enum HOME_ROUTES {
  DEFAULT = "/home",

  TUTOR = "/home",
  PROFESSOR = "/home"
}

/**
 * Retorna a rota "home" (padrão) de acordo com o nível
 * de acesso do usuário e se ele esta logado.
 *
 * Esse método precisa que a store esteja corretamente instanciada e montada,
 * em uma instancia do Vue, chama-la de um módulo js comun ocasiona em erro.
 */
export function getHomeRoute(): HOME_ROUTES {
  if (!store || !auth) return HOME_ROUTES.DEFAULT

  const authModule = getModule(auth, store)

  const { user } = authModule

  if (isProfessor(user)) return HOME_ROUTES.PROFESSOR
  if (isTutor(user)) return HOME_ROUTES.TUTOR

  return HOME_ROUTES.DEFAULT
}

/**
 * Retorna a rota "perfil" (padrão) de acordo com o tipo
 * de usuário logado
 */
export function getPerfilRoute(): string {
  if (!store || !auth) return HOME_ROUTES.DEFAULT

  const authModule = getModule(auth, store)

  const { user } = authModule

  if (isProfessor(user)) return PROFESSOR_ROUTES.PERFIL
  if (isTutor(user)) return TUTOR_ROUTES.PERFIL

  return HOME_ROUTES.DEFAULT
}
