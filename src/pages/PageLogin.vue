<script lang="ts">
import Auth from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "PageLogin" })
export default class PageLogin extends Vue {
  private authModule = getModule(Auth, this.$store);

  username = "";
  password = "";

  sendLoginRequest() {
    const { username, password } = this;
    this.authModule.LOGIN({ username, password }).catch(error => {
      console.log("=============");
      console.log(error);
    });
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col cols="12" md="5" lg="3">
      <v-card class="pa-6">
        <v-row align="center" justify="center">
          <v-text-field
            placeholder="username"
            v-model="username"
          ></v-text-field>

          <v-text-field
            placeholder="password"
            v-model="username"
          ></v-text-field>

          <v-btn @click="sendLoginRequest"></v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
