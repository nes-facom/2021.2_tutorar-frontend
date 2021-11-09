<script lang="ts">
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import { Component, Ref, Vue } from "vue-property-decorator"
import { COMMON_ROUTES } from "@/router/rotas/comun"
import { getModule } from "vuex-module-decorators"
import { LOGIN_ERRORS } from "@/api/auth/login"
import { VForm } from "@/typings/vuetify"
import Auth from "@/store/modules/auth"
import { StringFieldRule } from "@/utils/form"

@Component({
  name: "PageLogin",
  components: { AppBarCadastro }
})
export default class PageLogin extends Vue {
  private authModule = getModule(Auth, this.$store)

  @Ref("loginForm")
  _loginFormRef!: VForm

  email = ""
  password = ""

  showSenha = false
  isFormValid = false

  emailErrorMessages: string[] = []
  passwordErrorMessages: string[] = []

  loginAttempts = 0

  isWaitingResponse = false

  emailRules: StringFieldRule[] = [v => !!v || "E-mail é obrigatório", v => /.+@.+/.test(v || "") || "E-mail inválido"]

  passwordRules: StringFieldRule[] = [
    v => !!v || "Senha é obrigatória",
    v => (!!v && v.length >= 6) || "Senha deve ter no mínimo 6 caracteres"
  ]

  canSendLoginRequest() {
    return this.isFormValid || this.loginAttempts === 0
  }

  sendLoginRequest() {
    const { INVALID_PASSWORD, EMAIL_NAO_ENCONTRADO } = LOGIN_ERRORS

    this._loginFormRef.validate()

    if (!this.isFormValid) return

    this.loginAttempts++
    this.isWaitingResponse = true

    this.emailErrorMessages = []
    this.passwordErrorMessages = []

    this.authModule
      .login({ email: this.email, password: this.password })
      .then(() => this.$router.push(COMMON_ROUTES.HOME))
      .catch((errorMessage: LOGIN_ERRORS) => {
        const estaExibindoErroPassword = this.passwordErrorMessages.indexOf(INVALID_PASSWORD) !== -1
        const estaExibindoErroEmail = this.emailErrorMessages.indexOf(EMAIL_NAO_ENCONTRADO) !== -1

        if (errorMessage === INVALID_PASSWORD && !estaExibindoErroPassword) {
          this.passwordErrorMessages.push(INVALID_PASSWORD)
        }

        if (errorMessage === EMAIL_NAO_ENCONTRADO && !estaExibindoErroEmail) {
          this.emailErrorMessages.push(EMAIL_NAO_ENCONTRADO)
        }
      })
      .finally(() => {
        this.isWaitingResponse = false
      })
  }
}
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />

    <v-container fill-height>
      <v-row align="center" justify="end">
        <v-col cols="4">
          <v-img contain src="@/assets/imagens/Aluno_VideoAula.svg" alt="img" />
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
          <span class="subtitle-1 grey--text text--darken-1">
            Junte-se a nós e encontre ajuda para implementação de tecnologias digitais na sua prática pedagógica.
          </span>
        </v-col>

        <v-col cols="4">
          <v-card
            width="400"
            class="pa-6 elevation-6"
            @keyup.enter="canSendLoginRequest ? sendLoginRequest() : () => null"
          >
            <h3 class="my-5 text-center">Realizar Login</h3>

            <v-divider class="my-5" />

            <v-form v-model="isFormValid" ref="loginForm">
              <!-- 
                Erros de email e senha errada são retornados da API e setados
                manualmente atraves de passwordErrorMessages e emailErrorMessages

                Quando o usuario realiza um input, para alterar as credenciais
                e tentar o login novamente eu limpo os erros
               -->
              <v-text-field
                outlined
                append-icon="mdi-account"
                placeholder="Email"
                v-model="email"
                :rules="emailRules"
                :error-messages="emailErrorMessages"
                @input="emailErrorMessages = []"
              />

              <v-text-field
                outlined
                :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showSenha ? 'text' : 'password'"
                placeholder="Senha"
                v-model="password"
                :rules="passwordRules"
                :error-messages="passwordErrorMessages"
                @input="passwordErrorMessages = []"
                @click:append="showSenha = !showSenha"
              />
            </v-form>

            <v-card-actions class="pa-0 mx-0 mt-0 mb-3 justify-center">
              <v-btn
                @click="sendLoginRequest"
                :disabled="!canSendLoginRequest || isWaitingResponse"
                :loading="isWaitingResponse"
                color="blue lighten-1"
                class="white--text px-4 elevation-2"
              >
                <span>Realizar Login</span>
              </v-btn>
            </v-card-actions>

            <div class="text-center mt-5" @click="$router.push({ path: '/recuperar-senha' })">
              <span class="link">Esqueceu sua senha?</span>
            </div>
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
