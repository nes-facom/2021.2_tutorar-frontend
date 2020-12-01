<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { HorarioLivre } from "@/pages/tutor/agenda/agenda"

export type diasSemana = "segunda" | "terca" | "quarta" | "quinta" | "sexta"

@Component({ name: "FormHorariosLivresDia" })
export default class FormHorariosLivresDia extends Vue {
  @Prop({ type: Array, required: true })
  value!: HorarioLivre[]

  /**
   * @TODO transformar em computed pra reagir com o input do fim
   * Cria uma função para validar o horário de início com base no indíce
   */
  createInicioValidationFunction(index: number) {
    return (horarioInicio?: string) => {
      const { fim: horarioFim } = this.value[index]

      // Se não tem horario de início e de fim então não valide
      if (!horarioFim && !horarioInicio) return true

      if (horarioInicio && horarioFim) {
        const fimNumber = Number(horarioFim.replace(/\D/g, ""))
        const iniNumber = Number(horarioInicio.replace(/\D/g, ""))

        // Se ambos existem verifico se o horario de fim é maior que o de inicio
        return iniNumber < fimNumber || "Horário de início deve ser anterior ao horário de termino"
      }

      // Se falta um dos dois então é inválido
      return false
    }
  }

  /**
   * Os horários formatados para o vuetify funcionar corretamente,
   * se não há nem um horário, cria um vazio para ter o formulário
   */
  get horariosFormatados(): HorarioLivre[] {
    return this.value.map(horario => ({
      inicio: this.formataHorario(horario.inicio),
      fim: this.formataHorario(horario.fim)
    }))
  }

  /**
   * Basicamente adiciona os ":"
   * ex: 1530 -> 15:30
   */
  formataHorario(horario?: string | null): string {
    if (!horario) return ""
    return `${horario.substring(0, 2)}:${horario.substring(2)}`
  }

  /**
   * Devido a um caveat da reatividade, não consigo usar
   * v-model do time-picker com propriedades de um objeto,
   * por isso tenho esses setters manuais
   */
  setHorarioInicio(horario: string, index: number) {
    this.value[index].inicio = horario.replace(/\D/g, "")
  }

  setHorarioFim(horario: string, index: number) {
    this.value[index].fim = horario.replace(/\D/g, "")
  }
}
</script>

<template>
  <div>
    <v-row v-for="(horario, i) in horariosFormatados" :key="i">
      <v-col cols="4">
        <v-menu :close-on-content-click="false" transition="scale-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="horario.inicio"
              :rules="[createInicioValidationFunction(i)]"
              v-bind="attrs"
              v-on="on"
              label="Inicio"
              readonly
            />
          </template>
          <v-time-picker :value="horario.inicio" @change="setHorarioInicio($event, i)" format="24hr" />
        </v-menu>
      </v-col>

      <v-col cols="4">
        <v-menu :close-on-content-click="false" transition="scale-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="horario.fim" v-bind="attrs" v-on="on" label="Fim" readonly />
          </template>
          <v-time-picker :value="horario.fim" @change="setHorarioFim($event, i)" format="24hr" />
        </v-menu>
      </v-col>

      <v-col cols="4">
        <v-card-title class="px-0 pb-3">
          <v-btn class="ml-4" color="green" @click="$emit('horario-adicionado')" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn v-if="value.length > 1" class="ml-4" color="red" @click="$emit('horario-removido', i)" icon>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-card-title>
      </v-col>
    </v-row>
  </div>
</template>
