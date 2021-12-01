/* eslint-disable @typescript-eslint/camelcase */
import Vue from "vue"
import Vuex, { ActionContext } from "vuex"
import createPersistedState from "vuex-persistedstate"

import auth from "@/store/modules/auth"
import theme from "@/store/modules/theme"
import users from "@/store/modules/users-module"
import tutores from "@/store/modules/tutor-module"
import tutorias from "@/store/modules/tutoria-module"
import professores from "@/store/modules/professor-module"
import habilidades from "@/store/modules/habilidades-module"

interface ResetStateOptions {
  clearLocalStorage?: boolean
}

Vue.use(Vuex)

const modules = { auth, theme, tutores, users, professores, habilidades, tutorias }

export type vuexModuleName = keyof typeof modules

const actions = {
  /**
   * Reseta o estado da aplicação percorrendo os módulos
   * se o módulo tem uma função própria para resetar eu o chamo
   */
  RESET_VUEX_STATE({ commit }: ActionContext<any, any>, payload?: ResetStateOptions) {
    Object.keys(modules).map(moduleName => {
      const module = modules[moduleName as vuexModuleName]

      if (module && typeof module.mutations?.RESET_STATE === "function") {
        commit(`${moduleName}/RESET_STATE`, null, { root: true })
      }
    })

    if (payload?.clearLocalStorage) localStorage.clear()
  }
}

const persistedStateOptions: { key: string; paths: vuexModuleName[] } = {
  key: "logistrack",

  // Módulos cujos state devem persitidos na localstorage
  paths: ["auth", "theme", "tutores", "users", "professores", "tutorias"]
}

export default new Vuex.Store({
  modules,
  actions,
  plugins: [createPersistedState(persistedStateOptions)]
})
