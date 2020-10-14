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

        <v-col cols="4">
          <v-card
              width="400"
              class="pa-6 elevation-6"
              @keyup.enter="canSendLoginRequest ? sendLoginRequest() : () => null"
          >
            <v-row align="center"
                   class="mx-auto">
              <v-col>
                <h5>Fazer Login com:</h5>
              </v-col>
              <v-col>
                <v-btn
                    color="blue lighten-1"
                    outlined
                    class="white--text px-4 elevation-2"
                    style="text-transform: none"
                    block
                    x-large
                >
                  <v-icon left dark
                          color="red">
                    mdi-google
                  </v-icon>
                  Google
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-divider class="my-5" />
              </v-col>
              <v-vol class="my-5" style="color: #34A853">
                ou
              </v-vol>
              <v-col>
                <v-divider class="my-5" />
              </v-col>
            </v-row>

            <v-form v-model="isFormValid" ref="loginForm">
              <v-text-field
                  outlined
                  append-icon="mdi-account"
                  placeholder="Email"
                  v-model="username"
                  :rules="usernameRules"
              />

              <v-text-field
                  append-icon="mdi-lock"
                  placeholder="Senha"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  outlined
              />
            </v-form>

            <v-card-actions class="pa-0 mx-0 mt-0 mb-3 justify-center">
              <v-btn
                  @click="sendLoginRequest"
                  :disabled="!canSendLoginRequest"
                  color="blue lighten-1"
                  class="white--text px-4 elevation-2"
              >
                Realizar Login
              </v-btn>
            </v-card-actions>

            <div class="mb-1 text-center">
              <small>
                <u>Esqueceu sua senha ?</u>
              </small>
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
