<script lang="ts">
import Auth from "@/store/modules/auth"
import { Vue, Component, Prop } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

const ModalAceitarTutoria = () => import("@/components/modals/ModalAceitarTutoria.vue")

@Component({
  name: "SolicitacoesTutoria",
  components: { ModalAceitarTutoria }
})
export default class SolicitacoesTutoria extends Vue {
  authModule = getModule(Auth, this.$store)

  showModalAceitarTutoria = false

  headers = [
    {
      text: "Avatar",
      value: "avatar",
      align: "start"
    },
    {
      text: "Nome",
      value: "nome"
    },
    {
      text: "Data",
      value: "data"
    },
    {
      text: "Horário",
      value: "horario"
    },
    {
      text: "Ação",
      value: "acao"
    }
  ]

  solicitacoes = [{ nome: "Leonarda Kauan Pereira", data: "07 de setembro de 2020", horario: "07:00 pm" }]

  escolherTutoria(tutoria: any) {
    console.log(tutoria)
    this.showModalAceitarTutoria = true
  }

  recusarTutoria() {
    this.showModalAceitarTutoria = false
  }

  aceitarTutoria() {
    console.log("wew !")
  }
}
</script>

<template>
  <v-row no-gutters class="mt-6">
    <v-col cols="12">
      <v-data-table :headers="headers" :items="solicitacoes" hide-default-footer>
        <template #item.avatar>
          <v-avatar size="36px">
            <v-img src="@/assets/dog.jpg" />
          </v-avatar>
        </template>

        <template #item.acao="{ item }">
          <v-btn color="red" small class="white--text mr-2" @click="recusarTutoria(item)">
            <span>Recusar</span>
          </v-btn>
          <v-btn color="green" small class="white--text" @click="escolherTutoria(item)">
            <span>Aceitar</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <ModalAceitarTutoria v-model="showModalAceitarTutoria" @tutoria-recusada="recusarTutoria" />
  </v-row>
</template>
