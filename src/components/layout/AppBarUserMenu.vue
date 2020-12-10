<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

import { PROFESSOR_ROUTES } from "@/router/rotas/professor"
import { TUTOR_ROUTES } from "@/router/rotas/tutor"
import { getPerfilRoute } from "@/router/utils"
import Auth from "@/store/modules/auth"
import { AUTH_ROUTES } from "@/router/rotas/comun"

interface UserMenuItem {
  to: string
  icon: string
  text: string
  path: string
}

@Component({ name: "AppBarUserMenu" })
export default class AppBarUserMenu extends Vue {
  private authModule = getModule(Auth, this.$store)

  user = this.authModule.user

  // Pra usar na template
  getPerfilRoute = getPerfilRoute

  get menuItems(): UserMenuItem[] {
    const menuItems: UserMenuItem[] = []
    if (this.user?.role === "tutor") {
      menuItems.push(
        {
          to: TUTOR_ROUTES.PERFIL_PROPRIO,
          icon: "mdi-account",
          text: "Minha conta",
          path: "meu-perfil"
        },
        {
          to: TUTOR_ROUTES.AGENDA,
          icon: "mdi-calendar",
          text: "Agenda",
          path: "agenda"
        },
        {
          to: TUTOR_ROUTES.HABILIDADES,
          icon: "mdi-account-details",
          text: "Habilidades",
          path: "minhas-habilidades"
        }
      )
    }
    if (this.user?.role === "professor") {
      menuItems.push(
        {
          to: PROFESSOR_ROUTES.PERFIL,
          icon: "mdi-account",
          text: "Minha conta",
          path: "meu-perfil"
        },
        {
          to: PROFESSOR_ROUTES.ESCOLHER_TUTOR,
          icon: "mdi-star",
          text: "Procurar Tutores",
          path: "escolher-tutor"
        }
      )
    }
    return menuItems
  }

  goToRoute(route: string) {
    if (this.$route.path !== route) this.$router.push(route)
  }

  logout() {
    this.authModule.logout({ redirectTo: AUTH_ROUTES.LOGIN })
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
        <v-list-item @click="goToRoute(getPerfilRoute())">
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
        <v-list-item v-for="item in menuItems" :key="item.icon" @click="goToRoute(item.to)" link>
          <v-list-item-icon class="mr-3">
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          <span>sair</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
