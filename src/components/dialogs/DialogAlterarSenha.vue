<script lang="ts">
import { findUserByCredentialsService } from "@/api/users/find-by-credentials"
import { changePasswordService } from "@/api/auth/change-password"
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
  newPassword = ""
  newPasswordConfirmation = ""

  get user(): User {
    return this.authModule.user as User
  }

  async buscarPorSenha() {
    findUserByCredentialsService(this.user.email, this.currentPassword).then((response) => {
      changePasswordService(response._id, this.newPassword, this.newPasswordConfirmation)
      .then(() => {
           this.$toasted.success("Senha alterada com sucesso", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 5000
          })
        this.currentPassword = ""
        this.newPassword = ""
        this.newPasswordConfirmation = ""
        this.$emit('update-modal-senha', false)

      })
      .catch(() => { 
        this.$toasted.error("A nova senha e sua confirmação são diferentes.", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 5000
          })
       })
    }).catch((err) => {
      if (err.message == "Senha inválida"){
      this.$toasted.error("A senha atual informada não concide com sua senha cadastrada, tente novamente.", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 5000
        })
      }
    })
  }
}
</script>

<template>
  <v-dialog v-model="value" width="400"  @click:outside="$emit('input', false)">
    <v-card>
      <v-card-title  class="headline d-flex justify-center grey--text text--darken-1">
        Alteração de senha
      </v-card-title>

      <v-card-text class="text-center">
        Para continuar, digite sua senha
      </v-card-text>

      <v-text-field v-model="currentPassword" class="px-8" placeholder="Senha Atual" />
      <v-text-field v-model="newPassword" class="px-8" placeholder="Nova Senha" />
      <v-text-field v-model="newPasswordConfirmation" class="px-8" placeholder="Confirme sua nova senha" />


      <v-card-actions class="pa-4">
        <v-spacer />

        <v-btn color="primary" @click="$emit('input', false)" text>Cancelar</v-btn>

        <v-btn :disabled="currentPassword.length <= 5 && newPassword.length <= 5" @click="buscarPorSenha" color="primary">Próximo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
