<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "FormularioEscolherTipoCadastro" })
export default class FormularioEscolherTipoCadastro extends Vue {}
</script>

<template>
  <v-card width="400" class="pa-6 elevation-6">
    <h1 class="text-center headline mb-8 indigo--text text--lighten-1">
      Informe o seu perfil de cadastro para continuar
    </h1>

    <v-btn
      color="green lighten-1"
      class="white--text px-4 elevation-2 mb-6"
      style="text-transform: none"
      prepend-icon="mdi-account"
      @click="$emit('chose-tutor')"
      block
      x-large
    >
      Quero ser Tutor
    </v-btn>

    <v-btn
      color="green lighten-1"
      class="white--text px-4 elevation-2"
      style="text-transform: none"
      block
      x-large
    >
      Preciso de Tutoria
    </v-btn>

    <v-divider class="my-8" />

    <v-btn
      color="indigo lighten-1"
      class="white--text"
      @click="$emit('go-back')"
    >
      Voltar
    </v-btn>
  </v-card>
</template>

<style scoped>
</style>