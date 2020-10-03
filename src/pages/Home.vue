<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ name: "Home" })
export default class PageHome extends Vue {
  @Prop({ default: "default value" }) message!: string;
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="text-center">
      <v-col>
        <h1 v-text="message" />
        <v-btn @click="$router.push({ path: '/login' })">login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
