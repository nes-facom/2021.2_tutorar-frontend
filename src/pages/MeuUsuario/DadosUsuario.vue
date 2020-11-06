<script lang="ts">
import Auth from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "DadosUsuario"
})
export default class DadosUsuario extends Vue {
  private authModule = getModule(Auth, this.$store)

  dialog = false

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
          <v-text-field v-model="user.email" :disabled="!isEditing" label="E-mail" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="user.celular" label="Celular" :disabled="!isEditing" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="user.senha" type="password" label="Senha" :disabled="!isEditing" />
        </v-col>

        <v-col cols="12">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" class="mr-0 white--text" :disabled="isEditing" v-bind="attrs" v-on="on">
                <span>Desativar Conta</span>
              </v-btn>
            </template>
            <v-card>
                <v-img style="background-color: #ecf4fd" src="@/assets/imagens/Usuário_Desativar.svg" max-height="215" contain/>
              <v-card-title class="font-weight-bold headline" align="center">
                Desativar Usuário?
              </v-card-title>
              <v-card-text>
                Desativando seu usuário você perderá seu acesso ao sistema
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="error" text @click="dialog = false">
                  Desativar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
