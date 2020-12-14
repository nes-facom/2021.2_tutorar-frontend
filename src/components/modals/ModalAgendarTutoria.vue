<script lang="ts">
import { diasUteisSemana } from "../forms/FormHorariosLivresDia.vue"
import { Vue, Component, Prop, Ref } from "vue-property-decorator"
import { AgendaHorarios } from "@/pages/tutor/agenda/agenda"
import TutorModule from "@/store/modules/tutor-module"
import { getModule } from "vuex-module-decorators"
import { Tutor } from "@/store/modules/auth-types"
import { yyyymmddToddmm } from "@/utils"
import isValidDdMmYyyy from "@/utils/form/is-valid-dd-mm-yyyy"
import TutoriaModule from "@/store/modules/tutoria-module"
import Auth from "@/store/modules/auth"
import { VForm } from "@/typings/vuetify"

export type diasSemana = diasUteisSemana | "sabado" | "domingo"

@Component({
  name: "ModalAgendarTutoria"
})
export default class ModalAgendarTutoria extends Vue {
  @Prop({ required: true })
  value!: boolean

  @Prop({ required: true, type: Object })
  tutor!: Tutor

  tutoriaModule = getModule(TutoriaModule, this.$store)
  tutorModule = getModule(TutorModule, this.$store)
  authModule = getModule(Auth, this.$store)

  canSubmitTutoria = false

  tutoriaSolicitada = false

  ferramentaTutoria: string | null = null

  isExibindoCalendarioSelecaoDia = false

  // dados tutoria
  dataTutoria = ""
  horaFimTutoria = ""
  horaInicioTutoria = ""
  mensagemPedido = ""

  rules = {
    dataTutoria: [(v?: string) => !!v || "Campo Obrigatório", (v?: string) => !!v && isValidDdMmYyyy(v)],
    campoObrigatorio: [(v?: string) => !!v || "Campo Obrigatório"]
  }

  get errorsHorario(): string[] {
    if (!this.horaInicioTutoria && !this.horaFimTutoria) return []

    if (!this.horaInicioTutoria || !this.horaFimTutoria) return ["Informe o horário de início e fim"]

    const fimNumber = Number(this.horaFimTutoria.replace(/\D/g, ""))
    const iniNumber = Number(this.horaInicioTutoria.replace(/\D/g, ""))

    // Se ambos existem verifico se o horario de fim é maior que o de inicio
    return iniNumber < fimNumber ? [] : ["Horário de início deve ser anterior ao horário de termino"]
  }

  /**
   * Os dias da semana que podem ser selecionados tutorias, ou seja, os dias
   * da semana que o tutor tem ao menos um horario livre
   */
  get diasSemanaPermitidos(): string[] {
    const agenda = this.tutor.agenda
    if (!agenda) return []

    return Object.keys(agenda).filter(d => {
      const dia = d as keyof AgendaHorarios
      return dia && agenda[dia].length > 0
    })
  }

  get dataTutoriaFormatada() {
    return yyyymmddToddmm(this.dataTutoria)
  }

  /**
   * As ferramentas (habilidades) do tutor
   */
  get ferramentas() {
    const ferramentas = this.tutorModule.habilidadesTutor(this.tutor._id)

    //Por conveniencia, quando o tutor só tem uma habilidade a seleciono automaticamente
    if (ferramentas && ferramentas.length === 1) this.ferramentaTutoria = ferramentas[0]._id
    return ferramentas
  }

  /**
   * Retorna o dia da semana de uma data no formato yyyy-mm-dd
   */
  getDiaSemana(data: string): diasSemana {
    const dateArr = data.split("-").map(x => Number(x))
    const ano = dateArr[0]
    const mes = dateArr[1] - 1 // mes é 0 indexed
    const dia = dateArr[2]

    // Construo data com ano, mes, dia porque JS é um lixo e pode errar o dia ao parsear string
    const diaSemana = new Date(ano, mes, dia).getDay()

    const dias: diasSemana[] = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"]
    return dias[diaSemana]
  }

  /**
   * Função para validar dias permitidos para seleção da tutoria
   */
  filterDiasCalendario(data: string) {
    // mano foda-se, se o tutor não informou nada na agenda libera ae
    if (this.diasSemanaPermitidos.length === 0) return true

    const diaSemana = this.getDiaSemana(data)
    return this.diasSemanaPermitidos.indexOf(diaSemana) !== -1
  }

  /**
   * envia o pedido a api
   */
  solicitarTutoria() {
    if (!this.authModule.user) return

    this.tutoriaModule
      .solicitarTutoria({
        tutorId: this.tutor._id,
        professorId: this.authModule.user?._id,
        tutoringDate: this.dataTutoria,
        tutoringHour: this.horaInicioTutoria,
        requestMessage: this.mensagemPedido
      })
      .then(() => {
        this.$toasted.success("Solicitação registrada", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 5000
        })

        this.$emit("input", false)
      })
  }
}
</script>

<template>
  <v-dialog :value="value" width="500" persistent>
    <v-card>
      <template v-if="!tutoriaSolicitada">
        <v-form ref="form" v-model="canSubmitTutoria">
          <v-card-title class="mb-2 px-6 grey--text text--darken-1">Agendar Tutoria</v-card-title>

          <template v-if="ferramentas.length > 0">
            <v-card-text class="pb-0 px-6">Ferramenta a utilizar</v-card-text>
            <v-select
              class="px-6 pt-1"
              v-model="ferramentaTutoria"
              :items="ferramentas"
              item-text="nome"
              item-value="_id"
            />
          </template>

          <div class="px-6 d-flex">
            <v-menu v-model="isExibindoCalendarioSelecaoDia" transition="scale-transition" min-width="290px" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="dataTutoriaFormatada"
                  :rules="rules.dataTutoria"
                  prepend-inner-icon="mdi-calendar"
                  class="mr-6"
                  label="Dia"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="dataTutoria"
                locale="pt-BR"
                :allowed-dates="filterDiasCalendario"
                @input="menu = false"
              />
            </v-menu>

            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="horaInicioTutoria"
                  :error-messages="errorsHorario"
                  class="mr-6"
                  label="Inicio"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-time-picker format="24hr" v-model="horaInicioTutoria" />
            </v-menu>

            <!-- 
            HORA FIM
            -->
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="horaFimTutoria" label="Fim" readonly v-bind="attrs" v-on="on" />
              </template>
              <v-time-picker format="24hr" v-model="horaFimTutoria" />
            </v-menu>
          </div>
          <v-textarea
            v-model="mensagemPedido"
            class="ma-6"
            rows="2"
            counter="500"
            placeholder="Caso deseje enviar uma mensagem com o pedido digite aqui!"
          >
          </v-textarea>

          <v-divider class="mt-4" />

          <v-card-actions class="pa-3">
            <v-spacer />
            <v-btn class="mr-4" color="red" text @click="$emit('input', false)">Cancelar</v-btn>
            <v-btn :disabled="!canSubmitTutoria" color="green" class="white--text" @click="solicitarTutoria">
              Confirmar agendamento
            </v-btn>
          </v-card-actions>
        </v-form>
      </template>

      <!-- IF solicitando tutoria -->
      <template v-else>
        <v-img class="mx-auto" width="276" src="@/assets/imagens/Tutoria_Cancelada.svg" />
        <v-card-title class="font-weight-bold headline d-flex justify-center">Tutoria solicitada</v-card-title>
        <v-card-text class="text-center">
          Aguarde que em breve o tutor irá analisar a solicitação e entrará em contato
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>
