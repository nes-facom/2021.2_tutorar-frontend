<script lang="ts">
import { Professor, Tutor } from "@/store/modules/auth-types"
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "DadosUsuario"
})
export default class DadosUsuario extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Tutor | Professor

  rules = {
    email: [
      (v?: string) => !!v || "E-mail é obrigatório",
      (v?: string) => (!!v && /.+@.+/.test(v)) || "E-mail inválido"
    ],

    celular: [
      (v?: string) => !!v || "Celular é obrigatório",
      (v?: string) => (!!v && v.length >= 14) || "Número inválido"
    ]
  }
}
</script>

<template>
  <v-row class="pa-6">
    <v-col cols="12" md="3">
      <v-text-field v-model="user.email" :disabled="!isEditing" label="E-mail" />
    </v-col>

    <v-col cols="12" md="3">
      <v-text-field v-model="user.celular" :disabled="!isEditing" label="Celular" />
    </v-col>
  </v-row>
</template>
