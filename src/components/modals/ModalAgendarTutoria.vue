<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "ModalAgendarTutoria"
})
export default class ModalAgendarTutoria extends Vue {
  @Prop({ required: true })
  value!: boolean

  ferramentas = ["Foo", "Bar", "Fizz", "Buzz"]

  dataInput = null
  dataMenu = false
  primHorarioInput = null
  segHorarioInput = null
  dialog = false
}
</script>

<template>
  <v-dialog :value="value" width="500" @click:outside="$emit('input', false)">
    <v-card>
      <v-card-title></v-card-title>

      <v-card-text>
        <h4 class="blue--text">Passo 1</h4>
        <h4>Sua tutoria será sobre a seguinte ferramenta</h4>
        <v-select :items="ferramentas" label="Ferramenta" />
      </v-card-text>

      <v-card-text>
        <h4 class="blue--text">Passo 2</h4>
        <h4>Agora escolha a data e horário para a tutoria disponível</h4>
        <v-row>
          <v-col cols="4">
            <v-menu
              v-model="dataMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dataInput"
                  label="Data"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dataInput" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="primMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="primHorario"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="primHorarioInput"
                  label="Inicio"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                format="24hr"
                v-model="primHorarioInput"
                @click:minute="$refs.primMenu.save(primHorarioInput)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="segMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="segHorarioInput"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :disabled="diaTodo"
                  v-model="segHorarioInput"
                  label="Fim"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                format="24hr"
                v-model="segHorarioInput"
                @click:minute="$refs.segMenu.save(segHorarioInput)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="red" text @click="$emit('input', false)">
          Cancelar
        </v-btn>
        <v-dialog :v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="$emit('agendamento-aceito')" color="green" class="white--text" v-bind="attrs" v-on="on">
              <span>Solicitar</span>
            </v-btn>
          </template>
          <v-card>
            <v-img class="mx-auto" width="276" src="@/assets/imagens/Usuário_Desativar.svg" />
            <v-card-title class="font-weight-bold headline d-flex justify-center">
              Tutoria solicitada
            </v-card-title>
            <v-card-text>
              Aguarde que em breve o tutor irá analisar a solicitação e entrará em contato
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
