<script lang="ts">
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

import Auth from "@/store/modules/auth"

const ModalAgendarTutoria = () => import("@/components/modals/ModalAgendarTutoria.vue")

@Component({
  name: "CardPerfilResumidoTutor",
  components: { ModalAgendarTutoria }
})
export default class CardPerfilResumidoTutor extends Vue {
  authModule = getModule(Auth, this.$store)

  showModalAgendarTutoria = false

  diasSemanaTutor = [
    { dia: "Segunda", diaExt: "Segunda-Feira", disponibilidade: "Noite", num: 1 },
    { dia: "Terça", diaExt: "Terça-Feira", disponibilidade: "Manhã e Tarde", num: 2 },
    { dia: "Quarta", diaExt: "Quarta-Feira", disponibilidade: "Tarde e Noite", num: 3 },
    { dia: "Quinta", diaExt: "Quinta-Feira", disponibilidade: "Não possui horário", num: 4 },
    { dia: "Sexta", diaExt: "Sexta-Feira", disponibilidade: "Manhã, tarde e noite", num: 5 }
  ]

  habilidadesTutor = [{ nome: "Google", cor: "blue" }]

  tutor = { nome: "Amanda", curso: "Biologia", universidade: "UFMS - Universidade Federal do Mato Grosso do Sul" }

  escolherTutoria() {
    this.showModalAgendarTutoria = true
  }
}
</script>

<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="12" md="10">
      <v-card>
        <v-row>
          <v-col cols="3">
            <v-btn color="primary" text @click="$router.push({ path: '/home' })">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9" class="d-flex justify-space-between">
            <h3 class="grey--text ml-2">Disponibilidade do tutor</h3>
            <v-btn color="green" small class="white--text mr-3" @click="escolherTutoria()">
              <span>Agendar Tutoria</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="3">
            <div>
              <div class="d-flex align-center">
                <v-avatar size="150px" class="mb-4 mx-auto">
                  <v-img src="@/assets/taylor.jpg" />
                </v-avatar>
              </div>

              <v-card-text class="text-center">
                <h3 class="blue--text" v-text="tutor.nome" />
              </v-card-text>
            </div>
            <v-divider />
            <div>
              <v-card-text>
                <h3 class="grey--text">Curso</h3>
                <h4 class="blue--text" v-text="tutor.curso" />
              </v-card-text>
              <v-card-text>
                <h3 class="grey--text">Universidade</h3>
                <h4 class="blue--text" v-text="tutor.universidade" />
              </v-card-text>
            </div>
          </v-col>

          <v-col cols="9" style="border-left: 1px solid #e3e3e3; min-height: 300px">
            <h4 class="grey--text px-3 py-3">O tutor possui disponibilidade nos seguintes dias da semana e períodos</h4>
            <v-list two-line>
              <v-list-item v-for="dias in diasSemanaTutor" :key="dias.num">
                <v-list-item-icon v-if="dias.num == 1">
                  <v-icon color="primary">mdi-calendar</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="dias.dia" />
                  <v-list-item-subtitle v-text="dias.disponibilidade" />
                </v-list-item-content>
              </v-list-item>
              <v-divider inset />

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">
                    mdi-account-details
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Ferramentas</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip-group>
                      <v-chip
                        v-for="(habilidades, index) in habilidadesTutor"
                        v-text="habilidades.nome"
                        :key="index"
                        outlined
                        :color="habilidades.cor"
                      />
                    </v-chip-group>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <ModalAgendarTutoria v-model="showModalAgendarTutoria" />
  </v-row>
</template>
