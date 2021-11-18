<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import TutorModule from "@/store/modules/tutor-module"
import { getModule } from "vuex-module-decorators"
import { Tutor } from "@/store/modules/auth-types"
import Auth from "@/store/modules/auth"
import { TUTOR_ROUTES } from "@/router/rotas/tutor"
import HabilidadesModule from "@/store/modules/habilidades-module"
import { lowerCase } from "lodash"

const CardResumoTutor = () => import("@/pages/professor/escolher-tutor/CardResumoTutor.vue")

@Component({
  name: "escolher-tutor",
  components: { CardResumoTutor }
})
export default class PageHome extends Vue {
  authModule = getModule(Auth, this.$store)
  tutorModule = getModule(TutorModule, this.$store)
  habilidadesModule = getModule(HabilidadesModule, this.$store)

  data = ""
  showMenuCalendario = false
  isCarregandoTutores = false

  get dataFormatada() {
    if (!this.data) return ""
    const d = this.data.split("-")
    return `${d[2]}/${d[1]}/${d[0].substring(2)}`
  }

  // criado para iterar
  search = ''
  searchItems: Tutor[] = []

  mounted() {
    this.tutorModule.getAllTutores()

    //this.isCarregandoTutores = true

    this.habilidadesModule.fetchAll({ forceRefetch: false }).finally(() => {
      this.isCarregandoTutores = false
      this.searchItems = this.tutorModule.asArray
    })
  }

  /* 
   * @param searchHabilidade: string

   * Esse método é utilizado para filtrar os tutores de acordo com suas habilidades.
   * O usuário busca a habilidade desejada inserindo uma string na barra de navegação
   * <v-text-field>. Essa string serve como parâmetro para esse método, o qual itera por
   * todos os tutores e, a cada tutor, compara se sua(s) habilidade(s) possui(em) uma substrig
   * que combina com a habilidade buscada pelo usuário. Um array auxiliar é gerado para armazenar
   * todos os tutores filtrados. Por fim o array auxiliar sobrescreve o array responsável por conter
   * os tutores que serão carregados e exiidos pela página.
   
   * Caso a string de busca seja inválida o array responsável pro conter os tutores que serão carregados
   * e exibidos é povoada por todos os tutores existentes, retornados pela api. 
  */
  habilidadesFilter(searchHabilidade: string) {
    const sanitizedSearchString = searchHabilidade.toLowerCase().trimStart().trimEnd()
    
    if(sanitizedSearchString) {
      const searchAuxArray: Tutor[] = []
      this.tutorModule.asArray.forEach((tutor) => {
        const habilidadesTutorAtual = this.tutorModule.habilidadesTutor(tutor._id)
        if(habilidadesTutorAtual.length > 0){
          habilidadesTutorAtual.forEach( (habilidade) => {
            if(habilidade.nome.toLowerCase().includes(sanitizedSearchString)){
              // verifica se ja existe um tutor no array antes de inserir
              // se o index for negativo, logo pode inserir, pois não esse tutor ainda não foi inserido
              const index = searchAuxArray.findIndex(x => x.name==tutor.name)
              if (index === -1) searchAuxArray.push(tutor)
            }
          })
        }
      })
      this.searchItems = searchAuxArray
    } else {
      this.searchItems = this.tutorModule.asArray
    }
  }
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="11" md="9" lg="8" class="pt-2 row justify-center align-center">
        <v-row justify="center" align="center" no-gutters>
          <v-col cols="12" class="display-1 mb-8">
            <h2 class="text-center">
              Procure,
              <span class="green--text">A</span>
              <span class="blue--text">p</span>
              <span class="orange--text">r</span>
              <span class="red--text">e</span>
              <span class="green--text">n</span>
              <span class="blue--text">d</span>
              <span class="orange--text">a</span>
            </h2>
          </v-col>

          <v-col cols="9">
            <v-text-field
              class="mr-4"
              label="O que você quer aprender?"
              append-icon="mdi-book-open-page-variant"
              outlined
              hide-details
              v-model="search"
              @input="habilidadesFilter"
            />
          </v-col>

          <v-col cols="3">
            <v-menu
              v-model="showMenuCalendario"
              :close-on-content-click="false"
              :return-value.sync="data"
              transition="scale-transition"
              min-width="290px"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dataFormatada"
                  v-bind="attrs"
                  v-on="on"
                  label="Qual dia?"
                  append-icon="mdi-calendar"
                  hide-details
                  outlined
                  readonly
                />
              </template>
              <v-date-picker v-model="data" no-title scrollable locale="pt-BR">
                <v-spacer />
                <v-btn text color="primary" @click="showMenuCalendario = false">Fechar</v-btn>
                <v-btn text color="primary">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <template v-if="!isCarregandoTutores">
          <v-row align="center" class="mt-4">
            <v-col v-for="(tutor, index) in searchItems" :key="index" cols="12" sm="6" md="4" class="mb-4">
              <CardResumoTutor class="mx-2" :tutor="tutor" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-col cols="12" sm="11" md="9" lg="8" class="pt-2 row justify-center align-center">
            <v-progress-linear color="deep-purple accent-4" class="mt-12" indeterminate rounded height="6" />
          </v-col>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
