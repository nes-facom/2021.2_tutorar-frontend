<script lang="ts">
import Auth from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue";

@Component({
  name: "PageLogin",
  components: { AppBarCadastro }
})
export default class PageLogin extends Vue {
  private authModule = getModule(Auth, this.$store);

  username = "";
  password = "";

  isFormValid = false;
  showSenha = false;

  loginAttempts = 0;

  usernameRules = [
    (v: string) => !!v || "E-mail é obrigatório",
    (v: string) => /.+@.+/.test(v) || "E-mail inválido"
  ];

  passwordRules = [
    (v: string) => !!v || "Senha é obrigatória",
    (v: string) => v.length >= 6 || "Senha deve ter no mínimo 6 caracteres"
  ];

  $refs!: {
    loginForm: HTMLFormElement;
  };

  canSendLoginRequest() {
    return this.isFormValid || this.loginAttempts === 0;
  }

  sendLoginRequest() {
    if (!this.isFormValid) {
      this.$refs.loginForm.validate();
      return;
    }

    this.loginAttempts++;

    const { username, password } = this;

    this.authModule.LOGIN({ username, password });
  }
}

// Abra sua sala de aula para INOVAR
// Junte-se a nós e encontre ajuda para implementação
// de técnologias digitáis na usa prática pedagógica
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />
    <v-container fill-height>
      <v-row align="center" justify="end">
        <v-col cols="5">
          <v-img contain src="@/assets/imagens/Aluno_VideoAula.svg" alt="img" />
        </v-col>
        <v-col cols="4">
          <h1 class="display-2 mb-2">Abra sua sala de aula para</h1>
          <h1 class="display-3 font-weight-bold">
            <span class="green--text">I</span>
            <span class="blue--text">N</span>
            <span class="orange--text">O</span>
            <span class="red--text">V</span>
            <span class="green--text">A</span>
            <span class="blue--text">R</span>
          </h1>
          <span class="subtitle-1"
            >Junte-se a nós e encontre ajuda para implementação de técnologias
            digitáis na usa prática pedagógica</span
          >
        </v-col>

        <v-col cols="3">
          <v-card
            width="400"
            class="pa-6 elevation-6"
            @keyup.enter="canSendLoginRequest ? sendLoginRequest() : () => null"
          >
            <h1 class="text-center display-1 mb-12 indigo--text">
              Bem Vindo
            </h1>

            <v-btn
              color="red lighten-1"
              class="white--text px-4 elevation-2"
              style="text-transform: none"
              block
              x-large
            >
              <v-icon left dark>
                mdi-google
              </v-icon>

              Entrar com o Google
            </v-btn>

            <v-divider class="my-8" />

            <v-form v-model="isFormValid" ref="loginForm">
              <v-text-field
                outlined
                append-icon="mdi-account"
                placeholder="Email"
                v-model="username"
                :rules="usernameRules"
              />

              <v-text-field
                placeholder="Senha"
                v-model="password"
                @click:append="showSenha = !showSenha"
                :rules="passwordRules"
                :type="showSenha ? 'text' : 'password'"
                :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
              />
            </v-form>

            <v-card-actions class="pa-0 mx-0 mt-2">
              <div>
                <div
                  class="body-2 indigo--text link"
                  @click="$emit('forgot-password-clicked')"
                >
                  Esqueceu sua senha ?
                </div>
              </div>
              <v-spacer />
              <v-btn
                @click="sendLoginRequest"
                :disabled="!canSendLoginRequest"
                color="indigo lighten-1"
                class="white--text px-4 elevation-2"
              >
                LOGIN
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
