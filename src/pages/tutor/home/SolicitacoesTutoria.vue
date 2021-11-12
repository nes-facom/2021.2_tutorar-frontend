<script lang="ts">
const ModalCancelarTutoria = () => import("@/components/modals/ModalCancelarTutoria.vue")
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"
import TutoriaModule from "@/store/modules/tutoria-module"
import ProfessorModule from "@/store/modules/professor-module"
import { User } from "@/store/modules/auth-types"
import Auth from "@/store/modules/auth"

export interface DadosTutoria {
  date: string
  time: string
  fotoProfessor: string
  nomeProfessor: string
  assuntoProfessor: string
  mensagemTutoria: string
  emailProfessor: string
  celularProfessor: string
}

@Component({
  name: "Tutorias",
  components: { ModalCancelarTutoria }
})
export default class extends Vue {
  dialog = false
  tutoriasArray: DadosTutoria[] = []

  tutoriaModule = getModule(TutoriaModule, this.$store)
  professorModule = getModule(ProfessorModule, this.$store)
  authModule = getModule(Auth, this.$store)

  userCopy: User = { ...this.authModule.user } as User

  criarTutoria(
    date: string,
    time: string,
    fotoProfessor: string,
    nomeProfessor: string,
    assuntoProfessor: string,
    mensagemTutoria: string,
    emailProfessor: string,
    celularProfessor: string
  ): DadosTutoria {
    const tutoria: DadosTutoria = {
      date,
      time,
      fotoProfessor,
      nomeProfessor,
      assuntoProfessor,
      mensagemTutoria,
      emailProfessor,
      celularProfessor
    }

    return tutoria
  }

  get user() {
    return (this.userCopy = this.authModule.user as User)
  }

  data() {
    return {
      expanded: [],
      singleExpand: false,
      requestsHeaders: [
        {
          text: "Foto",
          align: "start",
          sortable: false,
          value: "foto"
        },
        { text: "Nome", value: "nomeProfessor" },
        { text: "Data", value: "date" },
        { text: "Horário", value: "time" },
        { text: "Assunto", value: "assuntoProfessor" },
        { text: "", value: "data-table-expand" }
      ]
    }
  }

  async getTutoria() {
    const tutoriasAux: any[] = []

    await this.tutoriaModule.getTutoriasPendentesFromTutor(this.userCopy._id).then(tutorias => {
      tutorias.forEach(tutoria => {
        this.professorModule.fetchProfessorById(tutoria.professorId).then(professor => {
          const tutoriaCriada = this.criarTutoria(
            tutoria.tutoringDate.toString(),
            tutoria.tutoringHour.toString(),
            "professor.fotoPerfil",
            professor.nome,
            "Google meet",
            tutoria.requestMessage,
            professor.email,
            professor.celular
          )
          tutoriasAux.push(tutoriaCriada)
          console.log("Tutoria criada: " + tutoriaCriada.nomeProfessor)
        })
      })
    })
    console.log(this.tutoriasArray)
    console.log(tutoriasAux)

    this.tutoriasArray = tutoriasAux

    console.log(this.tutoriasArray)
  }

  aceitarTutoria() {
    //this.tutoriaModule.aceitarTutoria(this.tutoriasArray[0]._id)
  }

  mounted() {
    this.getTutoria()
  }
}
</script>
<template>
  <v-data-table
    :headers="requestsHeaders"
    :items="tutoriasArray"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    show-expand
    fixed-header
    height="40em"
  >
    <template v-slot:[`item.foto`]>
      <v-avatar size="36px">
        <v-img src="@/assets/dog.jpg" />
      </v-avatar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <div class="expandedCellContainer">
          <div class="descriptionContainer">
            <p class="description">
              {{ item.mensagemTutoria }}
            </p>
            <div class="contactInformationContainer">
              <p>{{ item.emailProfessor }}</p>
              <p>{{ item.celularProfessor }}</p>
            </div>
          </div>
          <div class="buttonsContainer">
            <ModalCancelarTutoria :value="false" />
            <v-btn class="ma-2 btnTextWhite" color="#106CE5" @click="aceitarTutoria()"> Aceitar tutoria </v-btn>
          </div>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<style lang = "scss" >
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
}
.buttonsContainer {
  display: flex;
  flex-direction: column;
}
.contactInformationContainer {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}
.descriptionContainer {
  display: flex;
  flex-direction: row;
  margin-top: 8pt;
  margin-bottom: 16pt;
  justify-content: space-between;
}
.description {
  width: 410pt;
  min-width: 210pt;
}

.expandedCellContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btnTextWhite {
  color: white !important;
}
</style>