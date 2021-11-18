<script lang="ts">
import Auth from "@/store/modules/auth"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import TutoriaModule from "@/store/modules/tutoria-module"
import ProfessorModule from "@/store/modules/professor-module"
import { User } from "@/store/modules/auth-types"
const ModalRegistrarTutoria = () => import("@/components/modals/ModalRegistrarTutoria.vue")

export interface DadosTutoriaRegistrada {
  id: string
  fotoProfessor: any
  nomeProfessor: string
  date: string
  time: string
  assunto: string
  estado: string
}

@Component({
  name: "Tutorias",
  components: {
    ModalRegistrarTutoria
  }
})
export default class Tutorias extends Vue {
  authModule = getModule(Auth, this.$store)
  tutoriaModule = getModule(TutoriaModule, this.$store)
  professorModule = getModule(ProfessorModule, this.$store)

  userCopy: User = { ...this.authModule.user } as User

  showModalRegitrarTutoria = false
  dialog = false
  isCarregandoTutorias = true

  tutoriasArray: DadosTutoriaRegistrada[] = []

  expanded = []
  singleExpand = false

  headers = [
    {
      text: "Avatar",
      value: "avatar",
      sortable: false,
      align: "start"
    },
    {
      text: "Nome",
      value: "nomeProfessor"
    },
    {
      text: "Data",
      value: "date"
    },
    {
      text: "Horário",
      value: "time"
    },
    {
      text: "Assunto",
      value: "assunto"
    },
    {
      text: "",
      value: "acao"
    },
    { text: "", value: "data-table-expand" }
  ]

  criarTutoria(
    id: string,
    fotoProfessor: any,
    nomeProfessor: string,
    date: string,
    time: string,
    assunto: string,
    estado: string
  ): DadosTutoriaRegistrada {
    const tutoriaCriada: DadosTutoriaRegistrada = {
      id,
      fotoProfessor,
      nomeProfessor,
      date,
      time,
      assunto,
      estado
    }

    return tutoriaCriada
  }

  registrarTutoria() {
    console.log("registrarTutoria")
    this.showModalRegitrarTutoria = true
  }

  cancelarOperacao() {
    this.showModalRegitrarTutoria = false
    this.dialog = false
  }

  adicionaZero(numero: number) {
    if (numero <= 9) return "0" + numero
    else return numero
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

  get user() {
    return (this.userCopy = this.authModule.user as User)
  }

  async getTutorias() {
    const tutoriasAux: any[] = []

    await this.tutoriaModule
      .getAllTutoriasFromTutor(this.userCopy._id)
      .then(tutorias => {
        tutorias.forEach(tutoria => {
          if (tutoria.requestState !== "pendente") {
            this.professorModule.fetchProfessorById(tutoria.professorId).then(professor => {
              const tutoriaCriada = this.criarTutoria(
                tutoria._id,
                professor.fotoPerfil,
                professor.nome,
                this.formatarData(tutoria.tutoringDate.toString()),
                tutoria.tutoringHour.toString(),
                "Google meet",
                tutoria.requestState
              )
              tutoriasAux.push(tutoriaCriada)
            })
          }
        })
      })
      .finally(() => {
        this.tutoriasArray = tutoriasAux
        this.isCarregandoTutorias = false
      })
  }

  getRequestState(estado: string) {
    if (estado === "registrada") 
      return false
    else 
      return true
  }

  async handleChange(tutoriaId: string) {
    if (tutoriaId != null) {
      await this.tutoriaModule.registraTutoria(tutoriaId).then(() => {
        this.$toasted.success("Tutoria registrada", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 5000
        })
      })
    }
  }

  mounted() {
    this.getTutorias()
  }
}
</script>

<template>
  <section id="main" v-if="!isCarregandoTutorias">
    <v-data-table
      :headers="headers"
      :items="tutoriasArray"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :key="tutoriasArray.id"
      :items-per-page="10"
      show-expand
      fixed-header
      height="40em"
    >
      <template v-slot:[`item.avatar`]>
        <v-avatar size="36px">
          <v-img src="@/assets/dog.jpg" />
        </v-avatar>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="buttonsContainer" v-if="getRequestState(item.estado)">
            <ModalRegistrarTutoria v-on:inputChange="handleChange(item.id)" :nome="item.nomeProfessor" :data="item.date" :horario="item.time" />
          </div>
          <div v-else class="buttonsContainer">
            <v-btn class="btnTextWhite" color="#106CE5" disabled>Registrar tutoria </v-btn>  
          </div>
        </td>
      </template>
    </v-data-table>
  </section>
  <section id="loading" v-else>
    <v-progress-linear color="deep-purple accent-4" class="mt-12" indeterminate rounded height="6" />
  </section>
</template>

<style lang="scss">
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
}
.buttonsContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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