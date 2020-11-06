<script lang="ts">
import UsersModule from "@/store/modules/users-module"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

@Component({ name: "PageListagemUsuarios" })
export default class PageListagemUsuarios extends Vue {
  userModule = getModule(UsersModule, this.$store)

  filtro = { nome: "", perfil: "", status: "" }

  headers = [
    { text: "Avatar", value: "avatar" },
    { text: "Nome", value: "nome" },
    { text: "Idade", value: "idade", filterable: false },
    {
      text: "Perfil",
      value: "perfil",
      filter: (perfil: "Indiferente" | "Professor" | "Tutorando") => {
        if (!this.filtro.perfil || this.filtro.perfil === "Indiferente") return true
        return this.filtro.perfil === perfil
      }
    },
    { text: "Email", value: "email" },
    {
      text: "Status",
      value: "ativo",
      align: "center",
      filter: (status: boolean) => {
        if (!this.filtro.status || this.filtro.status === "Indiferente") return true
        return this.filtro.status === "Ativo" ? status === true : status === false
      }
    }
  ]

  footer = {
    itemsPerPageAllText: "Todas",
    itemsPerPageText: "Linhas por página"
  }

  opcoes = {
    perfil: ["Indiferente", "Professor", "Tutor"],
    status: ["Indiferente", "Ativo", "Inativo"]
  }

  mounted() {
    this.userModule.getAll()
  }
}
</script>

<template>
  <v-row no-gutters align="center">
    <v-col cols="12" class="mx-auto">
      <v-card>
        <v-card-title class="font-weight-bold pb-2">
          Lista de Usuários
        </v-card-title>

        <div class="d-flex flex-row px-1">
          <div class="col-4">
            <v-text-field
              v-model="filtro.nome"
              placeholder="Busque por nome ou email"
              prepend-inner-icon="mdi-magnify"
              outlined
              hide-details
              dense
            />
          </div>
          <v-spacer />
          <div class="col-2">
            <v-select :items="opcoes.perfil" v-model="filtro.perfil" placeholder="Perfil" hide-details outlined dense />
          </div>
          <div class="col-2">
            <v-select :items="opcoes.status" v-model="filtro.status" placeholder="Status" hide-details outlined dense />
          </div>
        </div>

        <v-data-table
          class="elevation-0"
          :headers="headers"
          :items="userModule.asArray"
          :search="filtro.nome"
          :footer-props="footer"
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado com esses filtros"
        >
          <template #item.avatar>
            <v-avatar size="50" class="my-2 avatar-usuario" @click="$router.push({ path: '/perfil' })">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </template>
          <template #item.ativo="{ item }">
            <v-chip :color="item.ativo ? '#448FF2' : '#89DCF6'" text-color="white" dense>
              {{ item.ativo ? "ativo" : "inativo" }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.avatar-usuario:hover {
  cursor: pointer;
}
</style>
