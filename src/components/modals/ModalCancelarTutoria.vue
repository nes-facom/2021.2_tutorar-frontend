<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({ name: "ModalCancelarTutoria" })
export default class ModalCancelarTutoria extends Vue {
  @Prop({ required: true })
  value!: boolean

  cancelarTutoria() {
    this.$emit("input", false)
    this.$emit("cancelamento-confirmado")
  }
}
</script>

<template>
  <v-dialog :value="value" persistent width="500">
    <v-card>
      <v-img class="mx-auto" width="276" src="@/assets/imagens/Tutoria_Cancelada.svg" />
      <v-card-title class="font-weight-bold headline justify-center">
        Cancelar a tutoria ?
      </v-card-title>

      <v-card-text class="text-center">
        O professor Fulano irá receber um aviso sobre o cancelamento, porém tente evita-los.
      </v-card-text>

      <v-card-actions class="px-4 pb-4">
        <v-btn color="grey darken-1" @click="$emit('input', false)" text>Voltar</v-btn>
        <v-spacer />
        <v-btn color="primary" class="white--text" @click="cancelarTutoria">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
