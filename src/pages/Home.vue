<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component({ name: "Home" })
export default class PageHome extends Vue {}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="text-center">
      <v-col>
        <v-btn @click="$router.push({ path: '/login' })">login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
