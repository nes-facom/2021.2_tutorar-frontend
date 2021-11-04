<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({ name: "ModalCancelarTutoria" })
export default class ModalCancelarTutoria extends Vue {
  dialog = false
  @Prop({ required: true })
  value!: boolean

  cancelarTutoria() {
    this.$emit("input", false)
    this.$emit("cancelamento-confirmado")
  }
}
</script>

<template>
  <v-dialog :value="value" v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" outlined color="#106CE5" v-bind="attrs" v-on="on"> Rejeitar tutoria </v-btn>
    </template>
    <v-card class="modal">
      
      <v-card-title class="cardTitle"> Deseja mesmo rejeitar a tutoria? </v-card-title>

      <v-card-text class="text-center"> O professor Fulano irá receber um aviso sobre o cancelamento. </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#106CE5" outlined @click="dialog = false"> Cancelar </v-btn>
        <v-btn class="btnTextWhite" color="#106CE5" @click="dialog = false"> Rejeitar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang = "scss" >
.modal{
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-end;
height: 200px;
}
.cardTitle{
width: 100%;
justify-content: start;
}
</style>