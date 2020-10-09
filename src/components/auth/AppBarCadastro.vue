<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "AppBarCadastro" })
export default class AppBarCadastro extends Vue {}
</script>

<template>
  <v-app-bar height="50px" flat color="#f8f8f8">
    <v-img
      src="@/assets/logos/tutorar_com_titulo.svg"
      max-height="130"
      max-width="130"
      contain
    />

    <v-spacer />

    <template name="right-side">
      <v-btn
        v-if="$route.path !== '/cadastro/professor'"
        class="mr-4 font-weight-bold"
        color="#4285F4"
        text
        @click="$router.push({ path: '/cadastro/professor' })"
      >
        <span>Preciso de Tutoria</span>
      </v-btn>
      <v-btn
        v-if="$route.path !== '/cadastro/tutor'"
        class="font-weight-bold"
        color="#4285F4"
        text
        @click="$router.push({ path: '/cadastro/tutor' })"
      >
        <span>Quero Ser Tutor</span>
      </v-btn>
    </template>
  </v-app-bar>
</template>
