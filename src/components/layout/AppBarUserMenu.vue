<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import Auth from "@/store/modules/auth"

@Component({ name: "AppBarUserMenu" })
export default class AppBarUserMenu extends Vue {
  private authModule = getModule(Auth, this.$store)

  logout() {
    this.authModule.LOGOUT({ redirectTo: "/login" })
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

    <v-card width="350px">
      <v-list>
        <v-list-item @click="$router.push({ path: '/' + authModule.user.role + '/usuario' })">
          <v-list-item-avatar>
            <v-img src="@/assets/dog.jpg" alt="Usuário" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>João das Neves</v-list-item-title>
            <v-list-item-subtitle>joao.neves@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-subheader class="pb-0 mb-0">Próximas Tutorias:</v-subheader>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Deltrano da silva - Biologia II</v-list-item-title>
            <v-list-item-subtitle>23/10/20 - 18:00</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Fulano das Neves - Química Molecular</v-list-item-title>
            <v-list-item-subtitle>25/10/20 - 19:30</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="logout"> <v-icon left>mdi-logout</v-icon>Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
