<script lang="ts">
import { createAgendaVazia } from "../agenda/ModalConfigurarHorarios.vue"
import { Vue, Component, Prop } from "vue-property-decorator"
import { AgendaHorarios, HorarioLivre } from "../agenda/agenda"
import { cloneDeep } from "lodash"

interface AgendaFormatada extends AgendaHorarios {
  nomeDia: string
}

@Component({
  name: "ListaExibicaoHorarios"
})
export default class ListaExibicaoHorarios extends Vue {
  @Prop({ required: false, type: Object, default: createAgendaVazia })
  agenda!: AgendaHorarios

  diasSemana = {
    segunda: "Segunda Feira",
    terca: "Terça Feira",
    quarta: "Quarta Feira",
    quinta: "Quinta feira",
    sexta: "Sexta Feira"
  }

  /**
   * Agenda formatada para exibição, remove os dias que não
   * tem nenhum horario livre
   */
  get AgendaFormatada(): Partial<AgendaHorarios> {
    if (!this.agenda) return {}

    const agenda = cloneDeep<AgendaHorarios>(this.agenda)

    Object.keys(this.diasSemana).map(d => {
      const dia = d as keyof AgendaHorarios
      const horarios = this.agenda[dia]
      if (horarios && horarios.length === 0) agenda[dia] = horarios
    })

    return agenda
  }

  addDots(horario: string) {
    return horario.slice(0, 2) + ":" + horario.slice(2)
  }

  formataHorario(horario: HorarioLivre) {
    return `${this.addDots(horario.inicio)} as ${this.addDots(horario.fim)}`
  }
}
</script>

<template>
  <v-list two-line>
    <template v-for="(nomeDia, i) in diasSemana">
      <!-- 
        Só exibo o dia se a agenda o tem e se ele não é um array vazio
       -->
      <v-list-item v-if="agenda[i] && agenda[i].length > 0" :key="nomeDia">
        <v-list-item-content>
          <v-list-item-title class="blue--text" v-text="nomeDia" />
          <v-text-field
            v-for="horario in AgendaFormatada[i]"
            :value="formataHorario(horario)"
            :key="horario._id"
            class="input-horario mr-4 elevation-0"
            hide-details
            readonly
            dense
            filled
          />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<style lang="sass" scoped>
.input-horario
  max-width: 135px
</style>
