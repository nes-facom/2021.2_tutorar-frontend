<script lang="ts">
import fetchHabilidades, { CATEGORIAS, Habilidade } from "@/api/habilidades/get-all"
import { isTutor } from "@/store/modules/tutor-module"
import { Component, Vue } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"

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
  authModule = getModule(Auth, this.$store)

  habilidades: Habilidade[] = []

  currentTab = 0

  isLoading = false

  failedToLoad = false

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
   * Habilidades que o usuário selecionou
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
  get categorias(): Categoria[] {
    const val: Categoria[] = []

    const categorias: CATEGORIAS[] = [...new Set(this.habilidades.map(item => item.categoria))]

    categorias.map(categoria => {
      const { cor, icon } = this.props[categoria]
      const habilidades = this.habilidades.filter(h => h.categoria === categoria)
      val.push({ cor, icon, nome: categoria, habilidades })
    })

    return val
  }

  addHabilidade(habilidade: Habilidade) {
    const { user } = this.authModule

    if (!user || !isTutor(user) || user.habilidades.length >= 5) return

    const tutor = { ...user }

    tutor.habilidades.push(habilidade._id)

    this.authModule.updateUser({ id: user._id, user: tutor })
  }

  removeHabilidade(habilidade: Habilidade) {
    const { user } = this.authModule

    if (!user || !isTutor(user) || user.habilidades.length === 0) return

    const tutor = { ...user }

    const idx = tutor.habilidades.indexOf(habilidade._id)
    tutor.habilidades.splice(idx, 1)

    this.authModule.updateUser({ id: user._id, user: tutor })
  }

  isSelected(habilidade: Habilidade): boolean {
    return this.habilidadesUsuario.indexOf(habilidade) !== -1
  }

  mounted() {
    this.isLoading = true

    fetchHabilidades()
      .then(habilidades => {
        this.habilidades = habilidades
      })
      .catch(() => {
        this.failedToLoad = true
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
/*Todo Adicionar rota para após o registro de tutor.
    Caso selecione habilidades : ir para configuração da agenda.
    Caso não queira fazer isso agora : ir para configuração da agenda.
*/
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
            Suas habilidades são utilizadas para que professores te encontrem com mais facilidade, selecione as 5 que
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
            <div class="my-auto  mr-6">
              <span class="subtitle grey--text text--darken-2 mr-3">Habilidades Selecionadas:</span>
              <span
                :class="[
                  'subtitle',
                  'font-weight-bold',
                  habilidadesUsuario.length === 5 ? 'green--text' : 'grey--text'
                ]"
                v-text="habilidadesUsuario.length"
              />
              <span> de </span>
              <span class="subtitle font-weight-bold">5</span>
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

          <!-- TABS HEADERS -->
          <v-tabs v-model="currentTab" :color="Object.values(props)[currentTab].cor" centered icons-and-text fixed-tabs>
            <v-tab v-for="categoria in categorias" :key="categoria.nome">
              <span v-text="categoria.nome" />
              <v-icon v-text="categoria.icon" />
            </v-tab>
          </v-tabs>

          <!-- TABS CONTENT -->
          <v-tabs-items v-model="currentTab">
            <v-tab-item v-for="(categoria, i) in categorias" :key="i" class="pa-4">
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
