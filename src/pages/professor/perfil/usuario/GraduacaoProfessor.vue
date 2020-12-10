<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { Professor } from "@/store/modules/auth-types"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"
import { ddmmyyyyStringToIso, yyyymmddToddmm } from "@/utils"
import isValidDdMmYyyy from "@/utils/form/is-valid-dd-mm-yyyy"

@Component({ name: "GraduacaoProfessor" })
export default class GraduacaoProfessor extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Professor

  @Watch("dataNaoFormatada")
  handle(dataNascimento?: string) {
    this.user.inicioLecionamento = dataNascimento?.length === 10 ? ddmmyyyyStringToIso(dataNascimento) : ""
  }

  dataNaoFormatada = yyyymmddToddmm(this.user.inicioLecionamento)

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

  rules = {
    inicioLecionamento: [
      (v?: string) => !!v || "Data Obrigatória",
      (v?: string) => {
        if (!v) return "Campo Obrigatório"
        return isValidDdMmYyyy(v) || "Data inválida"
      }
    ]
  }
}
</script>

<template>
  <v-form class="pa-6">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="dataNaoFormatada"
          v-mask="'##/##/####'"
          :rules="rules.inicioLecionamento"
          label="Quando começou a lecionar ?"
          append-icon="mdi-calendar"
          hint="Não precisamos de uma data exata, uma estimativa basta !"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="user.formacaoAcademica"
          :items="opcoes.formacaoAcademica"
          :rules="rules.campoObrigatorio"
          :disabled="!isEditing"
          label="Formação Acadêmica"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="user.nivelLecionamento"
          :items="opcoes.nivelLecionamento"
          :rules="rules.campoObrigatorio"
          :disabled="!isEditing"
          label="Nível Lecionamento"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
