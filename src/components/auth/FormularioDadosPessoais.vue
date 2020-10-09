<script lang="ts">
// Validação
import { StringFieldRules } from "@/utils/form";
import isValidCpf from "@/utils/form/is-valid-cpf";
import isValidDMY from "@/utils/form/is-valid-dd-mm-yyyy";

import { Vue, Component, Watch } from "vue-property-decorator";

export interface DadosPessoais {
  cpf: string | undefined;
  nome: string | undefined;
  email: string | undefined;
  genero: string | undefined;
  celular: string | undefined;
}

@Component({ name: "FormularioDadosPessoais" })
export default class FormularioDadosPessoais extends Vue {
  dados: DadosPessoais = {
    nome: "",
    email: "",
    cpf: "",
    genero: "",
    celular: ""
  };

  isCpfEmUso = false;
  isCheckingCpf = false;

  // @TODO: Rever quais são os tipos permitidos no back, transformar em dicionario depois
  opcoes = {
    genero: ["Masculino", "Feminino", "Prefiro não informar"]
  };

  getCelularMask(telefone: string) {
    if (!telefone) return "(##) ####-####";
    return telefone.length > 14 ? "(##) #####-####" : "(##) ####-####";
  }

  verificaCpf(cpf: string | undefined): true | string {
    if (!cpf) return "CPF é obrigatório";

    if (!isValidCpf(cpf)) return "CPF inválido";

    return this.isCpfEmUso ? "CPF em uso" : true;
  }

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
    ]
  };

  @Watch("dados", { deep: true })
  onFormDataChange(value: DadosPessoais) {
    this.$emit("input", value);
  }

  /**
   * @TODO: fazer uma função que faz uma request simples a API pra verificar se
   * ja existe um cadastro com esse cpf, essa função deve ser chamada quando
   * o usuario termina de digitar um cpf válido no campo
   */
  @Watch("dados.cpf")
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
  <div>
    <h1 class="text-center headline mb-8">
      Passo 1 - Dados Pessoais
    </h1>

    <v-text-field
      v-model="dados.nome"
      :rules="rules.nome"
      placeholder="Nome"
      outlined
    />

    <v-text-field
      v-model="dados.email"
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
      v-model="dados.cpf"
      v-mask="'###.###.###-##'"
      :rules="[verificaCpf]"
      :loading="isCheckingCpf"
      :error="isCpfEmUso"
      :error-messages="isCpfEmUso ? ['CPF em uso'] : []"
      placeholder="CPF"
      outlined
    />

    <v-text-field
      v-model="dados.dataNascimento"
      v-mask="'##/##/####'"
      :rules="rules.dataNascimento"
      placeholder="Data de Nascimento"
      outlined
    />

    <v-select
      v-model="dados.genero"
      :items="opcoes.genero"
      :rules="rules.genero"
      placeholder="Gênero"
      required
      outlined
    />

    <v-text-field
      v-model="dados.celular"
      v-mask="getCelularMask(dados.celular)"
      :rules="rules.celular"
      placeholder="Celular"
      outlined
    />
  </div>
</template>
