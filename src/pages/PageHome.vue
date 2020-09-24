<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ name: "Home" })
export default class PageHome extends Vue {
  @Prop() message!: string;
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="text-center">
      <v-col>
        <h1 v-text="message" />
      </v-col>
    </v-row>
  </v-container>
</template>
