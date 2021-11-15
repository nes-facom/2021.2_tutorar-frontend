<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import TutoriaModule from "@/store/modules/tutoria-module"


@Component({ name: "ModalCancelarTutoria" })
export default class ModalCancelarTutoria extends Vue {
  tutoriaModule = getModule(TutoriaModule, this.$store)
  
  dialog = false
  @Prop({ required: true })
  tutoriaId!: string  

  cancelarTutoria() {
    this.$emit("input", false)
    this.$emit("cancelamento-confirmado")
  }
  
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" outlined color="#106CE5" v-bind="attrs" v-on="on"> Rejeitar tutoria </v-btn>
    </template>
    <v-card class="modal">
      <v-card-title class="cardTitle"> Deseja mesmo rejeitar a tutoria? </v-card-title>

      <v-card-text class="text-center"> A solicitação será excluída e a ação não poderá ser desfeita. </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#106CE5" outlined @click="dialog = false"> Cancelar </v-btn>
        <v-btn class="btnTextWhite" color="#106CE5" v-on:click="(event) => this.$emit('inputChange', event)" @click="dialog = false"> Rejeitar </v-btn>
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
</style>