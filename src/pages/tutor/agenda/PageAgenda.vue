<script lang="ts">
import { CalendarClickAtEventEvent, VuetifyCalendarComponent } from "@/pages/tutor/agenda/calendar"
import { CalendarDaySlotScope, CalendarEvent } from "vuetify"
import { Vue, Component, Ref } from "vue-property-decorator"
import { AgendaHorarios } from "./agenda"

const InputTipoExibicaoCalendario = () => import("@/components/inputs/InputTipoExibicaoCalendario.vue")
const ModalConfigurarAgenda = () => import("@/pages/tutor/agenda/ModalConfigurarAgenda.vue")

@Component({
  name: "AgendaProfessor",
  components: {
    ModalConfigurarAgenda,
    InputTipoExibicaoCalendario
  }
})
export default class AgendaProfessor extends Vue {
  @Ref("calendar")
  calendar!: VuetifyCalendarComponent

  showModalConfigurarAgenda = false

  showModalTutoriaCancelada = false

  tipoExibicaoCalendario: "month" | "week" | "day" = "month"

  horariosTutorMock: AgendaHorarios = {
    segunda: [{ inicio: "1580", fim: "1830" }],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: []
  }

  // CANCER, que porra é essa, olha isso

  focus = ""

  selectedEvent = null

  selectedElement = null

  selectedOpen = false

  events: CalendarEvent[] = []

  telefone = 67991121434

  viewDay({ date }: CalendarDaySlotScope) {
    this.focus = date
    this.tipoExibicaoCalendario = "day"
  }

  getEventColor(event: any) {
    if (!event) return null
    return event.color
  }

  setToday() {
    this.focus = ""
  }

  prev() {
    this.calendar.prev()
  }

  next() {
    this.calendar.next()
  }

  showEvent({ nativeEvent, event }: { nativeEvent: Event; event: CalendarClickAtEventEvent }) {
    const open = () => {
      // this.selectedEvent = event
      // this.selectedElement = nativeEvent.target
      setTimeout(() => {
        this.selectedOpen = true
      }, 10)
    }

    if (this.selectedOpen) {
      this.selectedOpen = false
      setTimeout(open, 10)
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  }

  setEvent(nome: any, inicio: any, fim: any, cor: any, diaTodo: any) {
    this.events.push({
      name: nome,
      color: cor,
      timed: !diaTodo,
      start: inicio,
      end: fim
    })
  }

  whatsappLink() {
    window.open(`https://wa.me/55${this.telefone}_blank`)
  }

  closeAndCancel(focus: any) {
    setTimeout(() => {
      this.selectedOpen = false
      this.events.splice(focus, 1)
    }, 2500)
  }

  mounted() {
    this.setEvent("", new Date(), new Date(), "blue", false)
    this.setEvent("", new Date("2020-11-11 12:30"), new Date("2020-11-11 21:00"), "blue", false)
  }
}
</script>

<template>
  <div>
    <ModalConfigurarAgenda v-model="showModalConfigurarAgenda" :horarios-tutor="horariosTutorMock" />

    <v-toolbar flat class="px-0">
      <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Hoje</v-btn>

      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>

      <v-toolbar-title v-if="calendar" v-text="calendar.title" class="ml-4" />

      <v-spacer />

      <v-btn @click="showModalConfigurarAgenda = true" color="primary" class="mr-6">Meus Horários</v-btn>

      <InputTipoExibicaoCalendario v-model="tipoExibicaoCalendario" />
    </v-toolbar>

    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :type="tipoExibicaoCalendario"
        :events="events"
        :event-color="getEventColor"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
      />
      <!-- 
        @TODO: isso aqui abaixo deve ser um componente
       -->
      <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
        <v-card color="grey lighten-4" min-width="350px" width="500px" flat>
          <v-toolbar color="green" dark>
            <v-toolbar-title>Tutoria Agendada</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <v-avatar size="100%">
                    <v-img src="@/assets/dog.jpg" />
                  </v-avatar>
                </v-col>
                <v-col cols="9" align-self="center">
                  <h4>
                    selected.pessoa.nome gostaria de agendar uma tutoria no dia selected.dia.selecao às
                    selected.hora.selecao.
                  </h4>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text>
              <v-row class="">
                <v-icon class="pr-2">mdi-phone</v-icon>
                <h3>Informações para contato</h3>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row class="">
                <v-col cols="6">
                  <h5>Telefone</h5>
                  <a @click="whatsappLink">{{ telefone }}</a>
                </v-col>
                <v-col cols="6">
                  <h5>Email</h5>
                  <h4>email.professor</h4>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-dialog v-model="showModalTutoriaCancelada" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="closeAndCancel(focus)" color="primary" text v-bind="attrs" v-on="on">
                  <span>Cancelar Tutoria</span>
                </v-btn>
              </template>
              <v-card>
                <v-img class="mx-auto" width="276" src="@/assets/imagens/Usuário_Desativar.svg" />
                <v-card-title class="font-weight-bold headline d-flex justify-center">
                  Tutoria cancelada
                </v-card-title>
                <v-card-text>
                  A tutoria agendada foi cancelada com sucesso, o professor professor.nome irá receber um aviso sobre o
                  cancelamento.
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<style lang="sass">
.v-toolbar__content
     padding: 0
</style>
