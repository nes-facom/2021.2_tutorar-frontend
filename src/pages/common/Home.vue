<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import store from "@/store"
import Auth from "@/store/modules/auth"

@Component({ name: "Home" })
export default class PageHome extends Vue {
  authModule = getModule(Auth, store)
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="text-center">
      <v-col>
        <v-btn v-if="!authModule.isLoggedIn" @click="$router.push({ path: '/login' })">ir pra login</v-btn>
        <div v-else>Olá fulano !</div>
      </v-col>
    </v-row>
  </v-container>
</template>
