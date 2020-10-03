<script lang="ts">
import isValidCpf from "@/utils/form/is-valid-cpf";
import isValidDMY from "@/utils/form/is-valid-dd-mm-yyyy";

import { StringFieldRules } from "@/utils/form";
import { Vue, Component, Watch } from "vue-property-decorator";

import LoginLink from "@/components/auth/LoginLink.vue";
import AppBarCadastro from "@/components/auth/AppBarCadastro.vue";

// @TODO: Rever essa interface, ta bem idiota
interface FormRules {
  [x: string]: StringFieldRules;
}

@Component({ name: "CadastroTutor", components: { AppBarCadastro, LoginLink } })
export default class CadastroTutor extends Vue {
  currentStep = 0;

  validadePassos = {
    0: false,
    1: false,
    3: false
  };

  // @TODO: aplicar tipagem, esperando back
  tutor = {
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
    senha: ""
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
   * também posso fazer uma função generica pra campo obrigatorio mas nao muda
   * muito a qtd de loc e eu fico limitado a uma mensagem de erro, ou passo a
   * msg por parametro que fica tão feio quanto... ver dps
   *
   * ex:
   * const campoObrigatorio = (value: string | undefined): true | string => !!value || "Campo Obrigatório";
   */
  rules: FormRules = {
    nome: [
      v => !!v || "Nome é obrigatório",
      v => (!!v && v.length >= 6) || "Nome deve ter no minimo 6 caracteres",
      v => (!!v && v.length <= 60) || "Nome deve ter no máximo 60 caracteres"
    ],

    email: [
      v => !!v || "E-mail é obrigatório",
      v => (!!v && /.+@.+/.test(v)) || "E-mail inválido"
    ],

    cpf: [this.verificaCpf],

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

  goBack() {
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

  isCpfEmUso = false;
  isCheckingCpf = false;

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
                    :rules="rules.cpf"
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
                    append-icon="mdi-lock"
                    type="password"
                    placeholder="Confirmar Senha"
                    outlined
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
