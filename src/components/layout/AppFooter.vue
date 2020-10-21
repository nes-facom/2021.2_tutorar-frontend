<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

interface Link {
  href: string
  text: string
}

@Component({ name: "AppFooter" })
export default class AppFooter extends Vue {
  links: Link[] = [
    { href: "#", text: "Ajuda" },
    { href: "#", text: "Sobre Nós" },
    { href: "#", text: "Notícias" },
    { href: "#", text: "Licenças" }
  ]
}
</script>

<template>
  <v-footer app inset padless absolute color="white" style="border-top: 1px solid #e2e2e2 !important;">
    <v-row class="p-0 ma-0">
      <v-col v-for="(link, i) in links" :key="i" cols="auto">
        <a :href="link.href" class="mx-2" v-text="link.text" />
      </v-col>

      <v-spacer class="hidden-sm-and-down" />

      <v-col cols="auto">
        <span>Feito com</span>
        <v-icon color="red" size="18" class="mx-2">mdi-heart</v-icon>
        <span>por</span>
        <a class="mx-2" href="#">FACOM - UFMS</a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style lang="sass" scoped>
a
  text-decoration: none
</style>
