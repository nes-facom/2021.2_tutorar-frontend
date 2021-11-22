<script lang="ts">
import { VCalendar } from "@/typings/vuetify"
import { CalendarDaySlotScope, CalendarEvent } from "vuetify"
import { Vue, Component, Ref } from "vue-property-decorator"
import { AgendaHorarios } from "./agenda"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { Tutor } from "@/store/modules/auth-types"
import { affirmIsTutorAndReturn, isTutor } from "@/store/modules/tutor-module"
import TutoriaModule from "@/store/modules/tutoria-module"
import ProfessorModule from "@/store/modules/professor-module"
import { User } from "@/store/modules/auth-types"
import { forEach } from "lodash"


const InputTipoExibicaoCalendario = () => import("@/components/inputs/InputTipoExibicaoCalendario.vue")
const ModalConfigurarHorarios = () => import("@/pages/tutor/agenda/ModalConfigurarHorarios.vue")
const CardPedidoTutoria = () => import("@/components/cards/CardPedidoTutoria.vue")


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


@Component({
  name: "AgendaProfessor",
  components: {
    CardPedidoTutoria,
    ModalConfigurarHorarios,
    InputTipoExibicaoCalendario
  }
})
export default class AgendaProfessor extends Vue {
  @Ref("calendar")
  calendar!: VCalendar

  authModule = getModule(Auth, this.$store)
  tutoriaModule = getModule(TutoriaModule, this.$store)
  professorModule = getModule(ProfessorModule, this.$store)
  userCopy: User = { ...this.authModule.user } as User

  tutoriasArray: DadosTutoria[] = []


  showModalConfigurarHorarios = false

  exibirMenuEventoSelecionado = false

  tipoExibicaoCalendario: "month" | "week" | "day" = "month"

  /**
   * A date in the format of YYYY-MM-DD which determines
   * what span of time for the calendar.
   */
  calendarTimeFrame = ""

  selectedEvent = null

  selectedElement = null

  events: CalendarEvent[] = []

  telefone = 67991121434

  /**
   * O tutor que esta acessando a página
   */
  get tutor(): Tutor {
    return affirmIsTutorAndReturn(this.authModule.user)
  }



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

  formatarData(data: string) {
    if (!data) return ""
    let dataFormatada = data.substring(0, 10)

    const dia = dataFormatada.substring(8, 10)
    const mes = dataFormatada.substring(5, 7)
    const ano = dataFormatada.substring(0, 4)

    dataFormatada = `${dia}/${mes}/${ano}`
    
    return dataFormatada
  }

