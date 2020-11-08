import Vue from "vue"
import Vuex, { ActionContext } from "vuex"
import createPersistedState from "vuex-persistedstate"

import auth from "@/store/modules/auth"
import theme from "@/store/modules/theme"
import users from "@/store/modules/users-module"
import tutores from "@/store/modules/tutor-module"

interface ResetStateOptions {
  clearLocalStorage?: boolean
}

Vue.use(Vuex)

const modules = { auth, theme, tutores, users }

type vuexModules = typeof modules
export type vuexModuleName = keyof vuexModules

const rootState = {}

type RootState = typeof rootState

const actions = {
  /**
   * Reseta TODO o estado da aplicação percorrendo os módulos
   * se o módulo tem uma função própria para resetar eu o chamo
   */
  RESET_VUEX_STATE({ commit }: ActionContext<RootState, RootState>, payload?: ResetStateOptions) {
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

  paths: ["auth", "theme", "tutores", "users"]
}
// Módulos cujos state devem persitidos na localstorage

export default new Vuex.Store({
  state: rootState,
  modules,
  actions,
  plugins: [createPersistedState(persistedStateOptions)]
})
