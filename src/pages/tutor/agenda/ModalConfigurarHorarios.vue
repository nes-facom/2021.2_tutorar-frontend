<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { diasSemana } from "@/components/forms/FormHorariosLivresDia.vue"
import { AgendaHorarios } from "./agenda"
import { cloneDeep } from "lodash"
import updateAgendaService from "@/api/tutor/update-agenda-tutor"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"

const FormHorariosLivresDia = () => import("@/components/forms/FormHorariosLivresDia.vue")

// Ver necessidade
const defaultFormValueFactory = (): AgendaHorarios => ({
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: []
})

@Component({
  name: "ModalConfigurarHorarios",
  components: { FormHorariosLivresDia }
})
export default class ModalConfigurarHorarios extends Vue {
  authModule = getModule(Auth, this.$store)

  @Prop({ required: true })
  value!: boolean

  /**
   * Os horários livres do tutor
   */
  @Prop({ type: Object, required: true })
  horariosTutor!: AgendaHorarios

  /**
   * Cópia dos horários, para não alterar-los diretamente
   */
  copiaHorarios: AgendaHorarios = defaultFormValueFactory()

  /**
   * Dia da semana que o tutor esta setando os horários livres
   */
  diaSelecionado: diasSemana = "segunda"

  /**
   * Indica se o formulário é valido e a cfg pode ser salva
   */
  canSalvarConfiguracao = true

  diasSemana = [
    { nome: "Segunda", value: "segunda" },
    { nome: "Terça", value: "terca" },
    { nome: "Quarta", value: "quarta" },
    { nome: "Quinta", value: "quinta" },
    { nome: "Sexta", value: "sexta" }
  ]

  addHorario() {
    this.copiaHorarios[this.diaSelecionado].push({ inicio: "", fim: "" })
  }

  removeHorario(index: number) {
    this.copiaHorarios[this.diaSelecionado].splice(index, 1)
  }

  /**
   * Percorre os dias da agenda e remove todos os horários vazios
   * dos dias
   */
  removeHorariosVazios(horarios: AgendaHorarios): AgendaHorarios {
    const copiaHorarios = cloneDeep(horarios)
    Object.keys(copiaHorarios).map(_dia => {
      const dia = _dia as keyof AgendaHorarios
      // Filtro os horarios sem inicio ou fim
      copiaHorarios[dia] = copiaHorarios[dia].filter(horario => horario.inicio && horario.fim)
    })
    return copiaHorarios
  }

  cancelaConfiguracao() {
    this.resetaHorarios()
    this.$emit("input", false)
  }

  salvaConfiguracao() {
    const idTutor = this.authModule.user?._id
    if (!idTutor) return
    const agendaFormatada = this.removeHorariosVazios(this.copiaHorarios)

    updateAgendaService(idTutor, agendaFormatada).then(novosHorarios => {
      console.log(novosHorarios)
      this.$emit("horarios-atualizados", novosHorarios)
    })
  }

  resetaHorarios() {
    this.copiaHorarios = cloneDeep(this.horariosTutor)
    Object.keys(this.copiaHorarios).map(_dia => {
      const dia = _dia as keyof AgendaHorarios
      const horariosDia = this.copiaHorarios[dia]
      if (horariosDia.length === 0) horariosDia.push({ inicio: "", fim: "" })
      this.copiaHorarios[dia] = horariosDia
    })
  }

  mounted() {
    this.resetaHorarios()
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
        {{ canSalvarConfiguracao }}
        <v-form v-model="canSalvarConfiguracao">
          <v-chip-group v-model="diaSelecionado" active-class="primary white--text" mandatory>
            <v-chip v-for="(dia, i) in diasSemana" :key="i" :value="dia.value" v-text="dia.nome" />
          </v-chip-group>

          <!-- 
            Esse loop é necessário para criar todos os formulários, se eu criasse apenas 
            o do dia selecionado não consigo validar se um usuário tem um horário inválido
            fora do dia que selecionou
          -->
          <template v-for="dia in diasSemana">
            <FormHorariosLivresDia
              v-model="copiaHorarios[dia.value]"
              v-show="diaSelecionado === dia.value"
              :dia="diaSelecionado"
              :key="dia.nome"
              @horario-removido="removeHorario"
              @horario-adicionado="addHorario"
            />
          </template>
        </v-form>
      </div>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" @click="cancelaConfiguracao" text>Cancelar</v-btn>
        <v-btn color="green" @click="salvaConfiguracao" :disabled="!canSalvarConfiguracao" text>Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
