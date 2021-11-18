<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import TutorModule, { isTutor } from "@/store/modules/tutor-module"
import HabilidadesModule from "@/store/modules/habilidades-module"
import { Tutor } from "@/store/modules/auth-types"
import Auth from "@/store/modules/auth"
import FerramentasTutor from "@/pages/tutor/perfil/outro/FerramentasTutor.vue"
import DisponibilidadeTutor from "@/pages/tutor/perfil/outro/DisponibilidadeTutor.vue"

const ListaExibicaoHorarios = () => import("@/pages/tutor/perfil/outro/ListaExibicaoHorarios.vue")
const ModalAgendarTutoria = () => import("@/components/modals/ModalAgendarTutoria.vue")

@Component({
  name: "PagePerfilTutor",
  components: {
    ModalAgendarTutoria,
    ListaExibicaoHorarios,
    FerramentasTutor,
    DisponibilidadeTutor
  }
})
export default class PagePerfilTutor extends Vue {
  habilidadesModule = getModule(HabilidadesModule, this.$store)
  tutorModule = getModule(TutorModule, this.$store)
  authModule = getModule(Auth, this.$store)

  isCarregandoTutor = false
  failedToLoadTutor = false

  showModalAgendarTutoria = false

  habilidadesChipColors = ["red", "green", "purple", "orange", "indigo"]

  get tutor(): Tutor | null {
    return this.tutorModule.byId[this.idTutorEmExibicao]
  }

  get idTutorEmExibicao(): string {
    return this.$route.params["id"]
  }

  mounted() {
    this.habilidadesModule.fetchAll({ forceRefetch: false })

    const tutorFoiCarregadoPreviamente = isTutor(this.tutorModule.byId[this.idTutorEmExibicao])

    if (tutorFoiCarregadoPreviamente) return

    this.isCarregandoTutor = true

    this.tutorModule
      .getById(this.idTutorEmExibicao)
      .then(() => (this.isCarregandoTutor = true))
      .catch(() => (this.failedToLoadTutor = true))
      .finally(() => (this.isCarregandoTutor = false))
  }
}
</script>

<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="12" md="10" lg="8">
      <v-row v-if="failedToLoadTutor">
        <v-col cols="12">
          <v-card-title class="display-2 grey--text mx-auto" style="max-width: 550px">
            Erro ao carregar tutor.
          </v-card-title>
        </v-col>
      </v-row>

      <v-progress-linear
        v-else-if="isCarregandoTutor"
        color="deep-purple accent-4"
        class="mt-12"
        indeterminate
        rounded
        height="6"
      />

      <v-card v-else-if="tutor">
        <v-row no-gutters>
          <v-col cols="3">
            <div class="profileAndBackButton">
              <v-btn color="primary" class="backButton" text @click="$router.push({ path: '/home' })">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-avatar size="150px" class="mt-8 mx-auto">
                <v-img :src="tutor.fotoPerfil" lazy-src="@/assets/taylor.jpg" />
              </v-avatar>
            </div>

            <v-card-text class="text-center h4 display-1" v-text="tutor.nome" />
            <v-divider />

            <v-card-text class="pb-0">
              <span class="subtitle2 d-block">Curso</span>
              <span class="h5" v-text="tutor.cursoLicensiatura" />
            </v-card-text>

            <v-card-text>
              <span class="subtitle2 d-block">Universidade</span>
              <span class="h5" v-text="tutor.universidade" />
            </v-card-text>

            <v-card-actions v-if="authModule.user && !authModule.user.isMonitor">
              <!--  <v-btn color="green" class="white--text mx-auto mb-3" @click="showModalAgendarTutoria = true" small>
                Agendar Tutoria
              </v-btn> -->
            </v-card-actions>
          </v-col>

          <v-col cols="9" style="border-left: 1px solid #e3e3e3; min-height: 300px">
            <template>
              <div>
                <ferramentas-tutor />
              </div>
              <div>
                <disponibilidade-tutor />
              </div>
              <div class="btn">
                <v-btn class="ma-2 btnTextWhite" color="#106CE5"> Solicitar tutoria </v-btn>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <ModalAgendarTutoria v-if="tutor" v-model="showModalAgendarTutoria" :tutor="tutor" />
  </v-row>
</template>


<style lang = "scss" >
.h4 {
  font-weight: 400;
  font-style: normal;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: 0.25px;
  color: #333333;
}
.h5 {
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
}
.subtitle2 {
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
  color: #878787;
}
.profileAndBackButton {
  display: flex;
  flex-direction: column;
}
.backButton {
  display: flex;
  align-self: flex-start;
}
.toolsAndAvailabilityWrapper {
  display: flex;
  flex-direction: column;
}
.btnTextWhite {
  color: white !important;
}
.btn{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 20px;
  padding-bottom: 20px;
}
</style>