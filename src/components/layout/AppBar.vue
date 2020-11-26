<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import AppBarUserMenu from "@/components/layout/AppBarUserMenu.vue"
import AppBarMessageMenu from "@/components/layout/AppBarMessageMenu.vue"
import AppBarNotificationMenu from "@/components/layout/AppBarNotificationMenu.vue"

import Theme from "@/store/modules/theme"

interface Clock {
  data: string
  hora: string
  timerId: number | null
}

@Component({
  name: "AppBar",
  components: { AppBarUserMenu, AppBarNotificationMenu, AppBarMessageMenu }
})
export default class AppBar extends Vue {
  private themeModule = getModule(Theme, this.$store)

  clock: Clock = {
    data: "",
    hora: "",
    timerId: null
  }

  get appBar() {
    return this.themeModule.isAppBarVisible
  }

  set appBar(value: boolean) {
    this.themeModule.SET_APP_BAR(value)
  }

  get navigationDrawer() {
    return this.themeModule.isNavigationDrawerVisible
  }

  set navigationDrawer(value: boolean) {
    this.themeModule.SET_DRAWER(value)
  }

  // Se a rota tem um nome que não é o '*' de fallback 404
  get routeSections() {
    return this.$route?.name && this.$route?.name !== "*"
      ? this.$route.name
          .replace(/-/g, " ")
          .split("_")
          .map(v => ({ link: false, text: v }))
      : []
  }

  updateClock() {
    const date = new Date()
    const ano = date.getFullYear()
    const mes = this.padClock(date.getMonth() + 1)
    const dia = this.padClock(date.getDate())
    const hora = this.padClock(date.getHours())
    const minuto = this.padClock(date.getMinutes())

    this.clock.data = `${dia}/${mes}/${ano}`
    this.clock.hora = `${hora}:${minuto}`
  }

  padClock(v: number | string) {
    return String(v).padStart(2, "0")
  }

  mounted() {
    this.updateClock()
    this.clock.timerId = setInterval(this.updateClock, 5000)
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
<!--    <v-icon-->
<!--      @click="navigationDrawer = !navigationDrawer"-->
<!--      v-text="navigationDrawer ? 'mdi-menu-open' : 'mdi-menu'"-->
<!--      color="grey"-->
<!--    />-->
    <a href="/login">
      <v-img src="@/assets/logos/tutorar_com_titulo.svg" max-height="130" max-width="130" contain />
    </a>
    <v-breadcrumbs :items="routeSections" divider="/" class="hidden-sm-and-down" large />

    <v-spacer />

    <div class="hidden-sm-and-down mr-10">
      <v-icon left>mdi-calendar-clock</v-icon>
      <span class="mr-2" v-text="clock.data" />
      <span v-text="clock.hora" />
    </div>

    <AppBarMessageMenu />

    <AppBarNotificationMenu />

    <v-divider vertical />

    <AppBarUserMenu />
  </v-app-bar>
</template>
