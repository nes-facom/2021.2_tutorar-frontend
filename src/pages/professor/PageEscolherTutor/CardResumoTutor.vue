<script lang="ts">
import { Tutor } from "@/store/modules/auth-types"
import { Vue, Component, Prop } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import TutorModule from "@/store/modules/tutor-module"

@Component({
  name: "CardResumoTutor"
})
export default class CardResumoTutor extends Vue {
  @Prop({ required: true, type: Object })
  tutor!: Tutor

  tutorModule = getModule(TutorModule, this.$store)

  habilidadesChipColors = ["red", "green", "purple", "orange", "indigo"]

  irPerfilTutor() {
    this.$router.push({ path: `/tutor/${this.tutor._id}/perfil` })
  }
}
</script>

<template>
  <v-card width="370" style="border-radius: 12px">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate />
    </template>

    <!-- @TODO colocar o placeholder em lazy src quando as meninas acharem uma imagem legal -->
    <v-img
      class="align-end"
      height="200px"
      :src="tutor.fotoPerfil"
      lazy-src="@/assets/taylor.jpg"
      gradient="to top right, rgba(100,100,100,.9), rgba(0,0,0,.0)"
    >
      <v-card-title class="white--text font-weight-bold" v-text="tutor.nome" />
      <v-card-subtitle class="white--text font-weight-bold" style="font-size: 16px" v-text="tutor.universidade" />
    </v-img>

    <v-divider class="mx-4" />

    <div class="px-4 pt-4 pb-2">
      <v-icon class="mr-3">mdi-account-details</v-icon>
      <span class="pb-0 subtitle font-weight-medium grey--text">Habilidades</span>
    </div>

    <v-chip-group multiple class="mx-4">
      <v-chip
        v-for="(habilidade, i) in tutorModule.habilidadesTutor(tutor._id)"
        v-text="habilidade.nome"
        :key="habilidade._id"
        :color="`${habilidadesChipColors[i]} white--text`"
      />
    </v-chip-group>

    <v-card-actions class="pt-4">
      <v-spacer />

      <v-btn color="green lighten-1" @click="irPerfilTutor" text>
        <v-icon class="mr-3" color="green">mdi-account</v-icon>
        <span class="pb-0 subtitle green--text" @click="irPerfilTutor">Ver Perfil</span>
      </v-btn>

      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
