<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "PageListagemUsuarios" })
export default class PageListagemUsuarios extends Vue {
  filtro = {
    nome: "",
    perfil: "",
    status: ""
  };

  headers = [
    {
      text: "Avatar",
      value: "avatar"
    },
    {
      text: "Nome",
      value: "nome"
    },
    {
      text: "Idade",
      value: "idade",
      filterable: false
    },
    {
      text: "Perfil",
      value: "perfil",
      filter: (perfil: "Indiferente" | "Professor" | "Tutorando") => {
        if (!this.filtro.perfil || this.filtro.perfil === "Indiferente") {
          return true;
        }
        console.log(this.filtro.perfil, perfil);
        return this.filtro.perfil === perfil;
      }
    },
    {
      text: "Email",
      value: "email"
    },
    {
      text: "Status",
      value: "ativo",
      align: "center",
      filter: (status: boolean) => {
        if (!this.filtro.status || this.filtro.status === "Indiferente") {
          return true;
        }
        return this.filtro.status === "Ativo"
          ? status === true
          : status === false;
      }
    }
  ];

  footer = {
    itemsPerPageAllText: "Todas",
    itemsPerPageText: "Linhas por página"
  };

  usuarios = [
    {
      nome: "Leonardo Kauan Pereira",
      idade: 20,
      perfil: "Professor",
      email: "leonardo.12345@gmail.com",
      ativo: true
    },
    {
      nome: "Maria Fatima Mello",
      idade: 25,
      perfil: "Professor",
      email: "mariafatima2012.@uol.com",
      ativo: false
    },
    {
      nome: "Lana Maria Oliveira Silva",
      idade: 19,
      perfil: "Tutor",
      email: "lanamaria18@gmail.com",
      ativo: true
    }
  ];

  opcoes = {
    perfil: ["Indiferente", "Professor", "Tutor"],
    status: ["Indiferente", "Ativo", "Inativo"]
  };
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
            <v-select
              :items="opcoes.perfil"
              v-model="filtro.perfil"
              placeholder="Perfil"
              hide-details
              outlined
              dense
            />
          </div>
          <div class="col-2">
            <v-select
              :items="opcoes.status"
              v-model="filtro.status"
              placeholder="Status"
              hide-details
              outlined
              dense
            />
          </div>
        </div>

        <v-data-table
          class="elevation-0"
          :headers="headers"
          :items="usuarios"
          :search="filtro.nome"
          :footer-props="footer"
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado com esses filtros"
        >
          <template #item.avatar>
            <v-avatar size="50" class="my-2" @click="$router.push({path: '/teste'})">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </template>
          <template #item.ativo="{ item }">
            <v-chip
              :color="item.ativo ? '#448FF2' : '#89DCF6'"
              text-color="white"
              dense
            >
              {{ item.ativo ? "ativo" : "inativo" }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>