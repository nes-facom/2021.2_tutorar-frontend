import { getModule } from "vuex-module-decorators"
import auth from "@/store/modules/auth"
import store from "@/store"
import { isTutor } from "@/store/modules/tutor-module"
import { PROFESSOR_ROUTES } from "../rotas/professor"
import { TUTOR_ROUTES } from "../rotas/tutor"
import { isProfessor } from "@/store/modules/professor-module"
import { COMMON_ROUTES } from "../rotas/comun"

/**
 * Retorna a rota "perfil" (padrão) de acordo com o tipo
 * de usuário logado
 */
export function getPerfilRoute(): string {
  if (!store || !auth) return COMMON_ROUTES.HOME

  const authModule = getModule(auth, store)

  const { user } = authModule

  if (isProfessor(user)) return PROFESSOR_ROUTES.PERFIL
  if (isTutor(user)) return TUTOR_ROUTES.PERFIL_PROPRIO

  return COMMON_ROUTES.HOME
}
