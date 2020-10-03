<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LoginLink from "@/components/auth/LoginLink.vue";
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue";

@Component({
  name: "CadastroProfessor",
  components: { AppBarCadastro, LoginLink }
})
export default class CadastroProfessor extends Vue {}
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />
    <v-container fill-height>
      <v-row align="center" justify="end">
        <v-col cols="auto">
          <v-card width="400" class="pa-6 elevation-6">
            <h1 class="text-center headline mb-8 indigo--text text--lighten-1">
              Cadastro de professor
            </h1>

            <v-divider class="my-8" />

            <LoginLink />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
.page-container
  height: calc(100% - 50px)
</style>
