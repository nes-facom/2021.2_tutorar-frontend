<script lang="ts">
import Auth from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";
import FormularioLogin from "@/components/forms/FormularioLogin.vue";
import FormularioCadastroTutor from "@/components/forms/FormularioCadastroTutor.vue";
import FormularioRecuperarSenha from "@/components/forms/FormularioRecuperarSenha.vue";
import FormularioCadastroProfessor from "@/components/forms/FormularioCadastroProfessor.vue";
import FormularioEscolherTipoCadastro from "@/components/forms/FormularioEscolherTipoCadastro.vue";

type tipoFormulario =
  | "login"
  | "selecionar-cadastro"
  | "cadastro-professor"
  | "cadastro-tutor"
  | "recuperar-senha";

@Component({
  name: "PageLogin",
  components: {
    FormularioLogin,
    FormularioCadastroTutor,
    FormularioRecuperarSenha,
    FormularioCadastroProfessor,
    FormularioEscolherTipoCadastro
  }
})
export default class PageLogin extends Vue {
  formularioAtual: tipoFormulario = "login";
}
</script>

<template>
  <v-container fill-height>
    <v-row align="center" justify="end">
      <v-col cols="auto">
        <FormularioLogin
          v-if="formularioAtual === 'login'"
          @register-clicked="formularioAtual = 'selecionar-cadastro'"
          @forgot-password-clicked="formularioAtual = 'selecionar-cadastro'"
        />

        <FormularioEscolherTipoCadastro
          @go-back="formularioAtual = 'login'"
          @chose-tutor="formularioAtual = 'cadastro-tutor'"
          v-else-if="formularioAtual === 'selecionar-cadastro'"
        />

        <FormularioCadastroProfessor
          @go-back="formularioAtual = 'login'"
          v-else-if="formularioAtual === 'cadastro-professor'"
        />

        <FormularioCadastroTutor
          @go-back="formularioAtual = 'login'"
          v-else-if="formularioAtual === 'cadastro-tutor'"
        />

        <FormularioRecuperarSenha
          @go-back="formularioAtual = 'login'"
          v-else-if="formularioAtual === 'recuperar-senha'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
