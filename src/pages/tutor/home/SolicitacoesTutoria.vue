<script lang="ts">
const ModalCancelarTutoria = () => import("@/components/modals/ModalCancelarTutoria.vue")
const ModalAceitarTutoria = () => import("@/components/modals/ModalAceitarTutoria.vue")
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"
import TutoriaModule from "@/store/modules/tutoria-module"
import ProfessorModule from "@/store/modules/professor-module"
import { User } from "@/store/modules/auth-types"
import Auth from "@/store/modules/auth"

export interface DadosTutoria {
  id: string
  date: string
  time: string
  fotoProfessor: string
  nomeProfessor: string
  assuntoProfessor: string
  mensagemTutoria: string
  emailProfessor: string
  celularProfessor: string
}

export interface TutoriaAceita {
  id: string
  requestState: string
  tutorId: string
  professorId: string
  tutoringDate: string
  tutoringHour: string
  requestMessage: string
}

@Component({
  name: "Tutorias",
  components: {
    ModalCancelarTutoria,
    ModalAceitarTutoria
  }
})
export default class extends Vue {
  dialog = false
  tutoriasArray: DadosTutoria[] = []
  isCarregandoTutorias = true

  tutoriaModule = getModule(TutoriaModule, this.$store)
  professorModule = getModule(ProfessorModule, this.$store)
  authModule = getModule(Auth, this.$store)

  userCopy: User = { ...this.authModule.user } as User

  criarTutoria(
    id: string,
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
      id,
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

    await this.tutoriaModule
      .getTutoriasPendentesFromTutor(this.userCopy._id)
      .then(tutorias => {
        tutorias.forEach(tutoria => {
          this.professorModule.fetchProfessorById(tutoria.professorId).then(professor => {
            const tutoriaCriada = this.criarTutoria(
              tutoria._id,
              this.formatarData(tutoria.tutoringDate.toString()),
              tutoria.tutoringHour.toString(),
              "professor.fotoPerfil",
              professor.nome,
              "Google meet",
              tutoria.requestMessage,
              professor.email,
              professor.celular
            )
            tutoriasAux.push(tutoriaCriada)
          })
        })
      })
      .finally(() => {
        this.tutoriasArray = tutoriasAux
        this.isCarregandoTutorias = false
      })
  }

  // recebe
  async handleChange(tutoriaId: string) {
    if (tutoriaId != null) {
      await this.tutoriaModule.deleteTutoria(tutoriaId).then(() => {
        this.$toasted.success("Tutoria deletada", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 5000
        })
      })
    }
    // depois da remoção, pega os dados novamente no banco
    this.getTutoria()
  }
  async acceptChange(tutoriaId: string) {
    if (tutoriaId != null) {
      await this.tutoriaModule.aceitaTutoria(tutoriaId).then(() => {
        this.$toasted.success("Tutoria aceita", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 5000
        })
      })
    }
    // depois da remoção, pega os dados novamente no banco
    this.getTutoria()
  }

  formatarData(data: string) {
    if (!data) return ""
    let dataFormatada = data.substring(0, 10)

    const dia = dataFormatada.substring(8, 10)
    const mes = dataFormatada.substring(5, 7)
    const ano = dataFormatada.substring(0, 4)

    dataFormatada = `${dia}/${mes}/${ano}`
    
    return dataFormatada
  }

  mounted() {
    this.getTutoria()
  }
}
</script>
<template>
  <section id="main" v-if="!isCarregandoTutorias">
    <v-data-table
      :headers="requestsHeaders"
      :items="tutoriasArray"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :key="tutoriasArray.id"
      show-expand
      current-items
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
              <ModalCancelarTutoria v-on:inputChange="handleChange(item.id)" :tutoriaId="item.id" />
              <ModalAceitarTutoria v-on:inputChange="acceptChange(item.id)" :tutoriaId="item.id" />
            </div>
          </div>
        </td>
      </template>
    </v-data-table>
  </section>
  <section id="loading" v-else>
    <v-progress-linear color="deep-purple accent-4" class="mt-12" indeterminate rounded height="6" />
  </section>
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
  margin-left: 16px;
  margin-right: 16px;
}
.descriptionContainer {
  display: flex;
  flex-direction: row;
  margin-top: 8pt;
  margin-bottom: 16pt;
  justify-content: space-between;
  width: 100%;
}
.description {
  max-width: 450px;
}

.expandedCellContainer {
  display: flex;
  flex-direction: row;
}

.btnTextWhite {
  color: white !important;
}
</style>