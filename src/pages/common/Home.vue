<script lang="ts">
import {getModule} from "vuex-module-decorators"
import {Vue, Component} from "vue-property-decorator"

import store from "@/store"
import Auth from "@/store/modules/auth"
import router from "@/router";

@Component({name: "Home"})
export default class PageHome extends Vue {
  authModule = getModule(Auth, store)

  tutores = [
    {nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor"},
    {nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor"},
    {nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor"},
    {nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor"},
    {nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor"},
    {nome: "Amanda", curso: "Biologia", universidade: "UFMS", descricao: "Descrição do tutor"}
  ]

  mounted() {
    if (!this.authModule.isLoggedIn) this.$router.push({path: "/login"})
    if (this.authModule.user?.role == "tutor") this.$router.push({ path: "/meu-perfil" })
  }

  procurar() {
    console.log("apertou")
  }

  irPerfilTutor(tutor: never) {
    //TODO Colocar Pagina do tutor selecionado
    router.push({ path: "/tutor/perfil" })
    console.log(tutor)
  }
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12" class="row justify-center">
        <h2 class="pr-2">Procure,</h2>
        <h2>
          <span class="green--text">A</span>
          <span class="blue--text">p</span>
          <span class="orange--text">r</span>
          <span class="red--text">e</span>
          <span class="green--text">n</span>
          <span class="blue--text">d</span>
          <span class="orange--text">a</span>
        </h2>
      </v-col>
      <v-spacer/>
      <v-col cols="6" class="pt-2 row justify-center align-center">
        <v-text-field
            label="O que você quer aprender?"
            prepend-inner-icon="mdi-book-open-page-variant"
            outlined
        ></v-text-field>
        <v-text-field
            label="Qual dia?"
            prepend-inner-icon="mdi-calendar"
            append-icon="mdi-magnify"
            outlined
            @click:append="procurar"
        ></v-text-field>
      </v-col>
      <v-col cols="12" align="start">
        <h3>{{ tutores.length }} tutores disponíveis para te ajudar</h3>
        <v-row align="center">
          <v-col v-for="(tutor, index) in tutores" :key="index" cols="4">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card
                    v-bind="attrs"
                    v-on="on"
                    class="mx-auto mb-7"
                    max-width="400"
                    @click="irPerfilTutor(tutor)"
                >
                  <v-img
                      class="white--text align-end"
                      height="200px"
                      src="@/assets/taylor.jpg"
                  >
                    <v-card-title>{{ tutor.nome }}</v-card-title>
                    <v-card-subtitle class="d-flex white--text">
                      {{ tutor.curso }} - {{ tutor.universidade }}
                    </v-card-subtitle>
                  </v-img>
                </v-card>
              </template>
              <span>{{ tutor.descricao }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
