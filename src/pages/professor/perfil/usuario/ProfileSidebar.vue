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

  userRole = this.user?.role.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase()
  })
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="d-flex align-center">
      <v-avatar size="180px" class="mb-4 mx-auto">
        <v-img :src="user.fotoPerfil" lazy-src="@/assets/dog.jpg" />
      </v-avatar>
    </div>

    <v-card-text class="text-center">
      <h4 class="font-weight-light grey--text mb-3" v-text="userRole" />

      <h2 class="font-weight-light blue--text mb-3" v-text="user.nome" />

      <p class="font-weight-light grey--text" v-text="user.descricao" />
    </v-card-text>
  </div>
</template>
