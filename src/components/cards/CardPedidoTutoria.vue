<script lang="ts">
import { getApropriateTelefoneMask } from "@/utils/inputs/mask"
import { Vue, Component } from "vue-property-decorator"

const ModalCancelarTutoria = () => import("@/components/modals/ModalCancelarTutoria.vue")

@Component({
  name: "CardPedidoTutoria",
  components: { ModalCancelarTutoria }
})
export default class CardPedidoTutoria extends Vue {
  telefone = "67998801996"

  showModalCancelarTutoria = false

  openTutorWhatsAppLink() {
    window.open(`https://wa.me/55${this.telefone}_blank`)
  }

  get mascaraTelefone(): string {
    return getApropriateTelefoneMask(this.telefone)
  }
}
</script>

<template>
  <v-card color="grey lighten-4" min-width="350px" width="400px" flat>
    <v-toolbar color="green white--text" class="px-4" flat>
      <v-toolbar-title>Tutoria Agendada</v-toolbar-title>
    </v-toolbar>

    <div>
      <v-row class="px-4">
        <v-col cols="3">
          <v-avatar size="100%">
            <v-img src="@/assets/dog.jpg" />
          </v-avatar>
        </v-col>
        <v-col cols="9" align-self="center">
          <h4>Fulano gostaria de agendar uma tutoria no dia 20/10/20 às 18:30.</h4>
        </v-col>
      </v-row>

      <v-row class="px-4 pt-0" no-gutters>
        <v-col cols="6">
          <h5>Telefone</h5>
          <a @click="openTutorWhatsAppLink">{{ telefone | VMask(mascaraTelefone) }}</a>
        </v-col>
        <v-col cols="6">
          <h5>Email</h5>
          <span>fulano.prof@gmail.com</span>
        </v-col>
      </v-row>
    </div>

    <v-card-actions class="mt-2">
      <v-spacer />
      <v-btn color="red lighten-2" text @click="showModalCancelarTutoria = true">Cancelar Tutoria</v-btn>
      <v-btn color="green" text>OK</v-btn>
    </v-card-actions>

    <ModalCancelarTutoria v-model="showModalCancelarTutoria" @cancelamento-confirmado="$log('wew')" />
  </v-card>
</template>
