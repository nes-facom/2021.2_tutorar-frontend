import { getModule } from "vuex-module-decorators"
import auth from "@/store/modules/auth"
import store from "@/store"

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
export default (): HOME_ROUTES => {
  if (!store || !auth) return HOME_ROUTES.DEFAULT

  const authModule = getModule(auth, store)

  const { user } = authModule

  // if (user?.role === "professor") return HOME_ROUTES.PROFESSOR
  // if (user?.role === "tutorando") return HOME_ROUTES.TUTOR

  return HOME_ROUTES.DEFAULT
}
