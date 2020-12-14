<script lang="ts">
import { deleteTutoriaService } from "@/api/tutoria/delete-tutoria"
import Auth from "@/store/modules/auth"
import ProfessorModule from "@/store/modules/professor-module"
import TutoriaModule, { Tutoria } from "@/store/modules/tutoria-module"
import { yyyymmddToddmm } from "@/utils"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

const ModalAceitarTutoria = () => import("@/components/modals/ModalAceitarTutoria.vue")

// tutoria formatada para exibição
export interface TutoriaFormatada extends Tutoria {
  nomeProfessor: string
  fotoProfessor: string
  dataFormatada: string
}

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
    { text: "Professor", value: "nomeProfessor" },
    { text: "Data", value: "dataFormatada" },
    { text: "Horário", value: "tutoringHour" },
    { text: "Ação", value: "acao" }
  ]

  tutoriaEmExibicao: null | TutoriaFormatada = null

  get tutoriasProfessor(): TutoriaFormatada[] {
    return this.tutoriaModule.asArray
      .filter(tutoria => tutoria.requestState === "pendente")
      .map(tutoria => {
        const prof = this.professorModule.byId[tutoria.professorId]
        return {
          dataFormatada: yyyymmddToddmm(tutoria.tutoringDate),
          fotoProfessor: prof?.fotoPerfil || "",
          nomeProfessor: prof?.nome || "",
          ...tutoria
        }
      })
  }

  escolherTutoria(tutoria: TutoriaFormatada) {
    this.tutoriaEmExibicao = tutoria
    this.showModalAceitarTutoria = true
  }

  recusarTutoria(tutoria: TutoriaFormatada) {
    this.showModalAceitarTutoria = false
    this.tutoriaModule.deleteTutoria(tutoria._id).then(() => {
      this.$toasted.success("Tutoria Recusada", {
        theme: "toasted-primary",
        position: "top-left",
        duration: 3000
      })
    })
  }

  aceitarTutoria() {
    if (!this.tutoriaEmExibicao) return
    const data = { ...this.tutoriaEmExibicao, ...{ requestState: "aceita" } }

    this.tutoriaModule.updateTutoria({ idTutoria: this.tutoriaEmExibicao._id, dados: data }).then(() => {
      this.$toasted.success("Tutoria Aceita", { theme: "toasted-primary", position: "top-left", duration: 3000 })

      // TODO gambiarra horrível, na verdade a API devia retornar os dados att, isso faria o filter
      // em tutoriasProfessor parar de exibir a tutoria aceita, mas como não retorna eu simplesmente a removo do estado
      this.tutoriaModule.REMOVE_ITEMS_BY_ID(data._id)
      this.showModalAceitarTutoria = false
    })
  }

  mounted() {
    const userId = this.authModule.user?._id
    if (!userId) return

    // Busco as tutorias pendentes e os professores de cada uma
    this.tutoriaModule.getTutoriasPendentesFromTutor(userId).then(tutorias => {
      tutorias.map(tutoria => {
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
        <template #item.avatar="{ item }">
          <v-avatar size="36px">
            <v-img :src="item.fotoProfessor" lazy-src="@/assets/dog.jpg" />
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

    <ModalAceitarTutoria
      v-if="tutoriaEmExibicao"
      v-model="showModalAceitarTutoria"
      :tutoria="tutoriaEmExibicao"
      @tutoria-aceita="aceitarTutoria"
    />
  </v-row>
</template>
