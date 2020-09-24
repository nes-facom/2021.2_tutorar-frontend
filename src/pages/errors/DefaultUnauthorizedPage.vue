<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ name: "DefaultUnauthorizedPage" })
export default class DefaultUnauthorizedPage extends Vue {
  @Prop({ default: "403 - Acesso Negado" }) errorMessage!: string;
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="text-center">
      <v-col>
        <div class="display-1 grey--text text--darken-2">
          <span v-text="errorMessage" />
        </div>
        <v-btn class="mt-2" text @click="$router.go(-2)">Voltar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
