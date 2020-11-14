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

  chips = [
    { name: "Google", color: "primary" },
    { name: "Yahoo", color: "deep-purple" },
    { name: "Gmail", color: "primary" },
    { name: "Canvas", color: "error" },
    { name: "Java", color: "orange" }
  ]
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
      <h4 class="font-weight-light grey--text mb-3">
        Professora Bacharellado Química
      </h4>

      <h2 class="font-weight-light blue--text mb-3" v-text="user.nome" />

      <p class="font-weight-light grey--text" v-text="user.descricao" />

      <v-divider class="mx-4" />

      <v-chip-group class="align-center" column>
        <v-chip v-for="chip in chips" :color="chip.color" text-color="white" :key="chip.name">{{ chip.name }}</v-chip>
      </v-chip-group>
    </v-card-text>
  </div>
</template>
