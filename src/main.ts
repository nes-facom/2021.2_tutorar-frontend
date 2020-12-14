import Vue from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import VueMask from "v-mask"
import vuetify from "@/plugins/vuetify"
import Toasted from "vue-toasted"
import "./registerServiceWorker"

Vue.use(Toasted)
Vue.use(VueMask)

Vue.config.productionTip = false

Vue.prototype.appName = "Tutorar"
Vue.prototype.$appVersion = "0.1"
Vue.prototype.$log = console.log

new Vue({
  el: "#app",
  store,
  router,
  vuetify,
  render: h => h(App)
})
