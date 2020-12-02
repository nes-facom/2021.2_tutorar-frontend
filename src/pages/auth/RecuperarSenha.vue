<script lang="ts">
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "RecuperarSenha",
  components: {AppBarCadastro}
})
export default class RecuperarSenha extends Vue {
  continuarRecuperar = false

  email = ''

  sendRecuperarRequest() {
    this.continuarRecuperar = true
  }
}
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />

    <v-container fill-height>
      <v-row align="center" justify="end">
        <v-col cols="4">
          <v-img contain src="@/assets/imagens/Aluno_VideoAula.svg" alt="img"/>
        </v-col>
        <v-col cols="4">
          <h1 class="display-1 mb-2 font-weight-bold">Abra sua sala de aula para</h1>
          <h1 class="display-3 font-weight-bold">
            <span class="green--text">I</span>
            <span class="blue--text">N</span>
            <span class="orange--text">O</span>
            <span class="red--text">V</span>
            <span class="green--text">A</span>
            <span class="blue--text">R</span>
          </h1>
          <span class="subtitle-1 grey--text text--darken-1"
          >Junte-se a nós e encontre ajuda para implementação de técnologias digitáis na usa prática pedagógica</span
          >
        </v-col>

        <v-col cols="4" v-if="!continuarRecuperar">
          <v-card
              width="400"
              class="pa-6 elevation-6"
          >
            <v-row align="center" class="mx-auto">
              <v-col>
                <h5>Ou faça seu login:</h5>
              </v-col>
              <v-col>
                <v-btn
                    color="blue lighten-1"
                    outlined
                    class="white--text px-4 elevation-2"
                    style="text-transform: none"
                    block
                    x-large
                    @click="$router.push({ path: '/login' })"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-divider class="my-5"/>
              </v-col>
            </v-row>
            <v-col>
              <h2>Recuperando sua senha</h2>
              <h4>Nos conte algumas informações sobre ela.</h4>
            </v-col>
            <v-col>
              <h5>Insira seu e-mail:</h5>
            </v-col>

            <v-form ref="recuperarForm">
              <v-text-field
                  outlined
                  append-icon="mdi-account"
                  placeholder="Email"
                  type="email"
                  v-model="email"
              />
            </v-form>

            <v-card-actions class="pa-0 mx-0 mt-0 mb-3 justify-center">
              <v-btn
                  :disabled="false"
                  :loading="false"
                  color="blue lighten-1"
                  class="white--text px-4 elevation-2"
                  @click="sendRecuperarRequest"
              >
                <span>Continuar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="4" v-if="continuarRecuperar">
          <v-card
              width="400"
              class="pa-6 elevation-6"
          >
            <v-col>
              <h2>E-mail enviado com sucesso</h2>
              <h4>Verifique sua caixa de mensagens.</h4>
            </v-col>
            <v-col>
              <h5>Muito obrigado!</h5>
            </v-col>

            <v-col>
              <v-divider/>
            </v-col>

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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
.page-container
  height: calc(100% - 50px)

.link:hover
  text-decoration: underline

.fancy-link:hover
  color: green !important
  transition: color 0.7s
  text-decoration: underline
</style>
