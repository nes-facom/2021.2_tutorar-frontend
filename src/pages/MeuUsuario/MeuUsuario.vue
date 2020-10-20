<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import DadosUsuario from "@/pages/MeuUsuario/DadosUsuario.vue"
import DadosPessoais from "@/pages/MeuUsuario/DadosPessoais.vue"
import ProfileSidebar from "@/pages/MeuUsuario/ProfileSidebar.vue"
import GraduacaoTutor from "@/pages/MeuUsuario/GraduacaoTutor.vue"
import GraduacaoProfessor from "@/pages/MeuUsuario/GraduacaoProfessor.vue"

@Component({
  name: "PageUser",
  components: { GraduacaoProfessor, GraduacaoTutor, DadosPessoais, ProfileSidebar, DadosUsuario }
})
export default class PageUser extends Vue {
  private authModule = getModule(Auth, this.$store)

  user = this.authModule.user

  tab = 0
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
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <DadosPessoais />
          </v-tab-item>
          <v-tab-item>
            <GraduacaoProfessor v-if="user.role == 'professor'" />
            <GraduacaoTutor v-if="user.role == 'tutor'" />
          </v-tab-item>
          <v-tab-item>
            <DadosUsuario />
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
