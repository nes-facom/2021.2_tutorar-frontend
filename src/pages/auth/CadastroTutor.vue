<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

import LoginLink from "@/components/auth/LoginLink.vue"
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import FotoDropZone from "@/components/inputs/FotoDropZone.vue"
import FormularioSenha from "@/components/auth/FormularioSenha.vue"
import CadastroStepNavigator from "@/components/stepper/CadastroStepNavigator.vue"
import FormularioDadosPessoais, { DadosPessoais } from "@/components/auth/FormularioDadosPessoais.vue"

import { getModule } from "vuex-module-decorators"
import TutorModule from "@/store/modules/tutor-module"
import siglasUniversidades from "@/utils/autocomplete/siglas-universidades"

import Auth from "@/store/modules/auth"
import { fileToBase64 } from "@/utils/index"
import { TUTOR_ROUTES } from "@/router/rotas/tutor"
import { DadosCadastroTutor } from "@/api/tutor/cadastro-tutor"
import { StringFieldRule } from "@/utils/form"

@Component({
  name: "CadastroTutor",
  components: {
    LoginLink,
    FotoDropZone,
    AppBarCadastro,
    FormularioSenha,
    CadastroStepNavigator,
    FormularioDadosPessoais
  }
})
export default class CadastroTutor extends Vue {
  tutorModule = getModule(TutorModule, this.$store)
  authModule = getModule(Auth, this.$store)

  passoAtual = 0

  siglasUniversidades = siglasUniversidades

  validadePassosFormulario = { 0: false, 1: false, 2: false }

  waitingApiResponse = false

  rules: Record<string, StringFieldRule[]> = {
    campoObrigatorio: [v => !!v || "Campo Obrigatório"]
  }

  opcoes = {
    semestreAtual: [...Array(16).keys()]
  }

  // Passo 0
  dadosPessoais: DadosPessoais = {
    nome: "",
    email: "",
    cpf: "",
    genero: "",
    celular: "",
    dataNascimento: ""
  }

  // Passo 1
  dadosTutor = {
    universidade: "",
    semestreAtual: "",
    cursoLicensiatura: ""
  }

  // Passo 2
  senha = ""

  // Passo 3
  fotoPerfil: null | File = null

  async submit() {
    this.waitingApiResponse = true

    if (!this.fotoPerfil) return

    const foto64 = await fileToBase64(this.fotoPerfil)

    const dadosCadastro: DadosCadastroTutor = {
      ...this.dadosPessoais,
      password: this.senha,
      tutor: this.dadosTutor,
      fotoPerfil: foto64
    }

    this.tutorModule
      .cadastraTutor(dadosCadastro)
      .then(tutorCadastrado => {
        this.waitingApiResponse = false
        return this.authModule.login({ email: tutorCadastrado.email, password: dadosCadastro.password })
      })
      .catch(() => {
        this.waitingApiResponse = false
      })
      .then(() => {
        this.$router.push(TUTOR_ROUTES.PERFIL_PROPRIO)
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
            Aqui você pode oferecer sua tutoria a professores do brasil inteiro!
          </span>
        </v-col>

        <v-col cols="4">
          <v-card width="450" min-height="715" class="pa-6 elevation-6 d-flex flex-column">
            <v-window v-model="passoAtual">
              <v-window-item>
                <v-form v-model="validadePassosFormulario['0']">
                  <FormularioDadosPessoais v-model="dadosPessoais" />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassosFormulario['1']">
                  <h1 class="text-center headline mb-8">
                    Passo 2 - Formação Acadêmica
                  </h1>

                  <v-autocomplete
                    v-model="dadosTutor.universidade"
                    :items="siglasUniversidades"
                    :rules="rules.campoObrigatorio"
                    placeholder="Universidade (digite ou selecione)"
                    outlined
                  />

                  <v-text-field
                    v-model="dadosTutor.cursoLicensiatura"
                    :rules="rules.campoObrigatorio"
                    placeholder="Curso de licensiatura"
                    outlined
                  />

                  <v-select
                    v-model="dadosTutor.semestreAtual"
                    :rules="rules.campoObrigatorio"
                    :items="opcoes.semestreAtual"
                    placeholder="Semestre Atual"
                    outlined
                  />

                  <FormularioSenha v-model="senha" />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassosFormulario['2']">
                  <h1 class="text-center headline mb-8">
                    Passo 4 - Foto
                  </h1>
                  <FotoDropZone v-model="fotoPerfil" class="mt-4 mb-8 mx-4" />
                </v-form>
              </v-window-item>
            </v-window>

            <v-spacer />

            <LoginLink />

            <CadastroStepNavigator
              :steps-validity="validadePassosFormulario"
              :current-step="passoAtual"
              :is-cadastrando="waitingApiResponse"
              @passo-concluido="passoAtual++"
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
