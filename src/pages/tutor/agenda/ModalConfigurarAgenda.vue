<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { diasSemana } from "@/components/forms/FormHorariosLivresDia.vue"
import { AgendaHorarios } from "./agenda"

const FormHorariosLivresDia = () => import("@/components/forms/FormHorariosLivresDia.vue")

// Ver necessidade
// const defaultFormValueFactory = (): AgendaHorarios => ({
//   segunda: [],
//   terca: [],
//   quarta: [],
//   quinta: [],
//   sexta: []
// })

@Component({
  name: "ModalConfigurarAgenda",
  components: { FormHorariosLivresDia }
})
export default class ModalConfigurarAgenda extends Vue {
  @Prop({ required: true })
  value!: boolean

  /**
   * Os horários livres do tutor
   */
  @Prop({ type: Object, required: true })
  horariosTutor!: AgendaHorarios

  /**
   * Cria os horários livres do tutor, só que com horarios vazios para cada dia
   * que ele não tem um horário livre
   */
  get horarios() {
    const copiaHorarios = { ...this.horariosTutor }
    Object.keys(this.horariosTutor).map(dia => {
      // @TODO Maldito TS, refatorar
      const casted = dia as keyof AgendaHorarios
      const horariosDia = this.horariosTutor[casted]
      if (horariosDia.length === 0) copiaHorarios[casted].push({ inicio: "", fim: "" })
    })
    return copiaHorarios
  }

  /**
   * Dia da semana que o tutor esta setando os horários livres
   */
  diaSelecionado: diasSemana = "segunda"

  diasSemana = [
    { nome: "Segunda", value: "segunda" },
    { nome: "Terça", value: "terca" },
    { nome: "Quarta", value: "quarta" },
    { nome: "Quinta", value: "quinta" },
    { nome: "Sexta", value: "sexta" }
  ]

  addHorario() {
    this.horariosTutor[this.diaSelecionado].push({ inicio: "", fim: "" })
  }

  removeHorario(index: number) {
    this.horariosTutor[this.diaSelecionado].splice(index, 1)
  }

  cancelaConfiguracao() {
    // @TODO reverter para o valor antigo
    // Sinalizo para o componente pai fechar o modal
    this.$emit("input", false)
  }

  salvaConfiguracao() {
    // @TODO fazer a chamada de atualizar agenda aqui a API aqui,
    // Se tiver sucesso então da um emit pra fechar o modal e seta o que precisar setar
  }
}
</script>

<template>
  <v-dialog :value="value" width="550" persistent>
    <v-card>
      <v-card-title class="font-weight-bold headline d-flex justify-center">
        Configurar disponibilidade de horário
      </v-card-title>

      <v-card-subtitle align="center" class="mt-1">
        Selecione os dias da semana em que você tem disponibilidade de horário para atender como tutor.
      </v-card-subtitle>

      <div class="px-6 pb-4">
        <v-chip-group v-model="diaSelecionado" active-class="primary white--text" mandatory>
          <v-chip v-for="(dia, i) in diasSemana" :key="i" :value="dia.value" v-text="dia.nome" />
        </v-chip-group>

        <FormHorariosLivresDia
          v-model="horarios[diaSelecionado]"
          :dia="diaSelecionado"
          @horario-removido="removeHorario"
          @horario-adicionado="addHorario"
        />
      </div>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text @click="cancelaConfiguracao">Cancelar</v-btn>
        <v-btn color="green" text @click="salvaConfiguracao">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
