<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"


import TabDadosUsuarioTutor from "@/pages/tutor/perfil/usuario/TabDadosUsuarioTutor.vue"
import TabSelecaoHabilidades from "@/pages/tutor/perfil/usuario/TabSelecaoHabilidades.vue"
//import AgendaProfessor from "@/pages/tutor/agenda/PageAgenda.vue"



@Component({
  name: "PagePerfilUsuarioTutor",
  components: {
    TabDadosUsuarioTutor,
    TabSelecaoHabilidades,
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
          <v-tab>Meu Perfil</v-tab>
          <v-tab>Habilidades</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
              <v-tab-item>
                <TabDadosUsuarioTutor :isEditing="isEditing"/>
              </v-tab-item>

              <v-tab-item>
                <TabSelecaoHabilidades />
              </v-tab-item>

            </v-tabs-items>
  </div>
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
.tableContainer{
  display: flex;
  margin-left: 80px;
  margin-right: 80px;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  
}
.tabBar{
  margin-bottom: 24px;
}
</style>