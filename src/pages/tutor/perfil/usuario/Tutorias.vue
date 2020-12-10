<script lang="ts">
import Auth from "@/store/modules/auth"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

const ModalRegistrarTutoria = () => import("@/components/modals/ModalRegistrarTutoria.vue")

@Component({
  name: "Tutorias",
  components: { ModalRegistrarTutoria }
})
export default class Tutorias extends Vue {
  authModule = getModule(Auth, this.$store)

  showModalRegitrarTutoria = false

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

  tutorias = [{ nome: "Miguel dos Santos", data: "07 de setembro de 2020", horario: "07:00 pm", temRegistro: false }]

  registrarTutoria(tutoria: any) {
    console.log(tutoria)
    this.showModalRegitrarTutoria = true
  }

  editarTutoria(tutoria: any) {
    console.log(tutoria)
    this.showModalRegitrarTutoria = true
  }
}
</script>

<template>
  <v-row no-gutters class="mt-6">
    <v-col cols="12">
      <v-data-table :headers="headers" :items="tutorias" hide-default-footer>
        <template #item.avatar>
          <v-avatar size="36px">
            <v-img src="@/assets/dog.jpg" />
          </v-avatar>
        </template>

        <template #item.acao="{ item }">
          <v-btn v-if="item.temRegistro" color="primary" small class="white--text mr-2" @click="editarTutoria(item)">
            <span>Editar</span>
          </v-btn>
          <v-btn v-else color="green" small class="white--text" @click="registrarTutoria(item)">
            <span>Registrar</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>

    <ModalRegistrarTutoria v-model="showModalRegitrarTutoria" />
  </v-row>
</template>
