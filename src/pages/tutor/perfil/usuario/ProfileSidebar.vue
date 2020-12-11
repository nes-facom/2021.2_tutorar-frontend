<script lang="ts">
import { getAllHabilidadesService } from "@/api/habilidades/get-all"
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"
import { isTutor } from "@/store/modules/tutor-module"
import { Habilidade } from "@/store/modules/habilidades-module"

@Component({
  name: "ProfileSidebar"
})
export default class ProfileSidebar extends Vue {
  private authModule = getModule(Auth, this.$store)

  user = this.authModule.user

  // vitor: wtf ?
  userRole = this.user?.role.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase()
  })

  habilidades: Habilidade[] = []

  get habilidadesUsuario() {
    const { user } = this.authModule
    if (!user || !isTutor(user)) return []

    return this.habilidades.filter(h => user.habilidades.findIndex(id => id === h._id) !== -1)
  }

  mounted() {
    getAllHabilidadesService().then(habilidades => {
      this.habilidades = habilidades
    })
  }
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="d-flex align-center">
      <v-avatar size="50%" class="mb-4 mx-auto" style="hight:18vh">
        <v-img :src="user.fotoPerfil" lazy-src="@/assets/dog.jpg" />
      </v-avatar>
    </div>

    <v-card-text class="text-center">
      <h4 class="font-weight-light grey--text mb-3" v-text="userRole" />

      <h2 class="font-weight-light blue--text mb-3" v-text="user.nome" />

      <p class="font-weight-light grey--text" v-text="user.descricao" />

      <template v-if="habilidadesUsuario.length > 0">
        <v-divider class="ma-4" />

        <v-chip class="ma-1" v-for="habilidade in habilidadesUsuario" :key="habilidade._id" filter outlined>
          <span v-text="habilidade.nome" />
        </v-chip>
      </template>
    </v-card-text>
  </div>
</template>
