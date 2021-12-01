<script lang="ts">
import { DadosCadastroProfessor } from "@/api/professor/cadastro-professor"
import { Vue, Component, Watch } from "vue-property-decorator"

import FormularioDadosPessoais, { DadosPessoais } from "@/components/auth/FormularioDadosPessoais.vue"

import LoginLink from "@/components/auth/LoginLink.vue"
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import FormularioSenha from "@/components/auth/FormularioSenha.vue"
import FotoDropZone from "@/components/inputs/FotoDropZone.vue"
import CadastroStepNavigator from "@/components/stepper/CadastroStepNavigator.vue"

import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import isValidDdMmYyyy from "@/utils/form/is-valid-dd-mm-yyyy"
import { PROFESSOR_ROUTES } from "@/router/rotas/professor"
import { getModule } from "vuex-module-decorators"
import Auth from "@/store/modules/auth"
import { ddmmyyyyStringToIso, fileToBase64 } from "@/utils"
import ProfessorModule from "@/store/modules/professor-module"
import { StringFieldRule } from "@/utils/form"

@Component({
  name: "CadastroProfessor",
  components: {
    LoginLink,
    FotoDropZone,
    AppBarCadastro,
    FormularioSenha,
    CadastroStepNavigator,
    FormularioDadosPessoais
  }
})
export default class CadastroProfessor extends Vue {
  @Watch("dataInicioLecionamentoNaoFormatada")
  handle(data: string) {
    // prettier-ignore
    this.dadosProfessor.inicioLecionamento = data?.length === 10
      ? ddmmyyyyStringToIso(data)
      : ""
  }

  authModule = getModule(Auth, this.$store)
  professorModule = getModule(ProfessorModule, this.$store)

  currentStep = 0

  validadePassos = { 0: false, 1: false, 2: false }

  waitingApiResponse = false

  dataInicioLecionamentoNaoFormatada = ""

  dadosPessoais: DadosPessoais = {
    nome: "",
    email: "",
    cpf: "",
    genero: "",
    celular: "",
    dataNascimento: ""
  }

  dadosProfessor = {
    nivelLecionamento: "",
    formacaoAcademica: "",
    inicioLecionamento: ""
  }

  senha = ""

  fotoPerfil: null | File = null

  opcoes = {
    formacaoAcademica: [
      FORMACAO_ACADEMICA.BACHARELADO,
      FORMACAO_ACADEMICA.LICENSIATURA,
      FORMACAO_ACADEMICA.TECNOLOGICO,
      FORMACAO_ACADEMICA.SEQUENCIAL,
      FORMACAO_ACADEMICA.GRADUACAO_A_DISTANCIA,
      FORMACAO_ACADEMICA.EDUCACAO_A_DISTANCIA
    ],

    nivelLecionamento: [
      NIVEL_LECIONAMENTO.ENSINO_MEDIO,
      NIVEL_LECIONAMENTO.ENSINO_SUPERIOR,
      NIVEL_LECIONAMENTO.EDUCACAO_INFANTIL,
      NIVEL_LECIONAMENTO.ENSINO_FUNDAMENTAL
    ]
  }

  rules: { [x: string]: StringFieldRule[] } = {
    campoObrigatorio: [v => !!v || "Campo Obrigatório"],
    inicioLecionamento: [
      v => !!v || "Campo Obrigatório",
      v => (!!v && isValidDdMmYyyy(v, { maxYear: new Date().getFullYear() })) || "Data inválida"
    ]
  }

  async submit() {
    this.waitingApiResponse = true

    if (!this.fotoPerfil) return

    const foto64 = await fileToBase64(this.fotoPerfil)

    const dadosCadastro: DadosCadastroProfessor = {
      ...this.dadosPessoais,
      password: this.senha,
      professor: this.dadosProfessor as DadosCadastroProfessor["professor"],
      fotoPerfil: foto64
    }

    this.professorModule
      .cadastraTutor(dadosCadastro)
      .then(professorCadastrado => {
        this.waitingApiResponse = false
        return this.authModule.login({ email: professorCadastrado.email, password: dadosCadastro.password })
      })
      .catch(() => {
        this.waitingApiResponse = false
      })
      .then(() => {
        this.$router.push(PROFESSOR_ROUTES.PERFIL)
      })
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
          <h1 class="display-1 font-weight-bold">Agora vamos realizar o seu cadastro</h1>

          <span class="subtitle-1 grey--text text--darken-1">
            Aqui você pode encontrar uma tutoria personalizada de acordo com suas necessidades de aprendizagem.
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
                    v-model="dadosProfessor.formacaoAcademica"
                    :items="opcoes.formacaoAcademica"
                    :rules="rules.campoObrigatorio"
                    placeholder="Qual sua Formação?"
                    outlined
                  />

                  <v-select
                    v-model="dadosProfessor.nivelLecionamento"
                    :items="opcoes.nivelLecionamento"
                    :rules="rules.campoObrigatorio"
                    placeholder="Qual nível você leciona?"
                    outlined
                  />

                  <v-text-field
                    v-model="dataInicioLecionamentoNaoFormatada"
                    v-mask="'##/##/####'"
                    :rules="rules.inicioLecionamento"
                    placeholder="Quando começou a lecionar?"
                    append-icon="mdi-calendar"
                    hint="Não precisamos de uma data exata, uma estimativa basta!"
                    outlined
                  />

                  <FormularioSenha v-model="senha" />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassos['2']">
                  <h1 class="text-center headline mb-8">Passo 4 - Foto</h1>
                  <FotoDropZone v-model="fotoPerfil" class="mt-4 mb-8 mx-4" />
                </v-form>
              </v-window-item>
            </v-window>

            <v-spacer />

            <LoginLink />

            <CadastroStepNavigator
              :steps-validity="validadePassos"
              :current-step="currentStep"
              :is-cadastrando="waitingApiResponse"
              @passo-concluido="currentStep++"
              @cadastro-concluido="submit"
            />
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
