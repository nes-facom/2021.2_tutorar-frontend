<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import AppBarUserMenu from "@/components/layout/AppBarUserMenu.vue"

import Theme from "@/store/modules/theme"



@Component({
  name: "AppBar",
  components: {
    AppBarUserMenu
  }
})
export default class AppBar extends Vue {
  private themeModule = getModule(Theme, this.$store)


  get appBar() {
    return this.themeModule.isAppBarVisible
  }

  set appBar(value: boolean) {
    this.themeModule.SET_APP_BAR(value)
  }
}
</script>

<template>
  <v-app-bar
    v-model="appBar"
    style="border-bottom: 1px solid #e2e2e2 !important;"
    color="#f8f8f8"
    height="50px"
    clipped-right
    flat
    app
  >
    <v-img
      src="@/assets/logos/tutorar_com_titulo.svg"
      max-height="130"
      max-width="130"
      contain
      @click="$router.push('/home')"
    />

    <v-spacer />

    <v-divider vertical />

    <AppBarUserMenu />
  </v-app-bar>
</template>
