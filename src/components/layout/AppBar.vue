<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import { getPerfilRoute } from "@/router/utils"
import Auth from "@/store/modules/auth"
import { AUTH_ROUTES } from "@/router/rotas/comun"


import Theme from "@/store/modules/theme"


interface UserMenuItem {
  to: string
  icon: string
  text: string
  path: string
}


@Component({
  name: "AppBar"
})
export default class AppBar extends Vue {
  private themeModule = getModule(Theme, this.$store)


  get appBar() {
    return this.themeModule.isAppBarVisible
  }

  set appBar(value: boolean) {
    this.themeModule.SET_APP_BAR(value)
  }
  private authModule = getModule(Auth, this.$store)

  user = this.authModule.user

  // Pra usar na template
  getPerfilRoute = getPerfilRoute


  goToRoute(route: string) {
    if (this.$route.path !== route) this.$router.push(route)
  }

  logout() {
    this.authModule.logout({ redirectTo: AUTH_ROUTES.LOGIN })
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
      class="logo"
    />

    <v-spacer />

    <v-divider vertical />

    <v-btn class="ml-2" min-width="0" text color="#333333" @click="goToRoute(getPerfilRoute())">
        <v-icon>mdi-account</v-icon>
        <span> Meu Perfil </span>
    </v-btn>

    <v-btn text @click="logout" color="#333333">
          <v-icon left>mdi-logout</v-icon>
          <span>sair</span>
    </v-btn>

  </v-app-bar>
</template>

<style lang="scss" scoped>

  .logo{
    cursor: pointer;
  }

</style>