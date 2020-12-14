<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import Tutorias from "@/pages/tutor/perfil/usuario/Tutorias.vue"
import ProfileSidebar from "@/pages/tutor/perfil/usuario/ProfileSidebar.vue"
import TabDadosUsuarioTutor from "@/pages/tutor/perfil/usuario/TabDadosUsuarioTutor.vue"
import SolicitacoesTutoria from "@/pages/tutor/perfil/usuario/SolicitacoesTutoria.vue"

@Component({
  name: "PagePerfilUsuarioTutor",
  components: {
    Tutorias,
    ProfileSidebar,
    SolicitacoesTutoria,
    TabDadosUsuarioTutor
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
              <v-tab :disabled="isEditing">Tutorias Realizadas</v-tab>
              <v-tab>Meu Usuário</v-tab>

              <v-spacer />

              <v-btn
                :disabled="!canEditUser"
                :color="isEditing ? 'red' : 'grey'"
                x-large
                text
                @click="isEditing = !isEditing"
              >
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
                <TabDadosUsuarioTutor :isEditing="isEditing" @finished-editing="isEditing = false" />
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
