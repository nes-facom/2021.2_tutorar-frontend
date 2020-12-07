<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import TutorModule, { isTutor } from "@/store/modules/tutor-module"
import HabilidadesModule from "@/store/modules/habilidades-module"
import { Tutor } from "@/store/modules/auth-types"
import Auth from "@/store/modules/auth"

const ModalAgendarTutoria = () => import("@/components/modals/ModalAgendarTutoria.vue")
const ListaExibicaoHorarios = () => import("@/pages/tutor/perfil/ListaExibicaoHorarios.vue")

@Component({
  name: "PagePerfilTutor",
  components: { ModalAgendarTutoria, ListaExibicaoHorarios }
})
export default class PagePerfilTutor extends Vue {
  authModule = getModule(Auth, this.$store)
  tutorModule = getModule(TutorModule, this.$store)
  habilidadesModule = getModule(HabilidadesModule, this.$store)

  isCarregandoTutor = false
  failedToLoadTutor = false

  showModalAgendarTutoria = false

  habilidadesChipColors = ["red", "green", "purple", "orange", "indigo"]

  tutor: Tutor | null = null

  get idTutorEmExibicao(): string {
    return this.$route.params["id"]
  }

  mounted() {
    this.habilidadesModule.fetchAll({ forceRefetch: false })

    const tutorFoiCarregadoPreviamente = isTutor(this.tutorModule.byId[this.idTutorEmExibicao])

    if (tutorFoiCarregadoPreviamente) {
      this.tutor = this.tutorModule.byId[this.idTutorEmExibicao]
      return
    }

    this.isCarregandoTutor = true

    this.tutorModule
      .getById(this.idTutorEmExibicao)
      .then(() => {
        this.isCarregandoTutor = true
      })
      .catch(() => {
        this.failedToLoadTutor = true
      })
      .finally(() => {
        this.isCarregandoTutor = false
      })
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
            <div class="d-flex align-center">
              <v-avatar size="150px" class="mt-8 mx-auto">
                <v-img :src="tutor.fotoPerfil" lazy-src="@/assets/taylor.jpg" />
              </v-avatar>
            </div>

            <v-card-text class="text-center blue--text display-1" v-text="tutor.nome" />
            <v-divider />

            <v-card-text class="pb-0">
              <span class="grey--text subtitle d-block">Curso</span>
              <span class="blue--text title" v-text="tutor.cursoLicensiatura" />
            </v-card-text>

            <v-card-text>
              <span class="grey--text subtitle d-block">Universidade</span>
              <span class="blue--text title" v-text="tutor.universidade" />
            </v-card-text>

            <v-card-actions>
              <v-btn color="green" small class="white--text mx-auto mb-3" @click="showModalAgendarTutoria = true">
                Agendar Tutoria
              </v-btn>
            </v-card-actions>
          </v-col>

          <v-col cols="9" style="border-left: 1px solid #e3e3e3; min-height: 300px">
            <v-card-title class="pb-0">
              <v-icon color="primary" left>mdi-calendar</v-icon>
              <span class="grey--text text--darken-1">Disponiblidade do Tutor</span>

              <v-spacer />
              <v-btn color="primary" text @click="$router.push({ path: '/home' })">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-card-title>

            <ListaExibicaoHorarios :agenda="tutor.agenda" />

            <v-divider class="py-1" />

            <v-card-title class="mb-0">
              <v-icon color="primary" left>mdi-account-details</v-icon>
              <span class="grey--text text--darken-1">Ferramentas</span>
            </v-card-title>

            <v-chip-group multiple class="mx-4 mb-4">
              <v-chip
                v-for="(habilidade, i) in tutorModule.habilidadesTutor(idTutorEmExibicao)"
                v-text="habilidade.nome"
                :key="habilidade._id"
                :color="`${habilidadesChipColors[i]} white--text`"
              />
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <ModalAgendarTutoria v-if="tutor" v-model="showModalAgendarTutoria" :tutor="tutor" />
  </v-row>
</template>
