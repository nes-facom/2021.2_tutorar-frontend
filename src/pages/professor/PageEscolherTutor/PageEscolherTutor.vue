<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"

const CardResumoTutor = () => import("@/pages/professor/PageEscolherTutor/CardResumoTutor.vue")

@Component({
  name: "PageEscolherTutor",
  components: { CardResumoTutor }
})
export default class PageHome extends Vue {
  authModule = getModule(Auth, this.$store)

  data = ""
  showMenuCalendario = false

  tutores = [
    { nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor" },
    { nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor" },
    { nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor" },
    { nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor" },
    { nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor" },
    { nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor" }
  ]

  get dataFormatada() {
    if (!this.data) return ""
    const d = this.data.split("-")
    return `${d[2]}/${d[1]}/${d[0].substring(2)}`
  }

  irPerfilTutor(tutor: never) {
    //TODO Colocar Pagina do tutor selecionado
    this.$router.push({ path: "/tutor/perfil" })
    console.log(tutor)
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
            />
          </v-col>

          <v-col cols="3">
            <v-menu
              ref="menu"
              v-model="showMenuCalendario"
              :close-on-content-click="false"
              :return-value.sync="data"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dataFormatada"
                  v-bind="attrs"
                  v-on="on"
                  label="Qual dia?"
                  append-icon="mdi-calendar"
                  outlined
                  readonly
                  hide-details
                />
              </template>
              <v-date-picker v-model="data" no-title scrollable locale="pt-BR">
                <v-spacer />
                <v-btn text color="primary" @click="showMenuCalendario = false">Fechar</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(data)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row align="center" class="mt-4">
          <v-col v-for="(tutor, index) in tutores" :key="index" cols="12" sm="6" md="4" class="mb-4">
            <CardResumoTutor class="mx-2" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
