<script lang="ts">
// Tipagem
import { StringFieldRules } from "@/utils/form"
import { Vue, Component } from "vue-property-decorator"

// Componentes
import FormularioDadosPessoais, { DadosPessoais } from "@/components/auth/FormularioDadosPessoais.vue"

import LoginLink from "@/components/auth/LoginLink.vue"
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import FormularioSenha from "@/components/auth/FormularioSenha.vue"
import FotoDropZone from "@/components/inputs/FotoDropZone.vue"

import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import isValidDdMmYyyy from "@/utils/form/is-valid-dd-mm-yyyy"

@Component({
  name: "CadastroProfessor",
  components: {
    LoginLink,
    FotoDropZone,
    AppBarCadastro,
    FormularioSenha,
    FormularioDadosPessoais
  }
})
export default class CadastroProfessor extends Vue {
  currentStep = 0

  validadePassos = {
    0: false,
    1: false,
    2: false
  }

  // Passo 0
  dadosPessoais: DadosPessoais = {
    nome: "",
    email: "",
    cpf: "",
    genero: "",
    celular: ""
  }

  professor: { [x: string]: unknown; foto: File | null } = {
    // Passo 1
    formacao: "",
    nivel: "",
    inicioLecionamento: "",

    // Passo 2
    senha: "",
    foto: null
  }

  // @see https://www.vestibulandoweb.com.br/formacao.htm
  opcoes = {
    formacao: [
      FORMACAO_ACADEMICA.BACHARELADO,
      FORMACAO_ACADEMICA.LICENSIATURA,
      FORMACAO_ACADEMICA.TECNOLOGICO,
      FORMACAO_ACADEMICA.SEQUENCIAL,
      FORMACAO_ACADEMICA.GRADUACAO_A_DISTANCIA,
      FORMACAO_ACADEMICA.EDUCACAO_A_DISTANCIA
    ],

    nivelEnsino: [
      NIVEL_LECIONAMENTO.ENSINO_MEDIO,
      NIVEL_LECIONAMENTO.ENSINO_SUPERIOR,
      NIVEL_LECIONAMENTO.ENSINO_FUNDAMENTAL,
      NIVEL_LECIONAMENTO.EDUCACAO_INFANTIL
    ]
  }

  /**
   * @TODO: Rever com o time se preferem uma biblioteca de validação, fazer
   * na mão ou ambos, como as desse form é simples fiz na mão.
   */
  rules: { [x: string]: StringFieldRules } = {
    campoObrigatorio: [v => !!v || "Campo Obrigatório"],
    inicioLecionamento: [
      v => !!v || "Campo Obrigatório",
      v => (!!v && isValidDdMmYyyy(v, { maxYear: new Date().getFullYear() })) || "Data inválida"
    ]
  }

  submit() {
    const professor = { ...this.dadosPessoais, ...this.professor }
  }

  gotoNextStep() {
    this.currentStep === 2 ? this.submit() : this.currentStep++
  }
}
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />
    <v-container fill-height>
      <v-row align="center" justify="end">
        <v-col cols="4">
          <v-img contain src="@/assets/imagens/Alunos_Conexao.svg" alt="img" />
        </v-col>
        <v-col cols="4">
          <h1 class="display-1 font-weight-bold">
            Agora vamos realizar o seu cadastro
          </h1>

          <span class="subtitle-1 grey--text text--darken-1">
            Aqui você pode encontrar uma tutoria personalizada de acordo com suas necessidades de aprendizagem
          </span>
        </v-col>
        <v-col cols="4">
          <v-card width="450" min-height="715" class="pa-6 elevation-6 d-flex flex-column">
            <v-window v-model="currentStep">
              <v-window-item>
                <v-form v-model="validadePassos['0']">
                  <FormularioDadosPessoais v-model="dadosPessoais" />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassos['1']">
                  <h1 class="text-center headline mb-8">
                    Passo 2 - Formação Acadêmica
                  </h1>

                  <v-select
                    v-model="professor.formacao"
                    :items="opcoes.formacao"
                    :rules="rules.formacao"
                    placeholder="Qual sua Formação ?"
                    outlined
                  />

                  <v-select
                    v-model="professor.nivel"
                    :items="opcoes.nivelEnsino"
                    :rules="rules.campoObrigatorio"
                    placeholder="Qual nível você leciona ?"
                    outlined
                  />

                  <v-text-field
                    v-model="professor.inicioLecionamento"
                    v-mask="'##/##/####'"
                    :rules="rules.inicioLecionamento"
                    placeholder="Quando começou a lecionar ?"
                    append-icon="mdi-calendar"
                    hint="Não precisamos de uma data exata, uma estimativa basta !"
                    outlined
                  />

                  <FormularioSenha v-model="professor.senha" />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassos['2']">
                  <h1 class="text-center headline mb-8">
                    Passo 4 - Foto
                  </h1>
                  <FotoDropZone v-model="professor.foto" class="mt-4 mb-8 mx-4" />
                </v-form>
              </v-window-item>
            </v-window>

            <v-spacer />

            <div>
              <LoginLink />
              <v-card-actions class="mb-2 mt-5">
                <v-spacer />

                <v-btn
                  color="green"
                  class="white--text pl-4"
                  @click="gotoNextStep"
                  :disabled="!validadePassos[currentStep]"
                >
                  <span>
                    {{ currentStep === 2 ? "Finalizar" : "Próximo" }}
                  </span>
                  <v-icon dark right>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>

                <v-spacer />
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
.page-container
  height: calc(100% - 50px)
</style>
