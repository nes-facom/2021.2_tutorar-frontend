<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { User } from "@/store/modules/auth-types"
import isValidDdMmYyyy from "@/utils/form/is-valid-dd-mm-yyyy"
import siglasUniversidades from "@/utils/autocomplete/siglas-universidades"
import { ddmmyyyyStringToIso, yyyymmddToddmm } from "@/utils"

const DialogDesativacaoConta = () => import("@/components/dialogs/DialogDesativacaoConta.vue")
const DialogAlterarSenha = () => import("@/components/dialogs/DialogAlterarSenha.vue")

@Component({
  name: "TabDadosUsuarioTutor",
  components: { DialogDesativacaoConta, DialogAlterarSenha }
})
export default class TabDadosUsuarioTutor extends Vue {
  @Prop({ type: Boolean, required: true })
  isEditing!: boolean

  @Watch("dataNascimentoNaoFormatada")
  onDataNascimentoChange(dataNascimento?: string) {
    this.user.dataNascimento = dataNascimento?.length === 10 ? ddmmyyyyStringToIso(dataNascimento) : ""
  }

  authModule = getModule(Auth, this.$store)

  tab = 0

  siglasUniversidades = siglasUniversidades

  userCopy: User = { ...this.authModule.user } as User

  isSavingUsuario = false

  dialogAlterarSenha = false
  dialogDesativacaoConta = false

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

    email: [
      (v?: string) => !!v || "E-mail é obrigatório",
      (v?: string) => (!!v && /.+@.+/.test(v)) || "E-mail inválido"
    ],

    dataNascimento: [
      (v?: string) => !!v || "Data de nascimento é obrigatório",
      (v?: string) => {
        if (!v) return "Campo Obrigatório"
        return isValidDdMmYyyy(v) || "Data inválida"
      }
    ],

    genero: [(v?: string) => !!v || "Gênero é obrigatório"],

    celular: [
      (v?: string) => !!v || "Celular é obrigatório",
      (v?: string) => (!!v && v.length >= 14) || "Número inválido"
    ],

    semestreAtual: [(v?: number) => (!!v && v >= 1 && v <= 16) || "Número inválido"]
  }

  get canEditUser() {
    return this.tab > 0
  }

  get user() {
    return this.isEditing ? this.userCopy : (this.authModule.user as User)
  }

  toggleEditMode() {
    this.userCopy = { ...this.authModule.user } as User
    this.isEditing = !this.isEditing
  }

  updateUsuario() {
    this.isSavingUsuario = true

    this.authModule
      .updateUser({ id: this.user._id, user: this.user })
      .then(() => {
        this.$emit("finished-editing")
      })
      .finally(() => {
        this.isSavingUsuario = false
      })
  }
}
</script>

<template>
  <v-form class="px-6 pb-6 pt-2">
    <v-card-title class="pa-0 grey--text text--darken-1">Dados Pessoais</v-card-title>
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

    <v-row>
      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="user.universidade"
          :items="siglasUniversidades"
          :rules="rules.campoObrigatorio"
          :disabled="!isEditing"
          label="Universidade"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="user.semestreAtual"
          :rules="rules.semestreAtual"
          :disabled="!isEditing"
          label="Semestre Atual"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="user.cursoLicensiatura" :disabled="!isEditing" label="Nível Lecionamento" />
      </v-col>
    </v-row>

    <v-card-title class="px-0 pb-0 pt-2 grey--text text--darken-1">Dados de Usuário</v-card-title>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field v-model="user.email" :disabled="!isEditing" label="E-mail" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="user.celular" :disabled="!isEditing" label="Celular" />
      </v-col>
    </v-row>

    <v-card-actions class="pa-0">
      <v-btn :disabled="isEditing" @click="dialogDesativacaoConta = true" color="red" class="mr-4 white--text">
        <span>Desativar Conta</span>
      </v-btn>

      <v-btn :disabled="isEditing" @click="dialogAlterarSenha = true" color="primary" class="white--text">
        <span>Alterar Senha</span>
      </v-btn>

      <v-spacer />

      <v-btn v-if="isEditing" :loading="isSavingUsuario" color="success" @click="updateUsuario">
        <span>Concluir Edição</span>
      </v-btn>
    </v-card-actions>

    <DialogDesativacaoConta v-model="dialogDesativacaoConta" />
    <DialogAlterarSenha v-model="dialogAlterarSenha" />
  </v-form>
</template>

<style scoped>
v-text-field {
  border-style: none;
}
</style>
