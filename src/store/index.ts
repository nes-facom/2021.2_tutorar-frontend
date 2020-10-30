import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

import auth from "@/store/modules/auth"
import theme from "@/store/modules/theme"
import tutor from "@/store/modules/repositories/tutor"
import tutorias from "@/store/modules/repositories/tutorias"

Vue.use(Vuex)

const modules = { auth, theme, tutorias, tutor }

export default new Vuex.Store({ modules, plugins: [createPersistedState({ key: "tutorar" })] })
