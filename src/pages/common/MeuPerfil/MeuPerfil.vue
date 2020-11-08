<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import DadosUsuario from "@/pages/common/MeuPerfil/DadosUsuario.vue"
import DadosPessoais from "@/pages/common/MeuPerfil/DadosPessoais.vue"
import ProfileSidebar from "@/pages/common/MeuPerfil/ProfileSidebar.vue"
import GraduacaoTutor from "@/pages/common/MeuPerfil/GraduacaoTutor.vue"
import GraduacaoProfessor from "@/pages/common/MeuPerfil/GraduacaoProfessor.vue"

@Component({
  name: "MeuPerfil",
  components: { GraduacaoProfessor, GraduacaoTutor, DadosPessoais, ProfileSidebar, DadosUsuario }
})
export default class MeuPerfil extends Vue {
  private authModule = getModule(Auth, this.$store)

  tab = 0
  isEditing = false

  userCopy = { ...this.authModule.user }

  // Casting é safe nessa caso pois esse componente só é exibido se
  // o usuário logado é do tipo professor

  get user() {
    return this.isEditing ? this.userCopy : this.authModule.user
  }

  toggleEditMode() {
    this.userCopy = { ...this.authModule.user }
    this.isEditing = !this.isEditing
  }
}
</script>

<template>
  <v-card class="pa-0">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="3" class="pa-0" style="border-right: 1px solid #e3e3e3;">
        <ProfileSidebar />
      </v-col>

      <v-col cols="9" align-self="start">
        <v-tabs v-model="tab">
          <v-tab>Dados Pessoais</v-tab>
          <v-tab>Graduação</v-tab>
          <v-tab>Minha Conta</v-tab>
          <v-spacer />
          <v-btn :color="isEditing ? 'red' : 'grey'" x-large text @click="toggleEditMode">
            <span>{{ isEditing ? "Cancelar Edição" : "Editar" }}</span>
            <v-icon class="ml-3" v-text="isEditing ? 'mdi-pencil-off-outline' : 'mdi-pencil'" />
          </v-btn>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <DadosPessoais :isEditing="isEditing" :user="user" />
          </v-tab-item>

          <v-tab-item>
            <GraduacaoProfessor v-if="user.role == 'professor'" :isEditing="isEditing" :user="user" />
            <GraduacaoTutor v-if="user.role == 'tutor'" :isEditing="isEditing" :user="user" />
          </v-tab-item>

          <v-tab-item>
            <DadosUsuario :isEditing="isEditing" :user="user" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-card>
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
