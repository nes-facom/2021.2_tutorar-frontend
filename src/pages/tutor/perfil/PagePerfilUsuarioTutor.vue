<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import DadosUsuario from "@/pages/common/MeuPerfil/DadosUsuario.vue"
import DadosPessoais from "@/pages/common/MeuPerfil/DadosPessoais.vue"
import ProfileSidebar from "@/pages/common/MeuPerfil/ProfileSidebar.vue"
import GraduacaoTutor from "@/pages/common/MeuPerfil/GraduacaoTutor.vue"
import SolicitacoesTutoria from "@/pages/professor/perfil/SolicitacoesTutoria.vue"
import Tutorias from "@/pages/professor/perfil/Tutorias.vue"

@Component({
  name: "PagePerfilUsuarioTutor",
  components: { GraduacaoTutor, DadosPessoais, ProfileSidebar, DadosUsuario, SolicitacoesTutoria, Tutorias }
})
export default class PagePerfilUsuarioTutor extends Vue {
  private authModule = getModule(Auth, this.$store)

  tab = 0

  isEditing = false

  userCopy = { ...this.authModule.user }

  get user() {
    return this.isEditing ? this.userCopy : this.authModule.user
  }

  toggleEditMode() {
    this.userCopy = { ...this.authModule.user }
    this.isEditing = !this.isEditing
  }

  get canEditUser() {
    return this.tab > 0
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

          <v-col cols="9" align-self="start" style="border-left: 1px solid #e3e3e3; min-height: 380px">
            <v-tabs v-model="tab">
              <v-tab :disabled="isEditing">Solicitações Tutoria</v-tab>
              <v-tab :disabled="isEditing">Tutorias</v-tab>
              <v-tab>Dados Pessoais</v-tab>
              <v-tab>Graduação</v-tab>
              <v-tab>Minha Conta</v-tab>

              <v-spacer />

              <v-btn :color="isEditing ? 'red' : 'grey'" x-large text @click="toggleEditMode">
                <span v-text="isEditing ? 'Cancelar' : 'Editar'" />
                <v-icon class="ml-3" v-text="isEditing ? 'mdi-pencil-off-outline' : 'mdi-pencil'" />
              </v-btn>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <SolicitacoesTutoria />
              </v-tab-item>

              <v-tab-item>
                <Tutorias />
              </v-tab-item>

              <v-tab-item>
                <DadosPessoais :isEditing="isEditing" :user="user" />
              </v-tab-item>

              <v-tab-item>
                <GraduacaoTutor :isEditing="isEditing" :user="user" />
              </v-tab-item>

              <v-tab-item>
                <DadosUsuario :isEditing="isEditing" :user="user" />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
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
