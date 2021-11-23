<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { Tutor } from "@/store/modules/auth-types"


@Component({
  name: "DisponibilidadeTutor",
  components: {
  }
})
export default class Horarios extends Vue {
  @Prop({ required: true})
  tutorAtual?: Tutor;

  @Prop({ required: true})
  horaEscolhida!: string
  
  @Prop({ required: true})
  dataEscolhida!: string
  
  horariosArr: string [] = []
  
  menu = false

  tutorHorariosByWeekday(day: string) {
    // console.log('tutoratual', tutor)

    if(this.tutorAtual && this.tutorAtual.agenda && day){
      
      if ((this.tutorAtual.agenda as any)[day]) {
      const horariosDayArr = (this.tutorAtual.agenda as any)[day].map((item: any) => {
        return `${item.inicio} - ${item.fim}`
        // console.log("item", item.fim, item.inicio)
      })       
      this.horariosArr = horariosDayArr
      } else {
        this.horariosArr = []
        this.date = ''
      }
    }
  }


  data() {
    return {
      tags: [
        "1100 às 1900",
        "2100 às 2200",
        "2200 às 2300",
        "13h00 às 14h00",
        // "14h00 às 15h00",
        // "15h00 às 16h00",
        // "16h00 às 17h00",
        // "17h00 às 18h00"


      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
    }
  }

  getWeekdayFromDate(dateStr: string){
    let dayweek = ''

    const dateObj = new Date(dateStr)
    const x = dateObj.getDay()
    if (x == 0) dayweek = 'segunda'
    if (x == 1) dayweek = 'terca'
    if (x == 2) dayweek = 'quarta'
    if (x == 3) dayweek = 'quinta'
    if (x == 4) dayweek = 'sexta'
    if (x == 5) dayweek = 'sabado'
    if (x == 6) dayweek = 'domingo'

    console.log('day', dayweek)
    this.tutorHorariosByWeekday(dayweek)

  }

  updateHoraSelected(hora: string) {
      // Emite um evento partindo do child para ser capturado pelo parent
      this.$emit('update-hora-selected', hora)
  }

  updateDateSelected(date: string) {
    // Emite um evento partindo do child para ser capturado pelo parent
    console.log("data", date)
    this.date = date
    this.$emit('update-date-selected', date)
  }

  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)

  mounted() {
    // a principio, load os horarios do dia atual
    this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
    this.getWeekdayFromDate(this.date)
    this.$emit('update-date-selected', this.date)
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
    v-model="menu"
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
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker color="primary" locale="pt-BR" v-model="date" no-title scrollable >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date); getWeekdayFromDate(date); updateDateSelected(date); menu = false"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</div>
    <v-chip-group v-if="this.horariosArr.length > 0" center-active show-arrows active-class="primary--text">
      <v-chip filter v-for="tag in this.horariosArr" :key="tag"
       @click="updateHoraSelected(tag)">
        {{ tag }}
      </v-chip>
    </v-chip-group>
    <p v-else>Infelizmente o tutor não possui horários disponíveis nessa data, por favor, escolha outra data acima.</p>
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