<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "FormularioCadastroProfessor" })
export default class FormularioCadastroProfessor extends Vue {}
</script>

<template>
  <v-card width="400" class="pa-6 elevation-6">
    <h1 class="text-center headline mb-8 indigo--text text--lighten-1">
      Cadastro de professor
    </h1>

    <v-divider class="my-8" />

    <v-btn color="indigo lighten-1" class="white--text">
      Voltar
    </v-btn>
  </v-card>
</template>
