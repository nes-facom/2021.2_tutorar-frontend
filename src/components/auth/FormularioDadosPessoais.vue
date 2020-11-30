<script lang="ts">
import { StringFieldRules } from "@/utils/form"
import isValidCpf from "@/utils/form/is-valid-cpf"
import isValidDMY from "@/utils/form/is-valid-dd-mm-yyyy"
import { unmask } from "@/utils/inputs/mask"

import { Vue, Component, Watch } from "vue-property-decorator"

import findUserByCpf from "@/api/users/find-by-cpf"
import { ddmmyyyyStringToIso } from "@/utils"

export interface DadosPessoais {
  cpf: string
  nome: string
  email: string
  genero: string
  celular: string
  dataNascimento: string
}

@Component({ name: "FormularioDadosPessoais" })
export default class FormularioDadosPessoais extends Vue {
  dados: DadosPessoais = {
    cpf: "",
    nome: "",
    email: "",
    genero: "",
    celular: "",
    dataNascimento: ""
  }

  maskedCpf = ""
  isCpfEmUso = false
  isCheckingCpf = false

  maskedTelefone = ""
  dataNascimentoNaoFormatada = ""

  opcoes = {
    genero: [
      { text: "Masculino", value: "M" },
      { text: "Feminino", value: "F" }
    ]
  }

  getCelularMask(telefone?: string) {
    if (!telefone) return "(##) ####-####"
    return telefone.length <= 14 ? "(##) ####-####" : "(##) #####-####"
  }

  verificaCpf(cpf?: string): true | string {
    if (!cpf) return "CPF é obrigatório"

    if (!isValidCpf(cpf)) return "CPF inválido"

    return this.isCpfEmUso ? "CPF em uso" : true
  }

  rules: { [x: string]: StringFieldRules } = {
    nome: [
      v => !!v || "Nome é obrigatório",
      v => (!!v && v.length >= 6) || "Nome deve ter no minimo 6 caracteres",
      v => (!!v && v.length <= 60) || "Nome deve ter no máximo 60 caracteres"
    ],

    email: [v => !!v || "E-mail é obrigatório", v => (!!v && /.+@.+/.test(v)) || "E-mail inválido"],

    dataNascimento: [
      v => !!v || "Data de nascimento é obrigatório",
      v => {
        // @TODO Eca, refatorar depois
        const maxYear = new Date().getFullYear() - 16
        if (!v) return "Campo Obrigatório"
        const error = isValidDMY(v, { maxYear })
        return typeof error === "string" && error.includes("inferior") ? "Idade mínima de 16 anos" : error
      }
    ],

    genero: [v => !!v || "Gênero é obrigatório"],

    celular: [v => !!v || "Celular é obrigatório", v => (!!v && v.length >= 14) || "Número inválido"]
  }

  @Watch("dados", { deep: true })
  onFormDataChange(dados: DadosPessoais) {
    this.$emit("input", dados)
  }

  @Watch("maskedTelefone")
  onMaskedTelefoneChange(celular?: string) {
    this.dados.celular = unmask(celular, this.getCelularMask(celular))
  }

  @Watch("dataNascimentoNaoFormatada")
  onDataNascimentoChange(dataNascimento?: string) {
    this.dados.dataNascimento = dataNascimento?.length === 10 ? ddmmyyyyStringToIso(dataNascimento) : ""
  }

  @Watch("maskedCpf")
  onCpfChange(maskedCpf?: string) {
    const cpf = maskedCpf ? unmask(maskedCpf, "###.###.###-##") : ""

    this.dados.cpf = cpf

    if (!cpf || !isValidCpf(cpf)) {
      this.isCpfEmUso = false
      return
    }

    this.isCheckingCpf = true

    findUserByCpf(cpf)
      .then(user => {
        if (user) this.isCpfEmUso = true
      })
      .catch(err => {
        if (err.statusCode === 404) this.isCpfEmUso = false
      })
      .finally(() => {
        this.isCheckingCpf = false
      })
  }
}
</script>

<template>
  <div>
    <h1 class="text-center headline mb-8">
      Passo 1 - Dados Pessoais
    </h1>

    <v-text-field v-model="dados.nome" :rules="rules.nome" placeholder="Nome" outlined />

    <v-text-field v-model="dados.email" :rules="rules.email" placeholder="Email" outlined />

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
      v-model="maskedCpf"
      v-mask="'###.###.###-##'"
      :rules="[verificaCpf]"
      :loading="isCheckingCpf"
      :error="isCpfEmUso"
      :error-messages="isCpfEmUso ? ['CPF em uso'] : []"
      placeholder="CPF"
      outlined
    />

    <v-text-field
      v-model="dataNascimentoNaoFormatada"
      v-mask="'##/##/####'"
      :rules="rules.dataNascimento"
      placeholder="Data de Nascimento"
      append-icon="mdi-calendar"
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
      v-model="maskedTelefone"
      v-mask="getCelularMask(maskedTelefone)"
      :rules="rules.celular"
      placeholder="Celular"
      outlined
    />
  </div>
</template>
