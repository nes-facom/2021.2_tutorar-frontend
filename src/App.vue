<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import store from "@/store"
import Auth from "@/store/modules/auth"

import AppBar from "@/components/layout/AppBar.vue"

@Component({
  name: "App",
  components: { AppBar }
})
export default class App extends Vue {
  authModule = getModule(Auth, store)

  get isLoggedIn() {
    return this.authModule.isLoggedIn
  }

  get routerViewContainerPadding() {
    if (this.$route.meta?.fullpage) return "main-container"

    return this.$route.meta?.centered ? "px-auto" : "pa-0 pa-md-4 pa-lg-8 ma-0"
  }

  get hideHeader() {
    return !this.isLoggedIn || !!this.$route.meta?.hideHeader
  }
}
</script>

<template>
  <v-app>
    <app-bar v-if="!hideHeader" />

    <v-main app>
      <v-container :class="routerViewContainerPadding" fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="sass" scoped>
.main-container
  max-height: 100vh !important
  max-width: 100vw !important
  margin: 0px !important
  padding: 0px !important
  width: 100% !important
  height: 100% !important
</style>
