<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "CardResumoTutor"
})
export default class CardResumoTutor extends Vue {
  model = null
}
</script>

<template>
  <v-card width="370" style="border-radius: 12px">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img
      class="align-end"
      height="200px"
      src="@/assets/taylor.jpg"
      gradient="to top right, rgba(100,100,100,.9), rgba(0,0,0,.0)"
    >
      <v-card-title class="white--text font-weight-black">Fulana da Silva</v-card-title>
      <v-card-subtitle class="white--text font-weight-bold">Letras - UFMS</v-card-subtitle>
    </v-img>

    <v-divider class="mx-4" />

    <div class="px-4 pt-4 pb-2">
      <v-icon class="mr-3">mdi-account-details</v-icon>
      <span class="pb-0 subtitle font-weight-medium grey--text">Habilidades</span>
    </div>
    <v-chip-group multiple class="mx-4">
      <v-chip color="red white--text">Google Meets</v-chip>
      <v-chip color="green white--text">Figma</v-chip>
      <v-chip color="purple white--text">Excel</v-chip>
      <v-chip color="orange white--text">Adobe XD</v-chip>
    </v-chip-group>

    <v-card-actions class="pt-4">
      <v-btn text>
        <v-icon class="mr-3" color="grey">mdi-calendar-clock</v-icon>
        <span class="pb-0 subtitle grey--text">Ver Horários</span>
      </v-btn>

      <v-spacer />

      <v-btn color="green lighten-2" text>
        Agendar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
