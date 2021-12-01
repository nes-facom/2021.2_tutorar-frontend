<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { isTutor } from "@/store/modules/tutor-module"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { updateAgendaTutorService } from "@/api/tutor/update-agenda-tutor"
import {getAgendaTutorService} from "@/api/tutor/get-agenda"
import { AgendaHorarios, HorarioLivre} from "../agenda/agenda"
import { diasUteisSemana } from "@/components/forms/FormHorariosLivresDia.vue"
import { cloneDeep } from "lodash"
import { removeMongoAttrsFromDocument } from "@/utils"



const createAgendaVazia = (): AgendaHorarios => ({
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: []
})

@Component({
  name: "horarios"
})
export default class Horarios extends Vue {
  authModule = getModule(Auth, this.$store)
  
  diasSemana = [
    { nome: "Segunda", value: "segunda" },
    { nome: "Terça", value: "terca" },
    { nome: "Quarta", value: "quarta" },
    { nome: "Quinta", value: "quinta" },
    { nome: "Sexta", value: "sexta" }
  ]

  horas = [
      { text: "07:00 - 08:00" },
      { text: "08:00 - 09:00" },
      { text: "09:00 - 10:00" },
      { text: "10:00 - 11:00" },
      { text: "11:00 - 12:00" },
      { text: "12:00 - 13:00" },
      { text: "13:00 - 14:00" },
      { text: "14:00 - 15:00" },
      { text: "15:00 - 16:00" },
      { text: "16:00 - 17:00" },
      { text: "17:00 - 18:00" },
      { text: "18:00 - 19:00" },
      { text: "19:00 - 20:00" },
      { text: "20:00 - 21:00" },
      { text: "21:00 - 22:00" },
      { text: "22:00 - 23:00" },
    ]

  /*
   * Dado a agenda do tutor (array de horarios) buscamos na lista total
   * de horarios possiveis, definidos pelo array horas e retornamos apenas  
   * um array contendo os indices de ocorrencia das horas do tutor
   * no array de horas total, ou seja, retorna a intersecção.
  */
  encontraInterseccao() {
      const result = this.horas.map((a, index) => {
        if (this.agendaTutorDia.some(b => {
              return a.text === b.text
            }))
          return index
        })

    // esse array prove a lista de intercecção
    const filteredResult = result.filter(item => item !== undefined);
    this.intersec = filteredResult
  }

  // pega a agenda do tutor do banco de dados e salva em uma variavel
  async getAgenda() {
    const tutor = this.authModule.user
    if (!isTutor(tutor)) return

    await getAgendaTutorService(tutor._id).then((res) => {
      this.agendaTutorBD = res

      // remove os campos _id para obter um objeto formatado, pronto para request
      this.agendaFormatadaParaRequest = cloneDeep(this.agendaTutorBD)
      Object.keys(this.agendaFormatadaParaRequest).map(_dia => {
        const dia = _dia as keyof AgendaHorarios
        this.agendaFormatadaParaRequest[dia].forEach((item) => removeMongoAttrsFromDocument(item))
      })
    })
  }
  
  // Cópia da agenda, para não alterar diretamente
  agendaFormatadaParaRequest: AgendaHorarios = createAgendaVazia()   
  
  /*
   * Dia da semana que o tutor esta setando os horários livres, por padrão, quando
   * carregamos a página esse dia é a segunda.
  */
  diaSelecionado = "segunda"

  /*
   * Como por padrão o dia quando a página carrega é segunda, seleciona
   * o primeiro v-chip das horas, o qual representa a segunda feira
   * isso garante que não iremos enviar o dia vazio na requisição
  */
  preselectday = 0

  /*
   * array que define os itens que possuem intersecção entre todos os horarios
   * e os horarios ja escolhidos pelo tutor
  */
  intersec: any[] = []

  agendaTutorBD!: AgendaHorarios

  agendaTutorDia: any[] = []


  addHorario(data: string) {
    const inicioData = data.split('-')[0].trim()
    const fimData = data.split('-')[1].trim()
    if (this.diaSelecionado){
      (this.agendaFormatadaParaRequest as any)[this.diaSelecionado].push({ inicio: inicioData, fim: fimData })
    }
  }

  removeHorario(data: string) {
    const inicioData = data.split('-')[0].trim()
    const fimData = data.split('-')[1].trim()
    if(this.diaSelecionado){
    (this.agendaFormatadaParaRequest as any)[this.diaSelecionado] = (this.agendaFormatadaParaRequest as any)[this.diaSelecionado].filter((item: any) => {
      if (item.inicio !== inicioData && item.fim !== fimData){ return true }
    })}
  }

  isSelected(index: number) {
    this.intersec.indexOf(index) === -1
    return this.intersec.indexOf(index) !== -1
  }

  // carrega apenas os dados do dia
  carregaHorariosDoDia(dia: string) {
    // formata a agenda de um dia especifo para que ela possa ser exibida nos chips
    this.agendaTutorDia = (this.agendaTutorBD as any)[dia].map((item: any) => {
      return { "text": `${item.inicio} - ${item.fim}` }
    })
    this.encontraInterseccao()
    this.diaSelecionado = dia
  }

  // envia o request a api salvando os novos horarios
  salvaConfiguracao() {
    const tutor = this.authModule.user
    if (!isTutor(tutor)) return

    updateAgendaTutorService(tutor._id, this.agendaFormatadaParaRequest).then(novaAgenda => {
      // sinaliza os novos horários pra agenda
      this.$emit("horarios-atualizados", novaAgenda)

      const user = this.authModule.user
      if (!isTutor(user)) return

      // Não altera o usuario diretamente, chama uma mutation
      const userCopy = cloneDeep(user)
      userCopy.agenda = novaAgenda

      this.authModule.AUTH_UPDATE({ user: userCopy })

      // Sinaliza pro componente pai fechar o modal
      this.$emit("input", false)
    
      this.$toasted.success("Horarios atualizados", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000
        })
        this.getAgenda()
    }).catch( () => {
      this.$toasted.error("Um comportamento inesperado aconteceu, tente novamente.", {
          theme: "toasted-primary",
          position: "top-left",
          duration: 3000
        })
    }) 
  }

  mounted() {
    this.getAgenda().then(() => this.carregaHorariosDoDia('segunda'))
  }

}
</script>

<template>
  <div>
    <p>Dias</p>
    <v-chip-group v-model='preselectday' mandatory column active-class="primary--text">
      <v-chip v-for="(dia, index) in diasSemana" :key="index" class="main__chips-diasSemanas"
          @click="carregaHorariosDoDia(dia.value)"
      outlined>
        {{ dia.nome }}
      </v-chip>
    </v-chip-group>
    
    <p>Horários</p>
    <v-chip-group v-model="intersec" multiple column active-class="primary--text">

      <v-chip v-for="(hora, index) in horas" :key="index" class="ma-2"
                active
                outlined
               filter
               @click="isSelected(index) ? removeHorario(hora.text) : addHorario(hora.text)">
        {{ hora.text }}
      </v-chip>
      </v-chip-group>
    <div class="btnSalvar">
      <v-btn class="ma-2 btnTextWhite" @click="salvaConfiguracao()" color="#106CE5"> Salvar </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main__chips {
  width: 110px;
  text-align: center;
}
.btnTextWhite {
  color: white !important;
}
.btnSalvar {
  display: flex;
  justify-content: end;
  margin-right: 50px;
}
</style> 