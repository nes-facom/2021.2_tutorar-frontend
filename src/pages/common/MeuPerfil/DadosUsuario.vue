<script lang="ts">
import { Professor, Tutor } from "@/store/modules/auth-types"
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "DadosUsuario"
})
export default class DadosUsuario extends Vue {
  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Tutor | Professor

  dialog = false
}
</script>

<template>
  <v-form class="pa-6">
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
            <v-img class="mx-auto" width="276" src="@/assets/imagens/Usuário_Desativar.svg" />
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
</template>
