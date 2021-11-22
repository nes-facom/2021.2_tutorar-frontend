<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({ name: "ModalAceitarTutoria" })

export default class ModalAceitarTutoria extends Vue {
  dialog = false
  @Prop({ required: true })
  tutoriaId!: string

  aceitarTutoria() {
    this.$emit("input", false)
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="450" max-height="250">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2 btnAceitarTutoria" color="#106CE5" v-bind="attrs" v-on="on"> Aceitar tutoria </v-btn>
    </template>
    <v-card class="modal">
      <v-card-title class="cardTitle"> Deseja aceitar a tutoria? </v-card-title>

      <v-card-text class="text-center"> A solicitação será aceita e a ação não poderá ser desfeita. </v-card-text>
      <v-card-actions>
        <v-btn color="#106CE5" outlined @click="dialog = false"> Cancelar </v-btn>
        <v-btn class="btnTextWhite" color="#106CE5" v-on:click="(event) => this.$emit('inputChange', event)" @click="dialog = false"> Aceitar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang = "scss" >
.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
}
.cardTitle {
  width: 100%;
  justify-content: start;
}

.btnTextWhite {
  color: white !important;
  width: 200px;
}

.btnAceitarTutoria {
  color: white !important;
  width: 170px;
}
</style>