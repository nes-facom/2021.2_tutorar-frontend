<script>
export default {
  name: "DialogAgenda",
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
      { dia: "Domingo", diaExt: "Domingo", diaPeq: "Dom" },
      { dia: "Segunda", diaExt: "Segunda-Feira", diaPeq: "Seg" },
      { dia: "Terça", diaExt: "Terça-Feira", diaPeq: "Ter" },
      { dia: "Quarta", diaExt: "Quarta-Feira", diaPeq: "Qua" },
      { dia: "Quinta", diaExt: "Quinta-Feira", diaPeq: "Qui" },
      { dia: "Sexta", diaExt: "Sexta-Feira", diaPeq: "Sex" },
      { dia: "Sábado", diaExt: "Sábado", diaPeq: "Sab" }
    ],

    primHorario: null,

    segHorario: null,

    diaTodo: null
  }),

  mounted() {
    this.$refs.calendar.checkChange()
    const date = new Date()
    const date2 = new Date()
    date2.setDate(date.getDate() + 31)
    this.setEvent("Vinicius", date, date2, "blue", false)
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
    }
  }
}
</script>

<template>
  <v-dialog v-model="dialogAgenda" width="591">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">Configurar Agenda</v-btn>
    </template>

    <v-card>
      <v-card-title class="font-weight-bold headline d-flex justify-center">
        Configurar disponibilidade de horário
      </v-card-title>

      <v-card-text align="center">
        Selecione os dias da semana em que você tem disponibilidade de horário para atender como tutor na plataforma
        Tutorar
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-text align="center">
        <v-chip-group v-model="selection" active-class="primary accent-4 white--text" column>
          <v-chip v-for="dia in diasSemana" :key="dia.diaExt" :value="dia.diaExt">{{ dia.dia }}</v-chip>
        </v-chip-group>

        <v-divider />

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
            <v-checkbox
              label="O dia todo"
              v-model="diaTodo"
              @change="diaTodo ? ((segHorario = null), (primHorario = null)) : null"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          text
          @click="
            dialogAgenda = false
            selection = null
          "
        >
          Cancelar
        </v-btn>
        <v-btn color="primary" text @click="dialogAgenda = false">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
