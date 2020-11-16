<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { Tutor } from "@/store/modules/auth-types"

@Component({
  name: "GraduacaoTutor"
})
export default class GraduacaoTutor extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Tutor
}
</script>

<template>
  <v-form class="pa-6">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="user.universidade" :disabled="!isEditing" label="Universidade" />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="user.semestreAtual" :disabled="!isEditing" label="Formação Acadêmica" />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="user.cursoLicensiatura" :disabled="!isEditing" label="Nível Lecionamento" />
      </v-col>

      <v-col v-if="isEditing" class="pb-0 pt-4 text-right" cols="12">
        <v-btn color="success" class="mr-0">
          <span>Concluir Edição</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
