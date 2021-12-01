<script lang="ts">
import { VCalendar } from "@/typings/vuetify"
import { CalendarDaySlotScope, CalendarEvent } from "vuetify"
import { Vue, Component, Ref, Prop} from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { Tutor } from "@/store/modules/auth-types"
import { affirmIsTutorAndReturn, isTutor } from "@/store/modules/tutor-module"
import TutoriaModule from "@/store/modules/tutoria-module"
import ProfessorModule from "@/store/modules/professor-module"
import { User } from "@/store/modules/auth-types"



const InputTipoExibicaoCalendario = () => import("@/components/inputs/InputTipoExibicaoCalendario.vue")
const CardPedidoTutoria = () => import("@/components/cards/CardPedidoTutoria.vue")

@Component({
  name: "AgendaProfessor",
  components: {
    CardPedidoTutoria,
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

  exibirMenuEventoSelecionado = false

  tipoExibicaoCalendario: "month" | "week" | "day" = "month"

  calendarTimeFrame = ""

  selectedEvent = null

  selectedElement = null

  events: CalendarEvent[] = []

  colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1', 'red', 'pink']


  /**
   * O tutor que esta acessando a página
   */
  get tutor(): Tutor {
    return affirmIsTutorAndReturn(this.authModule.user)
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
    await this.tutoriaModule
      .getAllTutoriasFromTutor(this.userCopy._id)
      .then(tutorias => {
        tutorias.forEach(tutoria => {
          if (tutoria.requestState === "aceita") {
          this.professorModule.fetchProfessorById(tutoria.professorId).then(professor => {
            const dataFormatada = this.formataStringData(this.formatarData(tutoria.tutoringDate.toString()))
            const horas = tutoria.tutoringHour.toString().split('-')
            
            // se as horas estão definidas, cria um evento no calendario
            if (horas[0] && horas[1]) {
              this.setEvent(`Tutoria com prof. ${professor.nome}`, 
              dataFormatada + " " + horas[0].trim(),
              dataFormatada + " " + horas[1].trim(),
              false,
              professor.celular, 
              professor.email,
              professor.nome,
              tutoria.tutoringTopic,
              professor.fotoPerfil || '')
            }
          }
          )}
        })
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

    // aqui o .slice(-2) garante o formato com 2 digitos.
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  }

  getEventColor(event: any) {
    if (!event) return null
    return event.color
  }

  setToday() {
    this.calendarTimeFrame = ""
  }

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

  // cria um evento no calendario
  setEvent(nome: string, inicio: string, fim: string, diaTodo: boolean, telefone: string,
   email: string, nomeDoProfessor: string, assuntoProfessor: string, fotoProfessor: string) {
    this.events.push({
      name: nome,
      color: this.colors[Math.floor(Math.random()*this.colors.length)],
      timed: !diaTodo,
      start: new Date(inicio),
      end: new Date(fim),
      telefoneProfessor: telefone,
      emailProfessor: email,
      nomeProfessor: nomeDoProfessor,
      startString: inicio,
      endString: fim,
      assunto: assuntoProfessor,
      foto: fotoProfessor
    })
  }

  updatePageData() {
    this.getTutoria()
  }

  mounted() {
    this.getTutoria()

    this.$root.$on('myEvent', () => {
     this.updatePageData()
    })
  }
}
</script>

<template>
  <div>
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
        <!-- usando v-if para evitar receber null -->
        <CardPedidoTutoria v-if="selectedEvent" 
        :telefone="selectedEvent.telefoneProfessor"
        :professorEmail="selectedEvent.emailProfessor"
        :professorNome="selectedEvent.nomeProfessor"
        :tutoriaInicio="selectedEvent.startString"
        :tutoriaFim="selectedEvent.endString"
        :assuntoDaTutoria="selectedEvent.assunto"
        :fotoDoProfessor="selectedEvent.foto"
        :showModalTutoria="exibirMenuEventoSelecionado" @update-modal-tutoria="exibirMenuEventoSelecionado = $event"/>
      </v-menu>
    </v-sheet>
  </div>
</template>

<style lang="sass">
.v-toolbar__content
     padding: 0
</style>
