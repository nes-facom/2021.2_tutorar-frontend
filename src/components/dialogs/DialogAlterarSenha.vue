<script lang="ts">
import { findUserByCredentialsService } from "@/api/users/find-by-credentials"
import Auth from "@/store/modules/auth"
import { User } from "@/store/modules/auth-types"
import { Vue, Component, Prop } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

@Component({
  name: "DialogAlterarSenha"
})
export default class DialogAlterarSenha extends Vue {
  @Prop({ required: true, type: Boolean })
  value!: boolean

  authModule = getModule(Auth, this.$store)

  currentPassword = ""

  get user(): User {
    return this.authModule.user as User
  }

  async buscarPorSenha() {
    findUserByCredentialsService(this.user.email, this.currentPassword).then(() => {
      console.log("todo")
    })
  }
}
</script>

<template>
  <v-dialog v-model="value" width="300" @click:outside="$emit('input', false)">
    <v-card>
      <v-card-title class="headline d-flex justify-center grey--text text--darken-1">
        Alteraração de senha
      </v-card-title>

      <v-card-text class="text-center">
        Para continuar, digite sua senha
      </v-card-text>

      <v-text-field v-model="currentPassword" class="px-8" placeholder="Senha Atual" />

      <v-card-actions class="pa-4">
        <v-spacer />

        <v-btn color="primary" @click="$emit('input', false)" text>Cancelar</v-btn>

        <v-btn :disabled="currentPassword.length <= 5" @click="buscarPorSenha" color="primary">Próximo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
