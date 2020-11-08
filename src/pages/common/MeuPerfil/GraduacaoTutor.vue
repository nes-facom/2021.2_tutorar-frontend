<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

@Component({ name: "GraduacaoTutor" })
export default class GraduacaoTutor extends Vue {
  private authModule = getModule(Auth, this.$store)
}
</script>

<template>
  <v-card class="pa-0">xd</v-card>
</template>

<style scoped></style>
