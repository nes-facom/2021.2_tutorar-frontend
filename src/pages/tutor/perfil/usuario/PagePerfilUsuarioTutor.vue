<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import Tutorias from "@/pages/tutor/perfil/usuario/Tutorias.vue"
import ProfileSidebar from "@/pages/tutor/perfil/usuario/ProfileSidebar.vue"
import TabDadosUsuarioTutor from "@/pages/tutor/perfil/usuario/TabDadosUsuarioTutor.vue"
import SolicitacoesTutoria from "@/pages/tutor/perfil/usuario/SolicitacoesTutoria.vue"
//import AgendaProfessor from "@/pages/tutor/agenda/PageAgenda.vue"

const AgendaTutor = () => import("@/pages/tutor/agenda/PageAgenda.vue")

@Component({
  name: "PagePerfilUsuarioTutor",
  components: {
    Tutorias,
    ProfileSidebar,
    SolicitacoesTutoria,
    TabDadosUsuarioTutor,
    AgendaTutor
  }
})
export default class PagePerfilUsuarioTutor extends Vue {
  authModule = getModule(Auth, this.$store)

  tab = 0

  isEditing = false

  get canEditUser() {
    return Number(this.tab) === 2
  }
}
</script>
<template>
  <div class="tableContainer">
      <v-tabs v-model="tab" class="tabBar">
          <v-tab>Minha agenda</v-tab>
          <v-tab>Solicitações de tutorias</v-tab>
          <v-tab>Tutorias realizadas</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
              <v-tab-item>
                <AgendaTutor/>
              </v-tab-item>

              <v-tab-item>
                <SolicitacoesTutoria />
              </v-tab-item>

              <v-tab-item>
                <Tutorias />
              </v-tab-item>
            </v-tabs-items>
  </div>
</template>
<!--
<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col cols="12" md="10">
      <v-card class="pa-0">
        <v-row align="center" justify="center" no-gutters>


          <v-col cols="9" align-self="start" style="border-left: 1px solid #e3e3e3; min-height: 380px">
            <v-tabs v-model="tab">
              <v-tab>Minha agenda</v-tab>
              <v-tab>Solicitações de tutorias</v-tab>
              <v-tab>Tutorias realizadas</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <PageAgenda/>
              </v-tab-item>

              <v-tab-item>
                <SolicitacoesTutoria />
              </v-tab-item>

              <v-tab-item>
                <Tutorias />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
-->

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
.tableContainer{
  display: flex;
  margin-left: 80px;
  margin-right: 80px;
  justify-content: center;
  flex-direction: column;
}
.tabBar{
  margin-bottom: 24px;
}
</style>