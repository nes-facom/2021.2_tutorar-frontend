<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({ name: "FormStepNavigator" })
export default class FormStepNavigator extends Vue {
  @Prop({ type: Number, required: true })
  currentStep!: number

  @Prop({ type: Boolean, required: true })
  isCadastrando!: boolean

  /**
   * Objeto cuja keys são os indexes dos passos e os values
   * a validade dos passos respectivos
   *
   * ex: {
   *  1: true
   *  2: false
   * }
   */
  @Prop({ type: Object, required: true })
  stepsValidity!: Record<string, boolean>

  /**
   * Numero do ultimo passo
   */
  get lastStepIndex(): number {
    return Number(
      Object.keys(this.stepsValidity)
        .sort((a: string, b: string) => Number(a) - Number(b))
        .reverse()[0]
    )
  }

  get currentStepIsValid(): boolean {
    return this.stepsValidity[this.currentStep]
  }
}
</script>

<template>
  <v-card-actions class="mb-2 mt-5">
    <v-spacer />
    <!-- :disabled="!stepsValidity[currentStep]" -->
    <v-btn
      color="green"
      class="white--text pl-4"
      @click="currentStep === lastStepIndex ? $emit('cadastro-concluido') : $emit('passo-concluido')"
      :disabled="!stepsValidity[currentStep] || isCadastrando"
      :loading="isCadastrando"
    >
      <span v-text="currentStep === lastStepIndex ? 'Finalizar' : 'Próximo'" />
      <v-icon dark right>mdi-arrow-right</v-icon>
    </v-btn>

    <v-spacer />
  </v-card-actions>
</template>
