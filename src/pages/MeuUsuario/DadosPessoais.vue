<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "DadosPessoais"
})
export default class DadosPessoais extends Vue {
  private authModule = getModule(Auth, this.$store)

  isEditing = false
  userCopy = { ...this.authModule.user }

  get currentUserData() {
    return this.authModule.user || {}
  }

  get user() {
    return this.isEditing ? this.userCopy : this.currentUserData
  }

  toggleEditMode() {
    this.userCopy = { ...this.currentUserData }
    this.isEditing = !this.isEditing
  }
}
</script>

<template>
  <div class="pa-6">
    <v-card-title class="mx-0 mt-0 mb-4 px-0 py-0">
      <v-spacer />

      <v-btn :color="isEditing ? 'red' : 'grey'" class="mb-auto" text @click="toggleEditMode">
        <span>{{ isEditing ? "Cancelar Edição" : "Editar" }}</span>

        <v-icon class="ml-3" v-text="isEditing ? 'mdi-pencil-off-outline' : 'mdi-pencil'" />
      </v-btn>
    </v-card-title>

    <v-form>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="user.nome" :disabled="!isEditing" label="Nome Completo" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="user.dataNascimento" label="Data Nascimento" :disabled="!isEditing" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="user.genero" label="Gênero" :disabled="!isEditing" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="user.cpf" label="CPF" :disabled="!isEditing" />
        </v-col>

        <v-col cols="12">
          <span class="subtitle-1 font-weight-light grey--text">Sobre Mim</span>
          <v-textarea
            @input="user.descricao = $event"
            :value="user.descricao || 'Digite uma descrição e enriqueça seu perfil !'"
            :disabled="!isEditing"
            rows="3"
            hide-details
          />
        </v-col>

        <v-col v-if="isEditing" class="pb-0 pt-4 text-right" cols="12">
          <v-btn color="success" class="mr-0">
            <span>Concluir Edição</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
