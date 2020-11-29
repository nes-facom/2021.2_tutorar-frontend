<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({ name: "InputTipoExibicaoCalendario" })
export default class InputTipoExibicaoCalendario extends Vue {
  @Prop({ required: true, type: String })
  value: "month" | "week" | "day" = "month"

  calendarTypesLabels = { month: "Mensal", week: "Semanal", day: "Dia" }
}
</script>

<template>
  <v-menu bottom right>
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
        <span v-text="calendarTypesLabels[value]" />
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="$emit('input', 'day')">Dia</v-list-item>
      <v-list-item @click="$emit('input', 'week')">Semanal</v-list-item>
      <v-list-item @click="$emit('input', 'month')">Mensal</v-list-item>
    </v-list>
  </v-menu>
</template>
