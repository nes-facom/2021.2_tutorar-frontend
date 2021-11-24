<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import Tutorias from "@/pages/tutor/home/Tutorias.vue"
import SolicitacoesTutoria from "@/pages/tutor/home/SolicitacoesTutoria.vue"

import Horarios from "@/pages/tutor/home/Horarios.vue"

const AgendaTutor = () => import("@/pages/tutor/agenda/PageAgenda.vue")

@Component({
  name: "PageHomeTutor",
  components: {
    Tutorias,
    SolicitacoesTutoria,
    AgendaTutor,
    Horarios
  }
})
export default class PageHomeTutor extends Vue {
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
          <v-tab>Horários</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
              <v-tab-item>
                <AgendaTutor/>
              </v-tab-item>

              <v-tab-item>
                <SolicitacoesTutoria/>
              </v-tab-item>
              <v-tab-item>
                <Tutorias/>
              </v-tab-item>
              <v-tab-item>
                <Horarios />
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
  flex-direction: column;
}
.tabBar{
  margin-bottom: 24px;
}
</style>