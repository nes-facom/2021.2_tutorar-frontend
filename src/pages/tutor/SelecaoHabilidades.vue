<script lang="ts">
import fetchHabilidades, { CATEGORIAS, Habilidade } from "@/api/habilidades/get-all"
import Auth from "@/store/modules/auth"
import TutorModule, { isTutor } from "@/store/modules/tutor-module"
import { Component, Vue } from "vue-property-decorator"
import { use } from "vue/types/umd"
import { getModule } from "vuex-module-decorators"

interface Categoria {
  cor: string
  icon: string
  nome: string
  habilidades: Habilidade[]
}

const { GOOGLE, EDUCACAO, COMUNICACAO, ORGANIZACAO, PROGRAMACAO, EDICAO_DE_VIDEO, CRIACAO_CONTEUDO } = CATEGORIAS

@Component({
  name: "SelecaoHabilidades"
})
export default class SelecaoHabilidades extends Vue {
  tutorModule = getModule(TutorModule, this.$store)
  authModule = getModule(Auth, this.$store)

  categorias: Categoria[] = []

  habilidadesSelecionadas: Habilidade[] = []

  currentTab = 0

  props: { [x: string]: { cor: string; icon: string } } = {
    [GOOGLE]: {
      cor: "blue",
      icon: "mdi-google"
    },
    [EDUCACAO]: {
      cor: "green",
      icon: "mdi-school"
    },
    [COMUNICACAO]: {
      cor: "orange",
      icon: "mdi-account-voice"
    },
    [ORGANIZACAO]: {
      cor: "deep-orange",
      icon: "mdi-clipboard-check-outline"
    },
    [PROGRAMACAO]: {
      cor: "deep-purple",
      icon: "mdi-desktop-tower-monitor"
    },
    [EDICAO_DE_VIDEO]: {
      cor: "blue",
      icon: "mdi-video-outline"
    },
    [CRIACAO_CONTEUDO]: {
      cor: "green",
      icon: "mdi-trello"
    }
  }

  /**
   * As habilidades que o usuário tem atualmente
   */
  get habilidadesUsuario(): Habilidade[] {
    const { user } = this.authModule
    if (!user || !isTutor(user)) return []

    const habilidadesUsuario: Habilidade[] = []

    this.categorias.map(categoria => {
      categoria.habilidades.map(habilidade => {
        const userHasHabilidade = user.habilidades.findIndex(h => h === habilidade._id) !== -1
        if (userHasHabilidade) habilidadesUsuario.push(habilidade)
      })
    })

    return habilidadesUsuario
  }

  /**
   * Formata array de habilidades retornado pela api em um array
   * de categorias com suas respectivas habilidades para exibição
   */
  formatarHabilidadesPorCategoria(habilidades: Habilidade[]): Categoria[] {
    const categorias: Categoria[] = []

    const nomesCategorias: CATEGORIAS[] = [...new Set(habilidades.map(item => item.categoria))]

    nomesCategorias.map(categoria => {
      const { cor, icon } = this.props[categoria]
      const filtered = habilidades.filter(h => h.categoria === categoria)
      categorias.push({ cor, icon, nome: categoria, habilidades: filtered })
    })

    return categorias
  }

  /**
   * Envia request para adicionar essa habilidade ao usuario
   */
  async toggleHabilidade(habilidade: Habilidade) {
    const { user } = this.authModule

    if (!user || !isTutor(user) || user.habilidades.length >= 5) return

    const tutor = { ...user }

    tutor.habilidades.push(habilidade._id)

    await this.tutorModule.updateTutor({ id: user._id, tutor })

    const idx = this.habilidadesSelecionadas.indexOf(habilidade)

    idx === -1 ? this.habilidadesSelecionadas.push(habilidade) : this.habilidadesSelecionadas.splice(idx, 1)
  }

  mounted() {
    fetchHabilidades().then(habilidades => {
      this.categorias = this.formatarHabilidadesPorCategoria(habilidades)
    })
  }
}
</script>

<template>
  <v-row no-gutters align="center">
    <v-col cols="12" md="10" lg="8" class="mx-auto">
      <v-card class="mb-2">
        <v-card-title class="font-weight-bold pb-2">
          <v-icon left>mdi-account-details</v-icon>
          Minhas Habilidades
        </v-card-title>

        <v-divider class="my-2" />

        <div class="pa-4">
          <span class="grey--text text--darken-1 subtitle-1"
            >Suas habilidades são utilizadas para que professores te encontrem com mais facilidade, selecione as 5 que
            você mais possui afinidade
          </span>
        </div>

        <v-chip-group column multiple class="px-4 mb-4">
          <div class="my-auto  mr-6">
            <span class="subtitle grey--text text--darken-2">Habilidades Selecionadas:</span>
          </div>

          <v-chip
            active-class="primary--text"
            v-for="habilidade in habilidadesUsuario"
            :key="habilidade._id"
            filter
            outlined
          >
            <span v-text="habilidade.nome" />
          </v-chip>
        </v-chip-group>

        <!-- TABS HEADERS -->
        <v-tabs v-model="currentTab" :color="Object.values(props)[currentTab].cor" centered icons-and-text>
          <v-tab v-for="categoria in categorias" :key="categoria.nome">
            <span v-text="categoria.nome" />
            <v-icon v-text="categoria.icon" />
          </v-tab>
        </v-tabs>

        <!-- TABS CONTENT -->
        <v-tabs-items v-model="currentTab">
          <v-tab-item v-for="(categoria, idx) in categorias" :key="idx" class="pa-4">
            <v-chip-group column multiple>
              <v-chip
                active-class="primary--text"
                v-for="habilidade in categoria.habilidades"
                :key="habilidade.nome"
                filter
                outlined
                @click="toggleHabilidade(habilidade)"
              >
                <span v-text="habilidade.nome" />
              </v-chip>
            </v-chip-group>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>
