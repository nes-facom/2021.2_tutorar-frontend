<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({ name: "ModalRegistrarTutoria" })
export default class ModalRegistrarTutoria extends Vue {
  dialog = false

  @Prop({ required: true })
  nome!: string

  @Prop({ required: true })
  data!: string

  @Prop({ required: true })
  horario!: string

  registrarTutoria() {
    this.$emit("input", false)
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="550" max-height="250">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2 btnTextWhite" color="#106CE5" v-bind="attrs" v-on="on"> Registrar tutoria </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h6"> Registrar tutoria </v-card-title>
      <div class="infosTutoria">
        <div class="itemInfo">
          <p class="subtitle1 titleInfo">Professor:</p>
          <p class="textInfo">{{ nome }}</p>
        </div>
        <div class="itemInfo">
          <p class="subtitle1 titleInfo">Horário:</p>
          <p class="textInfo">{{ horario }}</p>
        </div>
        <div class="itemInfo">
          <p class="subtitle1 titleInfo">Data:</p>
          <p class="textInfo">{{ data }}</p>
        </div>
      </div>

      <div class="titleAndRadioButtons">
        <h6 class="subtitle1">O professor compareceu a reunião?</h6>
        <v-radio-group>
          <v-radio value="Sim">
            <template v-slot:label>
              <div class="radioButton">Sim</div>
            </template>
          </v-radio>
          <v-radio value="Não">
            <template v-slot:label>
              <div class="radioButton">Não</div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
      <div class="titleAndTextArea">
        <h6 class="subtitle1 textArea">Descreva como foi a reunião:</h6>
        <v-textarea auto-grow name="input" outlined no-resize></v-textarea>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#106CE5" outlined @click="dialog = false"> Cancelar </v-btn>
        <v-btn
          class="btnTextWhite"
          color="#106CE5"
          v-on:click="event => this.$emit('inputChange', event)"
          @click="dialog = false"
        >
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang = "scss" >
.buttonWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.btnTextWhite {
  color: white !important;
  width: 200px;
}
.infosTutoria {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 24px;
  margin-right: 24px;
}
.subtitle1 {
  font-weight: 400;
  line-height: 18, 75px;
  letter-spacing: 0.15px;
  font-size: 16px;
}
.titleAndRadioButtons {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.radioButton {
  font-size: 14px;
}
.textArea {
  margin-bottom: 16px;
}

.titleAndTextArea {
  margin-left: 20px;
  margin-right: 20px;
}
.titleInfo {
  margin-right: 8px;
}
.textInfo {
  font-size: 13px;
  color: green;
}

.itemInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>