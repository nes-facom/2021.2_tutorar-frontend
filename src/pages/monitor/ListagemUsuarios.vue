<script lang="ts">
import { User } from "@/store/modules/auth-types"
import { isTutor } from "@/store/modules/tutor-module"
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
      value: "role",
      filter: (perfil: "Indiferente" | "professor" | "tutor") => {
        if (!this.filtro.perfil || this.filtro.perfil === "Indiferente") return true
        return this.filtro.perfil === perfil
      }
    },
    { text: "Email", value: "email" },
    {
      text: "Status",
      value: "isActive",
      align: "center",
      filter: (status: boolean) => {
        if (!this.filtro.status || this.filtro.status === "Indiferente") return true
        return this.filtro.status === "Ativo" ? status : !status
      }
    }
  ]

  footer = { itemsPerPageAllText: "Todas", itemsPerPageText: "Linhas por página" }

  opcoes = {
    perfil: ["Indiferente", "professor", "tutor"],
    status: ["Indiferente", "Ativo", "Inativo"]
  }

  get users(): User[] {
    return this.userModule.asArray
  }

  getAgeFromYYYYMMDD(date: string): number {
    date = date.substring(0, 10)
    const today = new Date()
    const birthDate = new Date(date)
    let idade = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) idade--

    return idade
  }

  gotoUserPage(selectedUser: User) {
    if (isTutor(selectedUser)) return this.$router.push(`/tutor/${selectedUser._id}/perfil`)
    return
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
        <v-card-title class="font-weight-bold pb-2 grey--text text--darken-1">
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

        <v-divider class="mt-2" />

        <v-data-table
          class="elevation-0"
          :headers="headers"
          :items="users"
          :search="filtro.nome"
          :footer-props="footer"
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado com esses filtros"
        >
          <template v-slot:[`item.avatar`]="{ item }">
            <v-avatar size="50" class="my-2 avatar-usuario" @click="gotoUserPage(item)">
              <img :src="item.fotoPerfil" alt="sem foto" />
            </v-avatar>
          </template>

          <template v-slot:[`item.idade`]="{ item }">
            <span v-text="getAgeFromYYYYMMDD(item.dataNascimento)" />
          </template>

          <template v-slot:[`item.isActive`]="{ item }">
            <v-chip
              v-text="item.isActive ? 'ativo' : 'inativo'"
              :color="item.isActive ? '#448FF2' : '#89DCF6'"
              text-color="white"
              dense
            >
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
