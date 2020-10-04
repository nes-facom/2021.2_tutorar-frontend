<script lang="ts">
// Validação
import isValidCpf from "@/utils/form/is-valid-cpf";
import isValidDMY from "@/utils/form/is-valid-dd-mm-yyyy";

// Tipagem
import { StringFieldRules } from "@/utils/form";
import { Vue, Component, Watch, Ref } from "vue-property-decorator";

// Componentes
import vue2Dropzone from "vue2-dropzone";
import LoginLink from "@/components/auth/LoginLink.vue";
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue";

// CSS
import "vue2-dropzone/dist/vue2Dropzone.min.css";

@Component({
  name: "CadastroTutor",
  components: { AppBarCadastro, LoginLink, FileDropZone: vue2Dropzone }
})
export default class CadastroTutor extends Vue {
  // @SEE: https://www.dropzonejs.com/#configuration
  get fileDropZoneOptions() {
    return {
      url: "...",

      maxFilesize: 5,

      accept: (file: File, done: () => void) => {
        this.tutor.foto = file;
        done();
      },

      // Não envia a file pro url ao aceitar imagem
      autoProcessQueue: false,

      // Estilo
      dictDefaultMessage: "Arraste sua foto aqui. Ou clique para seleciona-la.",
      includeStyling: false,

      maxFiles: 1,
      uploadMultiple: false
    };
  }

  substituirFoto(file: File) {
    const dz = this.$refs["fileDropZone"];
    dz.removeAllFiles();
    dz.addFile(file);
  }

  currentStep = 0;

  isCpfEmUso = false;
  isCheckingCpf = false;

  confirmacaoSenha = "";

  validadePassos = {
    0: false,
    1: false,
    2: false,
    3: false
  };

  // @TODO: aplicar tipagem, esperando back
  tutor: { [x: string]: any; foto: File | null } = {
    // Passo 1
    cpf: "",
    nome: "",
    genero: "",
    celular: "",
    dataNascimento: "",

    // Passo 2
    formacao: "",
    nivel: "",
    tempoEnsino: "",

    // Passo 3
    senha: "",

    // Passo 4
    foto: null
  };

  // @TODO: Rever quais são os tipos permitidos no back, transformar em dicionario depois
  opcoes = {
    genero: ["Masculino", "Feminino", "Prefiro não informar"],

    // @TODO: REVER https://www.vestibulandoweb.com.br/formacao.htm
    formacao: [
      "Bacharelado",
      "Licenciatura",
      "Tecnológico",
      "Seqüencial",
      "Graduação Modulada",
      "Educação à Distância"
    ],

    tempoEnsino: [
      "menos de 1 ano",
      "entre 1 a 5 anos",
      "entre 5 a 10 anos",
      "mais de 10 anos"
    ]
  };

  /**
   * @TODO: Rever com o time se preferem uma biblioteca de validação, fazer
   * na mão ou ambos, como as desse form é simples fiz na mão.
   *
   * const campoObrigatorio = (value: string | undefined): true | string => !!value || "Campo Obrigatório";
   */
  rules: { [x: string]: StringFieldRules } = {
    nome: [
      v => !!v || "Nome é obrigatório",
      v => (!!v && v.length >= 6) || "Nome deve ter no minimo 6 caracteres",
      v => (!!v && v.length <= 60) || "Nome deve ter no máximo 60 caracteres"
    ],

    email: [
      v => !!v || "E-mail é obrigatório",
      v => (!!v && /.+@.+/.test(v)) || "E-mail inválido"
    ],

    dataNascimento: [
      v => !!v || "Data de nascimento é obrigatório",
      v => {
        const maxYear = new Date().getFullYear() - 16;
        return (!!v && isValidDMY(v, { maxYear })) || "Data inválida";
      }
    ],

    genero: [v => !!v || "Gênero é obrigatório"],

    celular: [
      v => !!v || "Celular é obrigatório",
      v => (!!v && v.length >= 14) || "Número inválido"
    ],

    nivel: [v => !!v || "Campo Obrigatório"],

    senha: [
      v => !!v || "Campo Obrigatório",
      v => (!!v && v.length >= 6) || "Senha deve ter no minimo 6 caracteres",
      v => (!!v && v.length < 60) || "Senha deve ter no minimo 60 caracteres"
    ]
  };

  get errosConfirmacaoSenha(): string[] {
    const erros = [];

    // Só valido se o usuário já digitou uma senha pro tutor
    if (!this.confirmacaoSenha && this.tutor.senha) {
      erros.push("Por favor confirme sua senha");
    }

    if (this.confirmacaoSenha !== this.tutor.senha) {
      erros.push("Senhas não conferem");
    }

    return erros;
  }

  goNext() {
    this.currentStep === 0 ? this.$emit("go-back") : this.currentStep--;
  }

  getCelularMask(telefone: string) {
    if (!telefone) return "(##) ####-####";
    return telefone.length > 14 ? "(##) #####-####" : "(##) ####-####";
  }

  verificaCpf(cpf: string | undefined): true | string {
    if (!cpf) return "CPF é obrigatório";

    if (!isValidCpf(cpf)) return "CPF inválido";

    return this.isCpfEmUso ? "CPF em uso" : true;
  }

