<script lang="ts">
import Auth from "@/store/modules/auth"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

const ModalRegistrarTutoria = () => import("@/components/modals/ModalRegistrarTutoria.vue")

@Component({
  name: "Tutorias",
  components: { ModalRegistrarTutoria }
})
export default class Tutorias extends Vue {
  authModule = getModule(Auth, this.$store)

  showModalRegitrarTutoria = false
  dialog = false

  headers = [
    {
      text: "Avatar",
      value: "avatar",
      sortable: false,
      align: "start"
    },
    {
      text: "Nome",
      value: "nome"
    },
    {
      text: "Data",
      value: "data"
    },
    {
      text: "Horário",
      value: "horario"
    },
    {
      text: "Assunto",
      value: "assunto"
    },
    {
      text: "",
      value: "acao"
    }
  ]

  tutorias = [
    {
      nome: "Miguel dos Santos",
      data: "07/09/2020",
      horario: "07h00 às 9h00",
      assunto: "Google Drive",
      temRegistro: false
    }
  ]

  registrarTutoria(tutoria: any) {
    this.showModalRegitrarTutoria = true
  }

  editarTutoria(tutoria: any) {
    this.showModalRegitrarTutoria = true
  }
}
</script>

<template>
  <v-data-table :headers="headers" :items="tutorias" :items-per-page="10" class="" fixed-header height="40em">
    <template v-slot:[`item.avatar`]>
      <v-avatar size="36px">
        <v-img src="@/assets/dog.jpg" />
      </v-avatar>
    </template>

    <template v-slot:[`item.acao`]>
      <div class="buttonWrapper">
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" text color="#106CE5" v-bind="attrs" v-on="on"> Registrar tutoria </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h6"> Registrar tutoria </v-card-title>
            <div class="infosTutoria">
              <div class="itemInfo">
                <p class="subtitle1 titleInfo">Professor:</p>
                <p class="textInfo">Robertinho inho</p>
              </div>
              <div class="itemInfo">
                <p class="subtitle1 titleInfo">Horário:</p>
                <p class="textInfo">14h00 às 15h00</p>
              </div>
              <div class="itemInfo">
                <p class="subtitle1 titleInfo">Data:</p>
                <p class="textInfo">20/10/2010</p>
              </div>
            </div>

            <div class="titleAndRadioButtons">
              <h6 class="subtitle1">O professor compareceu a reunião?</h6>
              <v-radio-group >
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
              <h6 class="subtitle1 textArea">Descreva como foi a reunião: </h6>
              <v-textarea
                auto-grow
                name="input"
                outlined
                no-resize
              ></v-textarea>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#106CE5" outlined @click="dialog = false"> Cancelar </v-btn>
              <v-btn class="btnTextWhite" color="#106CE5" @click="dialog = false"> Registrar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-data-table>
</template>

<style lang = "scss" >
.buttonWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.modalRegistrarTutoria {
  display: flex;
  flex-direction: column;
  width: 600px;
}
.btnTextWhite {
  color: white !important;
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
.textArea{
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