import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

import auth from "@/store/modules/auth"
import theme from "@/store/modules/theme"
import users from "@/store/modules/users-module"
import tutores from "@/store/modules/tutor-module"

Vue.use(Vuex)

const modules = { auth, theme, tutores, users }

export default new Vuex.Store({ modules, plugins: [createPersistedState({ key: "tutorar" })] })