  /**
   * @TODO: fazer uma função que faz uma request simples a API pra verificar se
   * ja existe um cadastro com esse cpf, essa função deve ser chamada quando
   * o usuario termina de digitar um cpf válido no campo
   */
  @Watch("tutor.cpf")
  onCpfChange(cpf: string | undefined) {
    if (!cpf || !isValidCpf(cpf)) {
      this.isCpfEmUso = false;
    } else {
      this.isCheckingCpf = true;

      // Mockup
      setTimeout(() => {
        this.isCheckingCpf = false;
        this.isCpfEmUso = false;
      }, 2000);

      // @TODO: implementar a call a api aqui...
    }
  }

  mounted() {
    this.currentStep++;
    this.currentStep++;
  }
}
</script>

<template>
  <div class="page-container">
    <AppBarCadastro />
    <v-container fill-height>
      <v-row align="center" justify="end">
        <v-col cols="auto">
          <v-card width="400" class="pa-6 elevation-6">
            <v-window v-model="currentStep">
              <v-window-item>
                <v-form v-model="validadePassos['0']">
                  <h1 class="text-center headline mb-8">
                    Passo 1 - Dados Pessoais
                  </h1>

                  <v-text-field
                    v-model="tutor.nome"
                    :rules="rules.nome"
                    placeholder="Nome"
                    outlined
                  />

                  <v-text-field
                    v-model="tutor.email"
                    :rules="rules.email"
                    placeholder="Email"
                    outlined
                  />

                  <!-- 
                    :error -> Se o cpf esta em uso coloco em estado de erro manualmente
                    :error-messages -> Se o cpf esta em uso adiciono a mensagem de erro
                    do mesmo, senão passo um array vazio

                    faço isso pois a validação de inputs é feita quando há um input
                    mas no caso do cpf eu só sei se é valida quando a api responde,
                    por isso preciso setar manualmente o estado de erro.

                    see: https://vuetifyjs.com/en/api/v-text-field/#props
                  -->
                  <v-text-field
                    v-model="tutor.cpf"
                    v-mask="'###.###.###-##'"
                    :rules="[verificaCpf]"
                    :loading="isCheckingCpf"
                    :error="isCpfEmUso"
                    :error-messages="isCpfEmUso ? ['CPF em uso'] : []"
                    placeholder="CPF"
                    outlined
                  />

                  <v-text-field
                    v-model="tutor.dataNascimento"
                    v-mask="'##/##/####'"
                    :rules="rules.dataNascimento"
                    placeholder="Data de Nascimento"
                    outlined
                  />

                  <v-select
                    v-model="tutor.genero"
                    :items="opcoes.genero"
                    :rules="rules.genero"
                    placeholder="Gênero"
                    required
                    outlined
                  />

                  <v-text-field
                    v-model="tutor.celular"
                    v-mask="getCelularMask(tutor.celular)"
                    :rules="rules.celular"
                    placeholder="Celular"
                    outlined
                  />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassos['1']">
                  <h1 class="text-center headline mb-8">
                    Passo 2 - Formação Acadêmica
                  </h1>

                  <v-select
                    v-model="tutor.formacao"
                    :items="opcoes.formacao"
                    :rules="rules.nome"
                    placeholder="Qual sua Formação ?"
                    outlined
                  />

                  <v-text-field
                    v-model="tutor.nivel"
                    :rules="rules.nivel"
                    placeholder="Qual nível você leciona ?"
                    outlined
                  />

                  <v-select
                    v-model="tutor.tempoEnsino"
                    :rules="rules.tempoEnsino"
                    :items="opcoes.tempoEnsino"
                    placeholder="Quanto tempo você atua na docencia"
                    outlined
                  />
                </v-form>

                <v-form v-model="validadePassos['2']">
                  <h1 class="text-center headline mb-8">
                    Passo 3 - Definir Senha
                  </h1>
                  <v-text-field
                    v-model="tutor.senha"
                    :rules="rules.senha"
                    append-icon="mdi-lock"
                    type="password"
                    placeholder="Senha"
                    outlined
                  />
                  <!-- TODO... -->
                  <v-text-field
                    v-model="confirmacaoSenha"
                    append-icon="mdi-lock"
                    type="password"
                    placeholder="Confirmar Senha"
                    :error-messages="errosConfirmacaoSenha"
                    outlined
                  />
                </v-form>
              </v-window-item>

              <v-window-item>
                <v-form v-model="validadePassos['3']">
                  <h1 class="text-center headline mb-8">
                    Passo 4 - Foto
                  </h1>
                  <FileDropZone
                    :options="fileDropZoneOptions"
                    @vdropzone-max-files-reached="$log('nigger')"
                    class="mb-8"
                    id="dropZone"
                    ref="fileDropZone"
                  />
                </v-form>
              </v-window-item>

              <div class="d-flex">
                <v-spacer />
                <v-btn
                  color="green"
                  class="white--text pl-4 mb-6"
                  @click="currentStep++"
                  :disabled="!validadePassos[currentStep] || isCheckingCpf"
                >
                  Próximo
                  <v-icon dark right>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
                <!-- <v-btn
                  color="green"
                  class="white--text pl-4 mb-6"
                  @click="currentStep++"
                 
                >
                  Próximo
                  <v-icon dark right>
                    mdi-arrow-right
                  </v-icon>
                </v-btn> -->
                <v-spacer />
              </div>

              <LoginLink />
            </v-window>
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
