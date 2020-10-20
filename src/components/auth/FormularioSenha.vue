<script lang="ts">
import { StringFieldRules } from "@/utils/form"
import { Vue, Component, Watch } from "vue-property-decorator"

@Component({ name: "FormularioSenha" })
export default class FormularioSenha extends Vue {
  senha = ""
  confirmacaoSenha = ""

  showSenha = false

  rules: StringFieldRules = [
    v => !!v || "Campo Obrigatório",
    v => (!!v && v.length >= 6) || "Senha deve ter no minimo 6 caracteres",
    v => (!!v && v.length < 60) || "Senha deve ter no minimo 60 caracteres"
  ]

  get errosConfirmacaoSenha(): string[] {
    const erros = []

    // Só valido se o usuário já digitou uma senha
    if (!this.confirmacaoSenha && this.senha) {
      erros.push("Por favor confirme sua senha")
    }

    if (this.confirmacaoSenha !== this.senha) {
      erros.push("Senhas não conferem")
    }

    return erros
  }

  @Watch("senha")
  onSenhaChange(value: string | undefined) {
    this.$emit("input", value)
  }
}
</script>

<template>
  <div>
    <h1 class="text-center headline mb-8">
      Passo 3 - Definir Senha
    </h1>
    <v-text-field
      v-model="senha"
      :rules="rules"
      :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showSenha = !showSenha"
      hint="Mínimo de 6 caracteres"
      :type="showSenha ? 'text' : 'password'"
      placeholder="Senha"
      outlined
    />
    <v-text-field
      v-model="confirmacaoSenha"
      append-icon="mdi-lock"
      type="password"
      placeholder="Confirmar Senha"
      :error-messages="errosConfirmacaoSenha"
      outlined
    />
  </div>
</template>
