<script lang="ts">
import Auth from "@/store/modules/auth"
import ProfessorModule from "@/store/modules/professor-module"
import TutoriaModule, { Tutoria } from "@/store/modules/tutoria-module"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

const ModalAceitarTutoria = () => import("@/components/modals/ModalAceitarTutoria.vue")

@Component({
  name: "SolicitacoesTutoria",
  components: { ModalAceitarTutoria }
})
export default class SolicitacoesTutoria extends Vue {
  professorModule = getModule(ProfessorModule, this.$store)
  tutoriaModule = getModule(TutoriaModule, this.$store)
  authModule = getModule(Auth, this.$store)

  showModalAceitarTutoria = false

  headers = [
    { text: "Avatar", value: "avatar", align: "start" },
    { text: "Nome", value: "nome" },
    { text: "Data", value: "data" },
    { text: "Horário", value: "horario" },
    { text: "Ação", value: "acao" }
  ]

  solicitacoes = [{ nome: "Leonarda Kauan Pereira", data: "07 de setembro de 2020", horario: "07:00 pm" }]

  get tutoriasProfessor() {
    return this.tutoriaModule.asArray
  }

  escolherTutoria(tutoria: Tutoria) {
    console.log(tutoria)
    this.showModalAceitarTutoria = true
  }

  recusarTutoria() {
    this.showModalAceitarTutoria = false
  }

  aceitarTutoria() {
    //
  }

  mounted() {
    const userId = this.authModule.user?._id
    if (!userId) return
    this.tutoriaModule.getTutoriasPendentesFromTutor(userId).then(tutorias => {
      tutorias.map(tutoria => {
        console.log("fetching", tutoria.professorId)
        this.professorModule.fetchProfessorById(tutoria.professorId)
      })
    })
  }
}
</script>

<template>
  <v-row no-gutters class="mt-6">
    <v-col cols="12">
      <v-data-table :headers="headers" :items="tutoriasProfessor" hide-default-footer>
        <template #item.avatar="{item}">
          <v-avatar size="36px">
            <v-img lazy-src="@/assets/dog.jpg" :src="item.fotoPerfil" />
          </v-avatar>
        </template>

        <template #item.acao="{ item }">
          <v-btn color="red" small class="white--text mr-2" @click="recusarTutoria(item)">
            <span>Recusar</span>
          </v-btn>
          <v-btn color="green" small class="white--text" @click="escolherTutoria(item)">
            <span>Aceitar</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <ModalAceitarTutoria v-model="showModalAceitarTutoria" @tutoria-recusada="recusarTutoria" />
  </v-row>
</template>
