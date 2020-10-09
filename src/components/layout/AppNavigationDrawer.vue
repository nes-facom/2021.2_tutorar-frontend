<script lang="ts">
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";
import {
  rotasProfessor,
  rotasMonitor
} from "@/components/layout/drawer-routes";

import Auth from "@/store/modules/auth";
import Theme from "@/store/modules/theme";

@Component({ name: "NavigationDrawer" })
export default class NavigationDrawer extends Vue {
  private authModule = getModule(Auth, this.$store);
  private themeModule = getModule(Theme, this.$store);

  get currentRoute() {
    return this.$route.path;
  }

  get navigationDrawer() {
    return this.themeModule.isNavigationDrawerVisible;
  }

  set navigationDrawer(value: boolean) {
    this.themeModule.SET_DRAWER(value);
  }

  get rotas() {
    // @TODO: verificar nivel de acesso do usuário e ajustar rotas de acordo
    return [...rotasProfessor, ...rotasMonitor];
  }
}
</script>

<template>
  <v-navigation-drawer
    v-model="navigationDrawer"
    width="230"
    expand-on-hover
    app
  >
    <v-list dense>
      <v-list-item class="px-2">
        <v-list-item-avatar color="white">
          <v-img src="@/assets/logos/tutorar.svg" height="50" width="50" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">Tutorando</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Tutorias Agendadas: 5</v-list-item-title>
          <v-list-item-subtitle>FACOM - UFMS</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list class="px-0">
      <template v-for="rota in rotas">
        <v-list-item
          v-if="!rota.subrotas"
          :key="rota.to"
          :to="rota.to"
          :link="!!rota.to"
          :disabled="rota.disabled"
          active-class="route--active white--text"
          @click.stop="rota.action ? rota.action() : () => null"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :disabled="rota.disabled" v-text="rota.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle-2" v-text="rota.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :key="rota.to"
          :value="rota.subrotas.map(v => v.to).includes(currentRoute)"
        >
          <template #activator>
            <v-list-item-icon class="mr-3">
              <v-icon v-text="rota.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="subtitle-2" v-text="rota.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subrota in rota.subrotas"
            :key="subrota.to"
            :to="subrota.to"
            :link="!!subrota.to"
            :disabled="subrota.disabled"
            active-class="route--active white--text"
          >
            <v-list-item-icon class="mr-3">
              <v-icon :disabled="subrota.disabled" v-text="subrota.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="subtitle-2" v-text="subrota.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="sass" scoped>
.route--active
  color: #FFFFFF
  background-color: #227685 !important

.subrota
  background-color: #FFFFFF

.subrota:hover
  background-color: #E1E1E1
</style>
