<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { Professor } from "@/store/modules/auth-types"

@Component({ name: "GraduacaoProfessor" })
export default class GraduacaoProfessor extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Professor
}
</script>

<template>
  <v-form class="pa-6">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="user.dataInicioEnsino" :disabled="!isEditing" label="Data Início Ensino" />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="user.formacaoAcademica" label="Formação Acadêmica" :disabled="!isEditing" />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="user.nivelLecionamento" label="Nível Lecionamento" :disabled="!isEditing" />
      </v-col>

      <v-col v-if="isEditing" class="pb-0 pt-4 text-right" cols="12">
        <v-btn color="success" class="mr-0">
          <span>Concluir Edição</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
