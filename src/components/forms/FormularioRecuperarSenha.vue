<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "FormularioRecuperarSenha" })
export default class FormularioRecuperarSenha extends Vue {}
</script>

<template>
  <v-card width="400" class="pa-6 elevation-6">
    <h1 class="text-center display-1 mb-12 indigo--text">
      Formulario Recuperar Senha
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

    <v-card-actions class="pa-0 mx-0 mt-2">
      <div>
        <div
          class="mb-1 body-2 indigo--text link"
          @click="$emit('forgot-password-clicked')"
        >
          Esqueceu sua senha ?
        </div>
        <div
          class="body-2 indigo--text fancy-link"
          @click="$emit('register-clicked')"
        >
          Não tem uma conta ? Registre-se.
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
</template>

<style scoped>
.link:hover {
  text-decoration: underline;
}
.fancy-link:hover {
  color: green !important;
  transition: color 0.7s;
  text-decoration: underline;
}
</style>
