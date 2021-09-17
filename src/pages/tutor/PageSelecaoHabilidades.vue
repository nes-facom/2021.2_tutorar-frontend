<script lang="ts">
import HabilidadesModule, { CATEGORIAS_HABILIDADES, Habilidade } from "@/store/modules/habilidades-module"
import { affirmIsTutorAndReturn, isTutor } from "@/store/modules/tutor-module"
import { Component, Vue } from "vue-property-decorator"
import { Tutor } from "@/store/modules/auth-types"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { cloneDeep } from "lodash"

interface Categoria {
  cor: string
  icon: string
  nome: string
  habilidades: Habilidade[]
}

@Component({
  name: "SelecaoHabilidades"
})
export default class SelecaoHabilidades extends Vue {
  habilidadesModule = getModule(HabilidadesModule, this.$store)
  authModule = getModule(Auth, this.$store)

  currentTab = 0

  isLoading = false

  failedToLoad = false

  props: { [x: string]: { cor: string; icon: string } } = {
    [CATEGORIAS_HABILIDADES.GOOGLE]: {
      cor: "blue",
      icon: "mdi-google"
    },
    [CATEGORIAS_HABILIDADES.EDUCACAO]: {
      cor: "green",
      icon: "mdi-school"
    },
    [CATEGORIAS_HABILIDADES.COMUNICACAO]: {
      cor: "orange",
      icon: "mdi-account-voice"
    },
    [CATEGORIAS_HABILIDADES.ORGANIZACAO]: {
      cor: "deep-orange",
      icon: "mdi-clipboard-check-outline"
    },
    [CATEGORIAS_HABILIDADES.PROGRAMACAO]: {
      cor: "deep-purple",
      icon: "mdi-desktop-tower-monitor"
    },
    [CATEGORIAS_HABILIDADES.EDICAO_DE_VIDEO]: {
      cor: "blue",
      icon: "mdi-video-outline"
    },
    [CATEGORIAS_HABILIDADES.CRIACAO_CONTEUDO]: {
      cor: "green",
      icon: "mdi-trello"
    }
  }

  get habilidadesUsuario(): Habilidade[] {
    const { user } = this.authModule
    if (!user || !isTutor(user)) return []

    const habilidadesUsuario: Habilidade[] = []

    this.categoriasHabilidades.map(categoria => {
      categoria.habilidades.map(habilidade => {
        const userHasHabilidade = user.habilidades.findIndex(h => h === habilidade._id) !== -1
        if (userHasHabilidade) habilidadesUsuario.push(habilidade)
      })
    })

    return habilidadesUsuario
  }

  /**
   * Formata array de habilidades retornado pela api em um array
   * de CATEGORIAS_HABILIDADES com suas respectivas habilidades para exibição
   */
  get categoriasHabilidades(): Categoria[] {
    const val: Categoria[] = []

    const categorias: CATEGORIAS_HABILIDADES[] = [
      ...new Set(this.habilidadesModule.asArray.map(item => item.categoria))
    ]

    categorias.map(categoria => {
      const { cor, icon } = this.props[categoria]
      const habilidades = this.habilidadesModule.asArray.filter(h => h.categoria === categoria)
      val.push({ cor, icon, nome: categoria, habilidades })
    })

    return val
  }

  get usuarioTutor(): Tutor {
    return affirmIsTutorAndReturn(this.authModule.user)
  }

  addHabilidade(habilidade: Habilidade) {
    // if (this.usuarioTutor.habilidades.length >= 5) return

    const dadosUpdate = cloneDeep(this.usuarioTutor)

    dadosUpdate.habilidades.push(habilidade._id)

    this.authModule.updateUser({ id: this.usuarioTutor._id, user: dadosUpdate })
  }

  removeHabilidade(habilidade: Habilidade) {
    if (this.usuarioTutor.habilidades.length === 0) return

    const dadosUpdate = cloneDeep(this.usuarioTutor)

    const idx = dadosUpdate.habilidades.indexOf(habilidade._id)
    dadosUpdate.habilidades.splice(idx, 1)

    this.authModule.updateUser({ id: this.usuarioTutor._id, user: dadosUpdate })
  }

  isSelected(habilidade: Habilidade): boolean {
    return this.habilidadesUsuario.indexOf(habilidade) !== -1
  }

  getHabilidadesLength(): number {
    let totalHabilidades = 0
    let categoriaAtual = null
    for (let i = 0; i<7; i++){
      categoriaAtual = this.categoriasHabilidades[i]
      console.log(categoriaAtual)
      if (categoriaAtual != null) {
      totalHabilidades += categoriaAtual.habilidades.length
      }
    }
    return totalHabilidades
  }


  mounted() {
    if (this.habilidadesModule.meta.allFetched) return

    this.isLoading = true
    this.habilidadesModule
      .fetchAll()
      .catch(() => {
        this.failedToLoad = true
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<template>
  <v-row no-gutters align="center">
    <v-col cols="12" md="10" lg="8" class="mx-auto">
      <v-card class="mb-2">
        <v-card-title class="font-weight-bold pb-2 grey--text text--darken-2">
          <v-icon left>mdi-account-details</v-icon>
          Minhas Habilidades
        </v-card-title>
        <v-divider class="my-2" />

        <div class="pa-4">
          <span class="grey--text text--darken-1 subtitle-1">
            Suas habilidades são utilizadas para que professores te encontrem com mais facilidade, selecione as que
            você mais possui afinidade
          </span>
        </div>

        <template v-if="isLoading">
          <v-row align="center" justify="center" class="text-center">
            <v-col class="my-8">
              <v-progress-circular indeterminate color="grey" class="mr-2" />
            </v-col>
          </v-row>
        </template>

        <template v-else-if="failedToLoad">
          <v-row align="center" justify="center" class="text-center">
            <v-col class="my-8">
              <v-card-title class="mx-auto">Erro ao carregar habilidades</v-card-title>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <v-chip-group column multiple class="px-4 mb-4">
            <div class="my-auto mr-6">
              <span class="subtitle grey--text text--darken-2 mr-3">Habilidades Selecionadas:</span>
              <span
                :class="[
                  'subtitle',
                  'font-weight-bold'
                ]"
                v-text="habilidadesUsuario.length"
              />
              <span> de </span>
              <span class="subtitle font-weight-bold">{{ getHabilidadesLength() }}</span>
            </div>

            <v-chip
              v-for="habilidade in habilidadesUsuario"
              :key="habilidade._id"
              outlined
              close
              @click:close="removeHabilidade(habilidade)"
            >
              <span v-text="habilidade.nome" />
            </v-chip>
          </v-chip-group>

          <v-divider />

          <v-tabs v-model="currentTab" :color="Object.values(props)[currentTab].cor" centered icons-and-text fixed-tabs>
            <v-tab v-for="categoria in categoriasHabilidades" :key="categoria.nome">
              <span v-text="categoria.nome" />
              <v-icon v-text="categoria.icon" />
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="currentTab">
            <v-tab-item v-for="(categoria, i) in categoriasHabilidades" :key="i" class="pa-4">
              <v-chip
                class="ma-2"
                active-class="primary--text"
                v-for="habilidade in categoria.habilidades"
                :key="habilidade.nome"
                :input-value="isSelected(habilidade)"
                filter
                outlined
                @click="isSelected(habilidade) ? removeHabilidade(habilidade) : addHabilidade(habilidade)"
              >
                <span v-text="habilidade.nome" />
              </v-chip>
            </v-tab-item>
          </v-tabs-items>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>