  async getTutoria() {
      const tutoriasAux: any[] = []

      await this.tutoriaModule
        .getAllTutoriasFromTutor(this.userCopy._id)
        .then(tutorias => {
          tutorias.forEach(tutoria => {
            if (tutoria.requestState === "aceita") {
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
              const dataFormatada = this.formataStringData(tutoriaCriada.date)
              const horas = tutoriaCriada.time.split('-')
              console.log(horas)
              
              if (horas[0] && horas[1]) {
                this.setEvent(`Tutoria prof. ${tutoriaCriada.nomeProfessor}`, dataFormatada + " " + horas[0].trim(), dataFormatada + " " + horas[1].trim(), "blue", false, tutoriaCriada.celularProfessor, tutoriaCriada.emailProfessor, tutoriaCriada.nomeProfessor)
              }
            })
            }
          })
          console.log('tuto', tutoriasAux, tutoriasAux.length)

        })
        .finally(() => {
          this.tutoriasArray = tutoriasAux
          console.log(tutoriasAux)
          console.log("test")
          console.log(this.tutoriasArray.length, this.tutoriasArray)

          tutoriasAux.forEach((tutoria) => {
            console.log("test")            
            console.log(tutoria.date)
          } )
        })
    }


  viewDay({ date }: CalendarDaySlotScope) {
    this.calendarTimeFrame = date
    this.tipoExibicaoCalendario = "day"
  }

  formataStringData(data: string) {
    const dia  = data.split("/")[0];
    const mes  = data.split("/")[1];
    const ano  = data.split("/")[2];

    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
}


  // TODO se livrar do any
  getEventColor(event: any) {
    if (!event) return null
    return event.color
  }

  setToday() {
    this.calendarTimeFrame = ""
  }

  // TODO se livrar do any
  exibirEvento({ nativeEvent, event }: { [x: string]: any }) {
    const open = () => {
      this.selectedEvent = event
      this.selectedElement = nativeEvent.target
      setTimeout(() => {
        this.exibirMenuEventoSelecionado = true
      }, 10)
    }

    if (this.exibirMenuEventoSelecionado) {
      this.exibirMenuEventoSelecionado = false
      setTimeout(open, 10)
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  }

  // TODO: se livrar desses anys
  setEvent(nome: any, inicio: any, fim: any, cor: any, diaTodo: any, telefone: any, email:any, nomeDoProfessor: any) {
    this.events.push({
      name: nome,
      color: cor,
      timed: !diaTodo,
      start: new Date(inicio),
      end: new Date(fim),
      telefoneProfessor: telefone,
      emailProfessor: email,
      nomeProfessor: nomeDoProfessor,
      startString: inicio,
      endString: fim,
    })
  }

  closeAndCancel(calendarTimeFrame: any) {
    setTimeout(() => {
      this.exibirMenuEventoSelecionado = false
      this.events.splice(calendarTimeFrame, 1)
    }, 2500)
  }

  mounted() {
    // this.setEvent("Teste", new Date(), new Date(), "blue", false, "64", "test@email", "Vinicius")
    this.setEvent("Tutoria", "2020-11-11 12:30", "2020-11-11 21:00", "blue", false, "64", "test@email",  "Vinicius")
    this.setEvent("Tutoria", "2021-11-21 12:30", "2021-11-21 21:00", "blue", false, "64", "test@email",  "Vinicius")
    this.setEvent("Tutoria", "2021-11-21 12:30", "2021-11-21 21:00", "blue", false, "64", "test@email",  "Vinicius")
    this.getTutoria()
  }
}
</script>

<template>
  <div>
    <ModalConfigurarHorarios
      v-model="showModalConfigurarHorarios"
      :horarios-tutor="tutor.agenda"
      @horarios-atualizados="$log('horarios-att !', $event)"
    />

    <v-toolbar flat class="px-0">
      <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Hoje</v-btn>

      <!-- Esses componentes dependen que o calendar esteja mounted, por isso o v-if -->
      <template v-if="calendar">
        <v-btn fab text small color="grey darken-2" @click="calendar.prev()">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn fab text small color="grey darken-2" @click="calendar.next()">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>

        <v-toolbar-title v-text="calendar.title" class="ml-4" />
      </template>

      <v-spacer />

      <v-btn @click="showModalConfigurarHorarios = true" color="primary" class="mr-6">Meus Horários</v-btn>

      <InputTipoExibicaoCalendario v-model="tipoExibicaoCalendario" />
    </v-toolbar>

    <v-sheet height="600">
      <v-calendar
        locale="pt-br"
        ref="calendar"
        v-model="calendarTimeFrame"
        color="primary"
        :type="tipoExibicaoCalendario"
        :events="events"
        :event-color="getEventColor"
        @click:event="exibirEvento"
        @click:more="viewDay"
        @click:date="viewDay"
      />

      <v-menu
        v-model="exibirMenuEventoSelecionado"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <!-- usando v-if para não quebrar por receber null, caso não funcione
             refatorar para passar o objeto todo para o card, ou seja, selecteEvent
             e parsear dentro do card -->
        <CardPedidoTutoria v-if="selectedEvent" 
        :telefone="selectedEvent.telefoneProfessor"
        :professorEmail="selectedEvent.emailProfessor"
        :professorNome="selectedEvent.nomeProfessor"
        :tutoriaInicio="selectedEvent.startString"
        :tutoriaFim="selectedEvent.endString"
        :showModalTutoria="exibirMenuEventoSelecionado" @update-modal-tutoria="exibirMenuEventoSelecionado = $event"/>
      </v-menu>
    </v-sheet>
  </div>
</template>

<style lang="sass">
.v-toolbar__content
     padding: 0
</style>
