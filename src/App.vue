<script lang="ts">
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";

import store from "@/store";
import Auth from "@/store/modules/auth";

import AppBar from "@/components/layout/AppBar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppNavigationDrawer from "@/components/layout/AppNavigationDrawer.vue";

const authModule = getModule(Auth, store);

@Component({
  name: "App",
  components: { AppBar, AppNavigationDrawer, AppFooter }
})
export default class App extends Vue {
  get isLoggedIn() {
    return authModule.isLoggedIn;
  }

  get routerViewContainerPadding() {
    if (this.$route.meta.fullpage) return "main-container";

    return this.$route.meta.centered ? "px-auto" : "pa-0 pa-md-4 pa-lg-8 ma-0";
  }

  get hideFooter() {
    return !this.isLoggedIn || !!this.$route.meta.hideFooter;
  }

  get hideHeader() {
    return !this.isLoggedIn || !!this.$route.meta.hideHeader;
  }
}
</script>

<template>
  <v-app>
    <app-bar v-if="!hideHeader" />

    <app-navigation-drawer v-if="isLoggedIn" />

    <v-main app>
      <v-container :class="routerViewContainerPadding">
        <router-view />
      </v-container>
    </v-main>

    <app-footer v-if="!hideFooter" />
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
