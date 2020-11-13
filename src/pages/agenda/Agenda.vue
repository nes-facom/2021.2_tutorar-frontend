<template>
  <v-row class="fill-height">
    <v-col cols="12" align="right">
      <v-dialog v-model="dialogAgenda" width="591">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">Configurar Agenda</v-btn>
        </template>
        <v-card>
          <v-card-title class="font-weight-bold headline d-flex justify-center">
            Configurar disponibilidade de horário
          </v-card-title>
          <v-card-text align="center">
            Selecione os dias da semana em que você tem disponibilidade de horário para atender como tutor na plataforma Tutorar
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text align="center">
            <v-chip-group v-model="selection" active-class="primary accent-4 white--text" column>
              <v-chip v-for="dia in diasSemana" :key="dia.diaExt" :value="dia.diaExt">{{ dia.dia }}</v-chip>
            </v-chip-group>

            <v-divider></v-divider>

            <v-row v-if="selection">
              <v-col cols="4">
                <v-text-field disabled readonly v-model="selection" prepend-icon="mdi-calendar"> </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="primMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="primHorario"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="diaTodo"
                      v-model="primHorario"
                      label="Inicio"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-model="primHorario"
                    @click:minute="$refs.primMenu.save(primHorario)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="segMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="segHorario"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="diaTodo"
                      v-model="segHorario"
                      label="Fim"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-model="segHorario"
                    @click:minute="$refs.segMenu.save(segHorario)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nome para seu horário"
                  placeholder="Escreva aqui"
                  outlined
                  v-model="nomeEvento"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  class="my-0"
                  label="O dia todo"
                  v-model="diaTodo"
                  @change="diaTodo ? ((segHorario = null), (primHorario = null)) : null"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="limpaCampos()">
              Cancelar
            </v-btn>
            <v-btn color="primary" text @click="salvaElimpaCampos()">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoje
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semanal</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mensal</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
//TODO: Arrumar Código Agenda.
export default {
  name: "Agenda.vue",
  data: () => ({
    dialogAgenda: false,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mensal",
      week: "Semanal",
      day: "Dia"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    selection: "",
    events: [],

    diasSemana: [
      { dia: "Domingo", diaExt: "Domingo", diaPeq: "Dom", num: 0 },
      { dia: "Segunda", diaExt: "Segunda-Feira", diaPeq: "Seg", num: 1 },
      { dia: "Terça", diaExt: "Terça-Feira", diaPeq: "Ter", num: 2 },
      { dia: "Quarta", diaExt: "Quarta-Feira", diaPeq: "Qua", num: 3 },
      { dia: "Quinta", diaExt: "Quinta-Feira", diaPeq: "Qui", num: 4 },
      { dia: "Sexta", diaExt: "Sexta-Feira", diaPeq: "Sex", num: 5 },
      { dia: "Sábado", diaExt: "Sábado", diaPeq: "Sab", num: 6 }
    ],
    primHorario: null,
    segHorario: null,
    diaTodo: null,
    nomeEvento: null
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = "day"
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ""
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
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
    },
    setEvent(nome, inicio, fim, cor, diaTodo) {
      this.events.push({
        name: nome,
        color: cor,
        timed: !diaTodo,
        start: inicio,
        end: fim
      })
    },
    limpaCampos() {
      this.dialogAgenda = false
      this.selection = null
      this.diaTodo = null
      this.primHorario = null
      this.segHorario = null
      this.nomeEvento = null
    },
    salvaElimpaCampos() {
      if (this.selection) {
        this.setEvent(this.nomeEvento, new Date(), new Date(), "blue", this.diaTodo)
      }
      this.dialogAgenda = false
      this.selection = null
      this.diaTodo = null
      this.primHorario = null
      this.segHorario = null
      this.nomeEvento = null
    }

    // updateRange ({ start, end }) {
    //   const events = []
    //
    //   const min = new Date(`${start.date}T00:00:00`)
    //   const max = new Date(`${end.date}T23:59:59`)
    //   const days = (max.getTime() - min.getTime()) / 86400000
    //   const eventCount = this.rnd(days, days + 20)
    //
    //     const allDay = this.rnd(0, 3) === 0
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
    //     const second = new Date(first.getTime() + secondTimestamp)
    //
    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay,
    //     })
    //   this.events = events
    // },
    // rnd (a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a
    // },
  }
}
</script>

<style scoped></style>
