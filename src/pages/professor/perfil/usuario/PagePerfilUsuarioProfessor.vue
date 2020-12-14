<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import DadosUsuario from "@/pages/professor/perfil/usuario/DadosUsuario.vue"
import DadosPessoais from "@/pages/professor/perfil/usuario/DadosPessoais.vue"
import ProfileSidebar from "@/pages/professor/perfil/usuario/ProfileSidebar.vue"
import GraduacaoProfessor from "@/pages/professor/perfil/usuario/GraduacaoProfessor.vue"
import { User } from "@/store/modules/auth-types"

const DialogDesativacaoConta = () => import("@/components/dialogs/DialogDesativacaoConta.vue")
const DialogAlterarSenha = () => import("@/components/dialogs/DialogAlterarSenha.vue")

@Component({
  name: "PagePerfilUsuarioProfessor",
  components: {
    DadosUsuario,
    DadosPessoais,
    ProfileSidebar,
    DialogAlterarSenha,
    GraduacaoProfessor,
    DialogDesativacaoConta
  }
})
export default class PagePerfilUsuarioProfessor extends Vue {
  private authModule = getModule(Auth, this.$store)

  tab = 0

  isEditing = false

  dialogAlterarSenha = false
  dialogDesativacaoConta = false

  userCopy: User = { ...this.authModule.user } as User

  canSubmit = false

  isSavingUsuario = false

  get user() {
    return this.isEditing ? this.userCopy : (this.authModule.user as User)
  }

  toggleEditMode() {
    this.userCopy = { ...this.authModule.user } as User
    this.isEditing = !this.isEditing
  }

  updateUsuario() {
    this.isSavingUsuario = true

    this.authModule
      .updateUser({ id: this.user._id, user: this.user })
      .then(() => {
        this.$emit("finished-editing")
        this.$toasted.success("Dados atualizados", {
          theme: "toasted-primary",
          position: "top-left",
          duration: 3000
        })
      })
      .finally(() => {
        this.isSavingUsuario = false
        this.isEditing = false
      })
  }
}
</script>

<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col cols="12" md="10">
      <v-card class="pa-0">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="3" class="pa-0">
            <ProfileSidebar />
          </v-col>

          <v-col cols="9" style="border-left: 1px solid #e3e3e3; min-height: 320px">
            <v-tabs v-model="tab">
              <v-tab>Dados Pessoais</v-tab>
              <v-tab>Graduação</v-tab>
              <v-tab>Minha Conta</v-tab>

              <v-spacer />

              <v-btn :color="isEditing ? 'red' : 'grey'" @click="toggleEditMode" x-large text>
                <span v-text="isEditing ? 'Cancelar' : 'Editar'" />
                <v-icon class="ml-3" v-text="isEditing ? 'mdi-pencil-off-outline' : 'mdi-pencil'" />
              </v-btn>
            </v-tabs>

            <v-form v-model="canSubmit">
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <DadosPessoais :isEditing="isEditing" :user="user" />
                </v-tab-item>

                <v-tab-item>
                  <GraduacaoProfessor :isEditing="isEditing" :user="user" />
                </v-tab-item>

                <v-tab-item>
                  <DadosUsuario :isEditing="isEditing" :user="user" />
                </v-tab-item>
              </v-tabs-items>
            </v-form>

            <v-card-actions class="pa-4">
              <template v-if="tab === 2">
                <v-btn
                  :disabled="isEditing"
                  @click="dialogDesativacaoConta = true"
                  color="red"
                  class="mr-4 white--text"
                >
                  <span>Desativar Conta</span>
                </v-btn>

                <v-btn :disabled="isEditing" @click="dialogAlterarSenha = true" color="primary" class="white--text">
                  <span>Alterar Senha</span>
                </v-btn>
              </template>

              <v-spacer />

              <v-btn
                v-if="isEditing"
                :disabled="!canSubmit || isSavingUsuario"
                :loading="isSavingUsuario"
                color="success"
                class="mr-0"
                @click="updateUsuario"
              >
                <span>Concluir Edição</span>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <DialogDesativacaoConta v-model="dialogDesativacaoConta" />
    <DialogAlterarSenha v-model="dialogAlterarSenha" />
  </v-row>
</template>

<style scoped>
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
}

::v-deep .v-tabs-slider {
  background-image: repeating-linear-gradient(
    to right,
    #33a650 0%,
    #33a650 25%,
    #448ff2 25%,
    #448ff2 50%,
    #f2a007 50%,
    #f2a007 75%,
    #f23838 75%,
    #f23838 100%
  );
  background-size: 100% 10px;
  background-repeat: no-repeat;
}

v-text-field {
  border-style: none;
}
</style>
