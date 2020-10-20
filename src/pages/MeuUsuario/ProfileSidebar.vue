<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "ProfileSidebar"
})
export default class ProfileSidebar extends Vue {
  private authModule = getModule(Auth, this.$store)

  user = this.authModule.user
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="d-flex align-center">
      <v-avatar size="220px" class="mb-4 mx-auto">
        <v-img src="@/assets/dog.jpg" />
      </v-avatar>
    </div>

    <v-card-text class="text-center">
      <h6 class="headline mb-4 grey--text">
        Professora Bacharellado Química
      </h6>

      <h4 class="display-1 font-weight-light blue--text mb-3">
        Fulana da Silva
      </h4>

      <p class="font-weight-light grey--text" v-text="user.descricao" />

      <div>
        <v-btn class="ma-1" color="orange" dark rounded small>100+ Tutorias</v-btn>

        <v-btn class="ma-1" color="green" dark small rounded>Avaliação 9.5</v-btn>
      </div>
    </v-card-text>
  </div>
</template>
