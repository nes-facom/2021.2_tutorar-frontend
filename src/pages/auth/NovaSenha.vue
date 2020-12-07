<script lang="ts">
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "NovaSenha",
  components: { AppBarCadastro }
})
export default class NovaSenha extends Vue {
  recuperando = true

  canSubmit = false

  alterarSenha() {
    this.recuperando = false
  }
}
</script>

<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-card width="400" class="pa-6 elevation-6">
        <template v-if="recuperando">
          <v-card-title class="grey--text text--darken-1 px-0 pt-0">Recuperação de senha</v-card-title>
          <v-card-subtitle class="grey--text text--darken-2 px-0">
            informe sua nova senha
          </v-card-subtitle>

          <v-form v-model="canSubmit">
            <v-text-field outlined placeholder="Nova senha" type="password" />

            <v-text-field outlined placeholder="Confirmação" type="password" />
          </v-form>

          <v-card-actions class="pa-0 mx-0 mt-0  justify-center">
            <v-btn
              :disabled="!canSubmit"
              color="blue lighten-1"
              class="white--text px-4 elevation-2"
              @click="alterarSenha"
            >
              <span>Alterar Senha</span>
            </v-btn>
          </v-card-actions>
        </template>

        <template v-else>
          <v-card-title class="grey--text text--darken-1 px-0 pt-0 mx-auto">
            Senha redefinida com sucesso !
          </v-card-title>

          <v-card-actions class="pa-0 justify-center">
            <v-btn
              :disabled="false"
              :loading="false"
              color="blue lighten-1"
              class="white--text px-4 elevation-2"
              @click="$router.push({ path: '/login' })"
            >
              <span>Voltar para Login</span>
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-row>
  </v-container>
</template>
