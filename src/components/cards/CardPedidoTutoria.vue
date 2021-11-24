<script lang="ts">
import { getApropriateTelefoneMask } from "@/utils/inputs/mask"
import { Vue, Component, Prop} from "vue-property-decorator"

@Component({
  name: "CardPedidoTutoria"
})
export default class CardPedidoTutoria extends Vue {
  @Prop({ required: true })
  telefone!: string

  @Prop({ required: true })
  professorEmail!: string

  @Prop({ required: false })
  professorFoto!: string

  @Prop({ required: true })
  professorNome!: string

  @Prop({ required: true })
  tutoriaInicio?: string
  @Prop({ required: true })
  tutoriaFim?: string

  @Prop({ required: true })
  showModalTutoria?: string

  @Prop({ required: true })
  assuntoDaTutoria?: string

  @Prop({ required: true })
  fotoDoProfessor?: any

  dialog = true

  openTutorWhatsAppLink() {
    window.open(`https://wa.me/55${this.telefone}_blank`)
  }

  formataStringDataToBr(timestamp: string) {
    const ano  = timestamp.split("-")[0];
    const mes  = timestamp.split("-")[1];
    const dia  = timestamp.split("-")[2];

    return dia + '/' + ("0"+mes).slice(-2) + '/' + ("0"+ano).slice(-2);
  }

  get mascaraTelefone(): string {
    return getApropriateTelefoneMask(this.telefone)
  }

  get dataFormatada(): string{
    if (this.tutoriaInicio){
      return this.formataStringDataToBr(this.tutoriaInicio.split(" ")[0].trim())
    } else if (this.tutoriaFim){
      return this.formataStringDataToBr(this.tutoriaFim.split(" ")[0].trim())
    }
    return ''
  }

  get horaInicioFormatada(): string{
    if (this.tutoriaInicio){
      return this.tutoriaInicio.split(" ")[1].trim()
    }
    return ''
  }

  get horaFimFormatada(): string{
    if (this.tutoriaFim){
      return this.tutoriaFim.split(" ")[1].trim()
    }
    return ''
  }

  updateShowModal() {
      // Emite um evento partindo do child para ser capturado pelo parent
      this.$emit('update-modal-tutoria', !this.showModalTutoria)
  }

}
</script>

<template>
  <v-card  color="grey lighten-4" min-width="350px" width="500px" flat>
    <v-toolbar color="green white--text" class="px-4" flat>
      <v-toolbar-title>Tutoria Agendada</v-toolbar-title>
    </v-toolbar>

    <div>
      <v-row class="px-4">
        <v-col cols="3">
          <v-avatar size="100%">
            <v-img :src="fotoDoProfessor" lazy-src="@/assets/dog.jpg"/>
          </v-avatar>
        </v-col>
        <v-col cols="9" align-self="center">
          <h4>{{ professorNome }} possui uma tutoria agendada com você dia {{ dataFormatada }} das {{ horaInicioFormatada }} ás {{ horaFimFormatada}}.</h4>
        </v-col>
      </v-row>

      <v-row class="px-4 pt-0" no-gutters>
        <v-col cols="6">
          <h5>Telefone</h5>
          <a @click="openTutorWhatsAppLink">{{ telefone | VMask(mascaraTelefone) }}</a>
        </v-col>
        <v-col cols="10">
          <h5>Email</h5>
          <span>{{ professorEmail }}</span>
        </v-col>
        <v-col cols="12">
          <h5>Assunto</h5>
          <span>{{ assuntoDaTutoria }}</span>
        </v-col>
      </v-row>
    </div>

    <v-card-actions class="mt-2">
      <v-spacer> </v-spacer>
      <v-btn color="green" @click="updateShowModal()" text>OK</v-btn>
    </v-card-actions>

  </v-card>
</template>
