<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import Auth from "@/store/modules/auth"

@Component({ name: "AppBarUserMenu" })
export default class AppBarUserMenu extends Vue {
  private authModule = getModule(Auth, this.$store)

  user = this.authModule.user

  menuItems: { to: string; icon: string; text: string }[] = [
    {
      to: `${this.user?.role}/perfil`,
      icon: "mdi-account",
      text: "Minha conta"
    },
    {
      to: `${this.user?.role}/perfil`,
      icon: "mdi-calendar",
      text: "Agenda"
    },
    {
      to: `${this.user?.role}/perfil`,
      icon: "mdi-account",
      text: "Minhas habilidades"
    }
  ]

  logout() {
    this.authModule.LOGOUT()
  }
}
</script>

<template>
  <v-menu :close-on-content-click="false" origin="top right" offset-y bottom left>
    <template #activator="{ on }">
      <v-btn class="ml-2" min-width="0" text v-on="on" color="grey">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card width="300px">
      <v-list>
        <v-list-item @click="$router.push({ path: '/' + authModule.user.role + '/usuario' })">
          <v-list-item-avatar>
            <v-img src="@/assets/dog.jpg" alt="Usuário" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.nome" />
            <v-list-item-subtitle v-text="user.email" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item link>
          <v-list-item-icon class="mr-3">
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Minha conta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>Agenda</v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          <span>
            sair
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
