<script lang="ts">
import { AUTH_ROUTES } from "@/router/rotas/comun"
import Auth from "@/store/modules/auth"
import { User } from "@/store/modules/auth-types"
import { Vue, Component, Prop } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

@Component({
  name: "DialogDesativacaoConta"
})
export default class DialogDesativacaoConta extends Vue {
  @Prop({ required: true, type: Boolean })
  value!: boolean

  authModule = getModule(Auth, this.$store)

  emailInput = ""

  get user(): User {
    return this.authModule.user as User
  }

  get canDesativarUsuario() {
    return this.user.email === this.emailInput
  }

  async desativarUsuario() {
    await this.authModule.deleteUser(this.user._id)
    this.authModule.logout({ redirectTo: AUTH_ROUTES.LOGIN })
  }
}
</script>

<template>
  <v-dialog v-if="user" v-model="value" width="500" @click:outside="$emit('input', false)">
    <v-card>
      <v-img class="mx-auto" width="276" src="@/assets/imagens/Usuário_Desativar.svg" />

      <v-card-title class="font-weight-bold headline d-flex justify-center">
        Desativar Usuário?
      </v-card-title>

      <v-card-text class="text-center">
        Desativando seu usuário você perderá seu acesso ao sistema, por favor digite o seu email: {{ user.email }} para
        confirmar a ação
      </v-card-text>

      <v-text-field v-model="emailInput" class="px-8" placeholder="Email" />

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" @click="$emit('input', false)" text>Cancelar</v-btn>

        <v-btn :disabled="!canDesativarUsuario" @click="desativarUsuario" color="error">Desativar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
