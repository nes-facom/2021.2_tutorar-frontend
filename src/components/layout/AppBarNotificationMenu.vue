<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component({ name: "AppBarNotificationMenu" })
export default class AppBarNotificationMenu extends Vue {}
</script>

<template>
  <div>
    <v-menu origin="top right" transition="scale-transition" max-width="370px" offset-y bottom left>
      <template #activator="{ attrs, on }">
        <v-btn min-width="0" class="mr-2" text v-bind="attrs" v-on="on" color="grey">
          <v-badge color="red" overlap bordered>
            <template #badge>
              <span>2</span>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list class="pb-0">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-2" color="red">mdi-alert-circle-outline</v-icon>
              <span>Tutoria Cancelada</span>
            </v-list-item-title>
            <v-list-item-subtitle>Biologia II - às 19:00 de 12/10</v-list-item-subtitle>
            <v-list-item-subtitle>
              <router-link to="/notificacoes" class="router-link">
                <span>Visualizar agenda</span>
              </router-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-2" color="green">mdi-alert-circle-outline</v-icon>
              <span>Tutoria em 10 minutos !</span>
            </v-list-item-title>
            <v-list-item-subtitle>Química III - às 19:00 de 12/10</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-footer class="font-weight-medium mt-4">
          <v-col class="text-center py-1" cols="12">
            <router-link to="/notificacoes" class="router-link">
              <span>Ver todas as notificações</span>
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
