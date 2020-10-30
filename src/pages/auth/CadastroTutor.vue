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
import { StringFieldRules } from "@/utils/form"
import { getModule } from "vuex-module-decorators"
import TutorModule from "@/store/modules/repositories/tutor"

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
  tutorModule = getModule(TutorModule, this.$store)

  currentStep = 0

  mounted() {
    // this.currentStep++
    // this.currentStep++
  }

  siglasUniversidades = siglasUniversidades

  // Passo 0
  dadosPessoais: DadosPessoais = { nome: "", email: "", cpf: "", genero: "", celular: "" }

  validadePassos = { 0: false, 1: false, 2: false }

  // @TODO: aplicar tipagem, esperando back
  tutor: { [x: string]: unknown; foto?: File | null } = {
    // Passo 1
    universidade: "",
    semestreAtual: "",
    cursoLicensiatura: "",

    // Passo 2
    senha: "",
    anoFimLicensiatura: "",
    anoInicioLicensiatura: "",

    // Passo 3
    foto: null
  }

  rules: { [x: string]: StringFieldRules } = {
    campoObrigatorio: [v => !!v || "Campo Obrigatório"]
  }

  opcoes = {
    semestreAtual: [...Array(16).keys()]
  }

  submit() {
    const formData = new FormData()

    const mock: any = {
      anoFimLicensiatura: "",
      anoInicioLicensiatura: "",
      celular: "(67) 99880-1996",
      cpf: "036.902.081-22",
      cursoLicensiatura: "Meme",
      dataNascimento: "23/10/1996",
      email: "vitor.guidorizzi@hotmail.com",
      genero: "Masculino",
      nome: "Vitor Andrade",
      semestreAtual: 10,
      senha: "contafake3",
      universidade: "UTFPR",
      foto: "s"
    }

    // const tutor = { ...this.dadosPessoais, ...this.tutor }
    const tutor = mock

    console.log(tutor)

    const foto = tutor.foto
    delete tutor.foto

    this.tutorModule.cadastraTutor(tutor, foto)
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

                  <v-autocomplete
                    v-model="tutor.universidade"
                    :items="siglasUniversidades"
                    :rules="rules.campoObrigatorio"
                    placeholder="Universidade (digite ou selecione)"
                    outlined
                  />

                  <v-text-field
                    v-model="tutor.cursoLicensiatura"
                    :rules="rules.campoObrigatorio"
                    placeholder="Curso de licensiatura"
                    outlined
                  />

                  <v-select
                    v-model="tutor.semestreAtual"
                    :rules="rules.campoObrigatorio"
                    :items="opcoes.semestreAtual"
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
