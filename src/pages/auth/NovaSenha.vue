<template>
  <div>
    <AppBarCadastro/>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-card
            width="400"
            class="pa-6 elevation-6"
        >
          <div v-if="recuperando">
            <v-row align="center" class="mx-auto">
              <v-col>
                <h2>Recuperando sua senha</h2>
                <h4>Você está a um passo de recuperar sua conta.</h4>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-divider class="my-5"/>
              </v-col>
            </v-row>

            <v-col>
              <h5>Preencha os campos:</h5>
            </v-col>
            <v-form ref="recuperarForm">
              <v-text-field
                  outlined
                  append-icon="mdi-lock"
                  placeholder="Nova senha"
                  type="password"
              />

              <v-text-field
                  outlined
                  append-icon="mdi-lock"
                  placeholder="Repetir nova senha"
                  type="password"
              />
            </v-form>

            <v-card-actions class="pa-0 mx-0 mt-0 mb-3 justify-center">
              <v-btn
                  :disabled="false"
                  :loading="false"
                  color="blue lighten-1"
                  class="white--text px-4 elevation-2"
                  @click="alterarSenha"
              >
                <span>Alterar Senha</span>
              </v-btn>
            </v-card-actions>
          </div>
          <div v-if="!recuperando">
            <v-row align="center" class="mx-auto">
              <v-col>
                <h2>Senha redefinida com sucesso</h2>
                <h4>Muito obrigado.</h4>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-divider class="my-5"/>
              </v-col>
            </v-row>

            <v-card-actions class="pa-0 mx-0 mt-0 mb-3 justify-center">
              <v-btn
                  :disabled="false"
                  :loading="false"
                  color="blue lighten-1"
                  class="white--text px-4 elevation-2"
                  @click="$router.push({ path: '/login' })"
              >
                <span>Voltar</span>
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "NovaSenha",
  components: { AppBarCadastro }
})
export default class NovaSenha extends Vue {
  recuperando = true

  alterarSenha() {
    this.recuperando = false
  }
}
</script>

<style scoped>
</style>