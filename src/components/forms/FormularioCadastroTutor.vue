<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "FormularioCadastroTutorando" })
export default class FormularioCadastroTutorando extends Vue {
  currentStep = 1;

  isFormValid = false;

  // Criar tipagem
  user = {
    cpf: "",
    nome: "",
    genero: "",
    celular: "",
    dataNascimento: ""
  };

  genero = ["Masculino", "Feminino", "Prefiro não informar"];

  rules = {
    nome: [
      (v: string) => !!v || "Nome é obrigatório",
      (v: string) => v.length >= 6 || "Nome deve ter no minimo 6 caracteres",
      (v: string) => v.length <= 60 || "Nome deve ter no máximo 60 caracteres"
    ],
    email: [
      (v: string) => !!v || "E-mail é obrigatório",
      (v: string) => /.+@.+/.test(v) || "E-mail inválido"
    ]
  };

  $refs!: {
    registerForm: HTMLFormElement;
  };

  getCelularMask(telefone: string) {
    if (!telefone) return "(##) ####-####";
    return telefone.length > 14 ? "(##) #####-####" : "(##) ####-####";
  }
}
</script>

<template>
  <v-card width="400" class="pa-6 elevation-6">
    <v-form v-model="isFormValid" ref="registerForm">
      <v-window v-model="currentStep">
        <v-window-item>
          <h1
            class="text-center headline mb-8"
            @click="$refs['registerForm'].validate()"
          >
            Passo 1 - Dados Pessoais
          </h1>

          <v-text-field
            v-model="user.nome"
            :rules="rules.nome"
            placeholder="Nome"
            outlined
          />

          <v-text-field
            v-model="user.email"
            :rules="rules.email"
            placeholder="Email"
            outlined
          />

          <v-text-field
            v-model="user.cpf"
            v-mask="'###.###.###-##'"
            placeholder="CPF"
            outlined
          />

          <v-text-field
            v-model="user.dataNascimento"
            v-mask="'##/##/####'"
            placeholder="Data de Nascimento"
            outlined
          />

          <v-select
            v-model="user.genero"
            :items="genero"
            placeholder="Gênero"
            required
            outlined
          />

          <v-text-field
            v-model="user.celular"
            v-mask="getCelularMask(user.celular)"
            placeholder="Celular"
            outlined
          />

          <v-divider class="mt-4 mb-8" />

          <v-card-actions class="ma-0 pa-0">
            <v-btn
              dark
              class="pr-4"
              color="indigo lighten-2"
              @click="$emit('go-back')"
            >
              <v-icon dark left>
                mdi-arrow-left
              </v-icon>
              Voltar
            </v-btn>

            <v-spacer />

            <v-btn
              color="green"
              class="white--text pl-4"
              @click="currentStep++"
            >
              Próximo
              <v-icon dark right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
    </v-form>
  </v-card>
</template>
