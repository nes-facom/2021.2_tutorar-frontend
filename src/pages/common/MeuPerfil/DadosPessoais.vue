<script lang="ts">
import Auth, { Professor, Tutor } from "@/store/modules/auth-types"
import { getModule } from "vuex-module-decorators"
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "DadosPessoais"
})
export default class DadosPessoais extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Professor | Tutor
}
</script>

<template>
  <v-form class="pa-6">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field v-model="user.nome" :disabled="!isEditing" label="Nome Completo" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="user.dataNascimento" label="Data Nascimento" :disabled="!isEditing" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="user.genero" label="Gênero" :disabled="!isEditing" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="user.cpf" label="CPF" :disabled="!isEditing" />
      </v-col>

      <v-col cols="12">
        <span class="subtitle-1 font-weight-light grey--text">Sobre Mim</span>
        <v-textarea
          @input="user.descricao = $event"
          :value="user.descricao || 'Digite uma descrição e enriqueça seu perfil !'"
          :disabled="!isEditing"
          rows="3"
          hide-details
        />
      </v-col>

      <v-col v-if="isEditing" class="pb-0 pt-4 text-right" cols="12">
        <v-btn color="success" class="mr-0">
          <span>Concluir Edição</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
