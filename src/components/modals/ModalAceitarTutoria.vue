<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "ModalAceitarTutoria"
})
export default class ModalAceitarTutoria extends Vue {
  @Prop({ required: true })
  value!: boolean

  @Prop({ type: String, default: "6798801996" })
  telefone!: string

  openTutorWhatsAppLink() {
    window.open(`https://wa.me/55${this.telefone}`)
  }

  get telefoneFilter(): string {
    if (this.telefone.length <= 8) return "####-####"
    if (this.telefone.length === 9) return "#####-####"
    if (this.telefone.length === 10) return "(##) ####-####"
    return "(##) #####-####"
  }
}
</script>

<template>
  <v-dialog :value="value" width="500" @click:outside="$emit('input', false)">
    <v-card>
      <v-card-title>
        <v-avatar size="100">
          <v-img src="@/assets/dog.jpg" />
        </v-avatar>
        <p class="ml-3">
          <span class="grey--text text--darken-1">Nova solicitação de tutoria !</span>
          <br />
          <span>Ciclano da Silva</span>
        </p>
      </v-card-title>

      <v-card-text>
        Professor de letras @UFMS paixão por ensino blablabla, sempre disposta a novos desafios !
      </v-card-text>

      <div class="pl-6">
        <v-icon left>mdi-calendar</v-icon>
        <span>10/10</span>
        <v-icon left class="ml-8">mdi-clock</v-icon>
        <span>18:30</span>
      </div>

      <v-row class="px-6 pb-6 " no-gutters>
        <v-col cols="6">
          <v-card-subtitle class="pl-0 pb-2">
            <span>Telefone</span>
          </v-card-subtitle>
          <span v-if="telefone.length" @click="openTutorWhatsAppLink">
            {{ telefone | VMask(telefoneFilter) }}
          </span>
        </v-col>
        <v-col cols="6">
          <v-card-subtitle class="pl-0 pb-2">
            <span>Email</span>
          </v-card-subtitle>
          <span>prof_cliclano@gmail.com</span>
        </v-col>
      </v-row>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="red" text @click="$emit('input', false)">
          Cancelar
        </v-btn>
        <v-btn color="green" class="white--text" @click="$emit('tutoria-aceita')">
          Aceitar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
