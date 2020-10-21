<script lang="ts">
// Tipagem
import { Vue, Component } from "vue-property-decorator"

// Componentes
import LoginLink from "@/components/auth/LoginLink.vue"
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue"
import FotoDropZone from "@/components/inputs/FotoDropZone.vue"
import FormularioSenha from "@/components/auth/FormularioSenha.vue"
import FormularioDadosPessoais, { DadosPessoais } from "@/components/auth/FormularioDadosPessoais.vue"

// Outros
import siglasUniversidades from "@/utils/autocomplete/siglas-universidades"

@Component({
  name: "CadastroTutor",
  components: {
    LoginLink,
    FotoDropZone,
    AppBarCadastro,
    FormularioSenha,
    FormularioDadosPessoais
  }
})
export default class CadastroTutor extends Vue {
  currentStep = 0

  siglasUniversidades = siglasUniversidades

  // Passo 0
  dadosPessoais: DadosPessoais = {
    nome: "",
    email: "",
    cpf: "",
    genero: "",
    celular: ""
  }

  validadePassos = {
    0: false,
    1: false,
    2: false
  }

  // @TODO: aplicar tipagem, esperando back
  tutor: { [x: string]: unknown; foto: File | null } = {
    // Passo 1
    universidade: "",
    cursoLicensiatura: "",
    semestreAtual: "",

    // Passo 2
    anoInicioLicensiatura: "",
    anoFimLicensiatura: "",
    senha: "",

    // Passo 3
    foto: null
  }

  opcoes = {
    semestre: []
  }

  rules = {}

  mounted() {
    this.currentStep = 1
  }

  submit() {
    const tutor = { ...this.dadosPessoais, ...this.tutor }
    console.log(tutor)
    console.log("A integrar com o back !")
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
            Aqui você pode oferecer sua tutoria a professores do brasil inteiro ! algum texto emocionante aqui, uau !
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

                  <!--
                    @TODO
                    Se for pra apenas aceitar valores em items
                    usar v-autocomplete senão v-combobox, verificar depois
                    -->
                  <v-autocomplete
                    v-model="tutor.universidade"
                    :items="siglasUniversidades"
                    :rules="rules.universidade"
                    placeholder="Universidade (digite ou selecione)"
                    outlined
                  />

                  <v-text-field v-model="tutor.c" :rules="rules.nivel" placeholder="Curso de licensiatura" outlined />

                  <v-select
                    v-model="tutor.tempoEnsino"
                    :rules="rules.tempoEnsino"
                    :items="opcoes.tempoEnsino"
                    placeholder="Semestre Atual"
                    outlined
                  />

                  <FormularioSenha v-model="tutor.senha" />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassos['2']">
                  <h1 class="text-center headline mb-8">
                    Passo 4 - Foto
                  </h1>
                  <FotoDropZone v-model="tutor.foto" class="mt-4 mb-8 mx-4" />
                </v-form>
              </v-window-item>
            </v-window>

            <v-spacer />

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
