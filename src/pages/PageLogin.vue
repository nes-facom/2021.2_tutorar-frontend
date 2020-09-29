<script lang="ts">
import Auth from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "PageLogin" })
export default class PageLogin extends Vue {
  private authModule = getModule(Auth, this.$store);

  username = "";
  password = "";

  isFormValid = false;

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
    // .catch(error => {});
  }
}
</script>

<template>
  <v-container fill-height>
    <v-row align="center" justify="end">
      <v-col cols="auto">
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
              append-icon="mdi-lock"
              placeholder="Senha"
              v-model="password"
              :rules="passwordRules"
              outlined
            />
          </v-form>

          <v-card-actions class="pa-0 mx-0 mt-0 mb-3">
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

          <div class="mb-1">
            <span class="body-2 indigo--text">
              Esqueceu sua senha ?
            </span>
          </div>
          <div>
            <span class="body-2 indigo--text"
              >Não tem uma conta ? Registre-se.
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
