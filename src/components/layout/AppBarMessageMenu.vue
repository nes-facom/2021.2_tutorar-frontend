<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component({ name: "AppBarMessageMenu" })
export default class AppBarMessageMenu extends Vue {}
</script>

<template>
  <div>
    <v-menu origin="top center" transition="scale-transition" max-width="370px" offset-y bottom left>
      <template #activator="{ attrs, on }">
        <v-btn min-width="0" text v-bind="attrs" v-on="on" color="grey">
          <v-badge color="red" overlap bordered>
            <template #badge>
              <span>1</span>
            </template>
            <v-icon>mdi-message</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list class="pb-0">
        <v-subheader class="pb-0 mb-0">Mensagens Recentes:</v-subheader>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              <span>Ciclano da Silva</span>
            </v-list-item-title>
            <v-list-item-subtitle>Alou! precisa de uma ajuda com biologia III ?</v-list-item-subtitle>
            <v-list-item-subtitle>
              <router-link to="/notificacoes" class="router-link">
                <span>conversar com ciclano</span>
              </router-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              <span>Deltrano das Neves</span>
            </v-list-item-title>
            <v-list-item-subtitle
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum</v-list-item-subtitle
            >
            <v-list-item-subtitle>
              <router-link to="/notificacoes" class="router-link">
                <span>conversar com deltrano</span>
              </router-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-footer class="font-weight-medium mt-4">
          <v-col class="text-center py-1" cols="12">
            <router-link to="/notificacoes" class="router-link">
              <span>Ver todas as mensagens</span>
            </router-link>
          </v-col>
        </v-footer>
      </v-list>
    </v-menu>
  </div>
</template>

<style lang="sass" scoped>
.router-link
  text-decoration: none
</style>
