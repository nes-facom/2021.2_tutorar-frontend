<script lang="ts">
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import { Component, Vue } from "vue-property-decorator"
import { emailService } from "@/api/auth/send-email"

@Component({
  name: "RecuperarSenha",
  components: { AppBarCadastro }
})
export default class RecuperarSenha extends Vue {
  continuarRecuperar = true
  errorMessage = ''
  sheet = false
  
  email = document.getElementById("email")

  async sendRecuperarRequest(email: string) {
    await emailService(email).then(() => { 
      this.continuarRecuperar = false
    }).catch((message) => { 
        this.errorMessage = message
        this.sheet = true
    });
  }
}
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />

    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col v-if="continuarRecuperar" cols="4">
          <v-card width="400" class="mx-auto px-6 pb-6 pt-4 elevation-6">
            <v-card-title class="headline grey--text text--darken-1 px-0">Recuperação de senha</v-card-title>
            <v-card-subtitle class="grey--text text--darken-1 px-0"> Informe seu email para continuar </v-card-subtitle>

            <v-form ref="recuperarForm">
              <v-text-field
                outlined
                append-icon="mdi-account"
                placeholder="Email"
                type="email"
                v-model="email"
                id="email"
              />
            </v-form>
            <v-card-actions class="pa-0 mx-0 mt-0 justify-center">
              <v-btn class="ml-auto" color="blue" text @click="$router.push({ path: '/login' })">
                <v-icon class="mr-3">mdi-arrow-left</v-icon>
                <span>Voltar</span>
              </v-btn>
              <v-spacer />
              <v-btn
                :disabled="false"
                :loading="false"
                color="blue lighten-1"
                class="white--text px-4 elevation-2"
                @click="sendRecuperarRequest(email)"
              >
                <span>Continuar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4" v-else>
          <v-card width="400" class="elevation-6 mx-auto">
            <v-card-title> E-mail enviado com sucesso </v-card-title>
            <v-card-subtitle> Um email com instruções de recuperação de senha foi enviado </v-card-subtitle>

            <v-card-actions class="pa-4 justify-center"
            >
              <v-btn
                :disabled="false"
                :loading="false"
                color="blue lighten-1"
                align="center"
                text-aling="center"
                class="white--text px-4 elevation-2"
                @click="$router.push({ path: '/login' })"
              >
                <span>Voltar para login</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- NOTIFICAÇÃO QUANDO UM ERRO ACONTECE -->
    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <v-sheet
          class="text-center"
          height="200px"
        >
          <v-btn
            class="mt-6"
            text
            color="blue"
            @click="sheet = !sheet"
          >
            fechar
          </v-btn>
          <div class="py-3">
            {{ errorMessage }}
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
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
