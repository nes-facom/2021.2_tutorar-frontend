<script lang="ts">
import { VCalendar } from "@/typings/vuetify"
import { CalendarDaySlotScope, CalendarEvent } from "vuetify"
import { Vue, Component, Ref } from "vue-property-decorator"
import { AgendaHorarios } from "./agenda"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { Tutor } from "@/store/modules/auth-types"
import { affirmIsTutorAndReturn, isTutor } from "@/store/modules/tutor-module"

const InputTipoExibicaoCalendario = () => import("@/components/inputs/InputTipoExibicaoCalendario.vue")
const ModalConfigurarHorarios = () => import("@/pages/tutor/agenda/ModalConfigurarHorarios.vue")
const CardPedidoTutoria = () => import("@/components/cards/CardPedidoTutoria.vue")

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

  viewDay({ date }: CalendarDaySlotScope) {
    this.calendarTimeFrame = date
    this.tipoExibicaoCalendario = "day"
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
  setEvent(nome: any, inicio: any, fim: any, cor: any, diaTodo: any) {
    this.events.push({
      name: nome,
      color: cor,
      timed: !diaTodo,
      start: inicio,
      end: fim
    })
  }

  closeAndCancel(calendarTimeFrame: any) {
    setTimeout(() => {
      this.exibirMenuEventoSelecionado = false
      this.events.splice(calendarTimeFrame, 1)
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
        <!-- TODO, passar o pedido de tutoria pra ca -->
        <CardPedidoTutoria />
      </v-menu>
    </v-sheet>
  </div>
</template>

<style lang="sass">
.v-toolbar__content
     padding: 0
</style>
