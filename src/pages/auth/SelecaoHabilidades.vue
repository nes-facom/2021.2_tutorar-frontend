<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({ name: "SelecaoHabilidades" })
export default class SelecaoHabilidades extends Vue {
  categorias = [
    {
      nome: "Google",
      cor: "blue",
      habilidades: [
        { nome: "Google Classroom" },
        { nome: "Gmail" },
        { nome: "Google Documentos" },
        { nome: "Google Planilhas" },
        { nome: "Google Formulários" }
      ]
    },
    {
      nome: "Comunicação",
      cor: "green",
      habilidades: [
        { nome: "Telegram" },
        { nome: "Signal" },
        { nome: "Jitsi" },
        { nome: "Fishbole" },
        { nome: "Slido" }
      ]
    },
    {
      nome: "Educação",
      cor: "red",
      habilidades: [
        { nome: "Moodle" },
        { nome: "Mentimeter" },
        { nome: "Khan Academy" },
        { nome: "WordWall" },
        { nome: "Whell of Names" }
      ]
    },
    {
      nome: "Organização",
      cor: "deep-orange",
      habilidades: [
        { nome: "Trello" },
        { nome: "Linktree" },
        { nome: "Bitly" },
        { nome: "QR Code" },
        { nome: "Calendly" }
      ]
    },
    {
      nome: "Vídeo e Edição",
      cor: "red",
      habilidades: [
        { nome: "Snapcamera" },
        { nome: "Loom" },
        { nome: "Streamyard" },
        { nome: "Screencastfy" },
        { nome: "Wevideo" }
      ]
    },
    {
      nome: "Criação de Conteúdo",
      cor: "deep-purple",
      habilidades: [{ nome: "Padlet" }, { nome: "Wakelet" }, { nome: "OnlyOffice" }]
    },
    {
      nome: "Programação",
      cor: "blue",
      habilidades: [{ nome: "Scratch" }, { nome: "Tinkercad" }, { nome: "Flippity" }]
    }
  ]
}
</script>

<template>
  <v-row no-gutters align="center">
    <v-col cols="12" class="mx-auto">
      <v-card>
        <v-card-title class="font-weight-bold pb-2">
          <v-icon class="mr-2">mdi-monitor</v-icon>
          Habilidades
        </v-card-title>
        <v-divider class="my-2"></v-divider>
        <v-card-title class="mb-1">Selecione as ferramentas que você possui afinidade</v-card-title>
        <template>
          <v-row justify="center" class="mx-auto">
            <v-expansion-panels popout>
              <v-expansion-panel v-for="categ in categorias" :key="categ">
                <v-expansion-panel-header :class="categ.cor + '--text'" :key="categ.nome"
                  >{{ categ.nome }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-chip-group column multiple>
                    <v-chip
                      filter
                      outlined
                      active-class="primary--text"
                      v-for="habil in categ.habilidades"
                      :key="habil"
                    >
                      {{ habil.nome }}
                    </v-chip>
                  </v-chip-group>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped></style>
