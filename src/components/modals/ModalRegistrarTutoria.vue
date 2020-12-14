<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "ModalRegistrarTutoria"
})
export default class ModalRegistrarTutoria extends Vue {
  @Prop({ required: true })
  value!: boolean

  ferramentas = ["Foo", "Bar", "Fizz", "Buzz"]
  canalComunicacao = ["Foo1", "Bar1", "Fizz1", "Buzz1"]
  tempoDuracao = ["Foo2", "Bar2", "Fizz2", "Buzz2"]

  dialog = false
  dataMenu = false
  dataInput = null
  segHorarioInput = null
  primHorarioInput = null
}
</script>

<template>
  <v-dialog :value="value" persistent width="530">
    <v-card>
      <v-card-title />

      <v-card-text>
        <h4 class="blue--text">Informações sobre a Tutoria</h4>
        <v-row>
          <v-col cols="3">
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
          <v-col cols="3">
            <v-menu
              ref="primMenu"
              :close-on-content-click="false"
              :nudge-right="40"
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
          <v-col cols="3">
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
          <v-col cols="3">
            <v-select :items="ferramentas" label="Ferramenta" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <h4 class="blue--text">Registro da Tutoria</h4>
        <v-row>
          <v-col cols="5">
            <v-select :items="canalComunicacao" label="Canal de Comunicação" />
          </v-col>
          <v-col cols="5">
            <v-select :items="tempoDuracao" label="Tempo de Duração" />
          </v-col>
        </v-row>
        <h4 class="blue--text">Descrição</h4>
        <v-textarea label="Descrição" counter maxlength="1000"></v-textarea>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="red" text @click="$emit('input', false)">
          Cancelar
        </v-btn>
        <v-btn color="green" class="white--text" @click="$emit('input', false)">
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
