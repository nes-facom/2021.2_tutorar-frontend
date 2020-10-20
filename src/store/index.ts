import Vue from "vue"
import Vuex from "vuex"

import auth from "@/store/modules/auth"
import theme from "@/store/modules/theme"
import tutorias from "@/store/modules/repositories/tutorias"

Vue.use(Vuex)

const modules = { auth, theme, tutorias }

export default new Vuex.Store({ modules })
