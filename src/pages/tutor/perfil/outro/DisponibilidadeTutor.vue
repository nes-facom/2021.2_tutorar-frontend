<script>
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "DisponibilidadeTutor",
  components: {
  }
})
export default class Horarios extends Vue {
  data() {
    return {
      tags: [
        "10h00 às 11h00",
        "11h00 às 12h00",
        "12h00 às 13h00",
        "13h00 às 14h00",
        "14h00 às 15h00",
        "15h00 às 16h00",
        "1600 às 17h00",
        "17h00 às 18h00"
      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
    }
  }
}
</script>


<template>
  <div class="tools">
    <div class="iconAndTitle">
      <div class="icon">
        <v-icon> mdi-clock</v-icon>
      </div>
      Disponibilidade
    </div>
    
<div class="datePicker">
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Selecione a data desejada:"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</div>
    <v-chip-group active-class="primary--text" show-arrows>
      <v-chip v-for="tag in tags" :key="tag">
        {{ tag }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<style lang = "scss" >
.icon {
  margin-right: 8px;
}
.iconAndTitle {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
}
.tools {
  display: flex;
  padding-top: 32px;
  padding-bottom: 32px;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
}
.chip {
  color: white !important;
  background-color: aqua !important;
}
.datePicker {
  max-width: fit-content;
  padding-left: 20px;
  padding-top: 24px;
}
.dateWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 24px;
}
</style>