<script lang="ts">
import { Professor, Tutor } from "@/store/modules/auth-types"
import { ddmmyyyyStringToIso, yyyymmddToddmm } from "@/utils"
import isValidDdMmYyyy from "@/utils/form/is-valid-dd-mm-yyyy"
import { Vue, Component, Prop, Watch } from "vue-property-decorator"

@Component({
  name: "DadosPessoais"
})
export default class DadosPessoais extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Professor | Tutor

  @Watch("dataNascimentoNaoFormatada")
  onDataNascimentoChange(dataNascimento?: string) {
    this.user.dataNascimento = dataNascimento?.length === 10 ? ddmmyyyyStringToIso(dataNascimento) : ""
  }

  dataNascimentoNaoFormatada = yyyymmddToddmm(this.user.dataNascimento)

  genero = [
    { text: "Masculino", value: "M" },
    { text: "Feminino", value: "F" }
  ]

  rules = {
    nome: [
      (v?: string) => !!v || "Nome é obrigatório",
      (v?: string) => (!!v && v.length >= 6) || "Nome deve ter no minimo 6 caracteres",
      (v?: string) => (!!v && v.length <= 60) || "Nome deve ter no máximo 60 caracteres"
    ],

    dataNascimento: [
      (v?: string) => !!v || "Data de nascimento é obrigatório",
      (v?: string) => {
        if (!v) return "Campo Obrigatório"
        return isValidDdMmYyyy(v) || "Data inválida"
      }
    ],

    genero: [(v?: string) => !!v || "Gênero é obrigatório"]
  }
}
</script>

<template>
  <v-form class="pa-6">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field v-model="user.nome" :rules="rules.nome" :disabled="!isEditing" label="Nome Completo" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="dataNascimentoNaoFormatada"
          v-mask="'##/##/####'"
          :rules="rules.dataNascimento"
          :disabled="!isEditing"
          label="Data de Nascimento"
          append-icon="mdi-calendar"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select v-model="user.genero" :rules="rules.genero" :items="genero" :disabled="!isEditing" label="Gênero" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="user.cpf" label="CPF" disabled />
      </v-col>
    </v-row>
  </v-form>
</template>
