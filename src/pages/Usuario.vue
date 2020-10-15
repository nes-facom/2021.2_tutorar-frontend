<script lang="ts">
import Auth from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "Pageuser" })
export default class Pageuser extends Vue {
  private authModule = getModule(Auth, this.$store);

  isEditing = false;
  userCopy = { ...this.authModule.user };

  get currentUserData() {
    return this.authModule.user || {};
  }

  get user() {
    return this.isEditing ? this.userCopy : this.currentUserData;
  }

  toggleEditMode() {
    this.userCopy = { ...this.currentUserData };
    this.isEditing = !this.isEditing;
  }
}
</script>

<template>
  <v-card class="pa-0">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="3" class="pa-0" style="border-right: 1px solid #e3e3e3;">
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
              <v-btn class="ma-1" color="orange" dark rounded small
                >100+ Tutorias</v-btn
              >

              <v-btn class="ma-1" color="green" dark small rounded
                >Avaliação 9.5</v-btn
              >
            </div>
          </v-card-text>
        </div>
      </v-col>

      <v-col cols="9" align-self="start">
        <v-tabs style="border-bottom: 1px solid #e3e3e3;">
          <v-tab>Dados Pessoais</v-tab>
          <v-tab>Graduação</v-tab>
          <v-tab>Minha Conta</v-tab>
        </v-tabs>
        <div class="pa-6">
          <v-card-title class="mx-0 mt-0 mb-4 px-0 py-0">
            <v-spacer />

            <v-btn
              :color="isEditing ? 'red' : 'grey'"
              class="mb-auto"
              text
              @click="toggleEditMode"
            >
              <span>{{ isEditing ? "Cancelar Edição" : "Editar" }}</span>

              <v-icon
                class="ml-3"
                v-text="isEditing ? 'mdi-pencil-off-outline' : 'mdi-pencil'"
              />
            </v-btn>
          </v-card-title>

          <v-form>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="user.nome"
                  :disabled="!isEditing"
                  label="Nome Completo"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="user.dataNascimento"
                  label="Data Nascimento"
                  :disabled="!isEditing"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="user.genero"
                  label="Gênero"
                  :disabled="!isEditing"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="user.cpf"
                  label="CPF"
                  :disabled="!isEditing"
                />
              </v-col>

              <v-col cols="12">
                <span class="subtitle-1 font-weight-light grey--text"
                  >Sobre Mim</span
                >
                <v-textarea
                  @input="user.descricao = $event"
                  :value="
                    user.descricao ||
                      'Digite uma descrição e enriqueça seu perfil !'
                  "
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
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
}

::v-deep .v-tabs-slider {
  background-image: repeating-linear-gradient(
    to right,
    #33a650 0%,
    #33a650 25%,
    #448ff2 25%,
    #448ff2 50%,
    #f2a007 50%,
    #f2a007 75%,
    #f23838 75%,
    #f23838 100%
  );
  background-size: 100% 10px;
  background-repeat: no-repeat;
}

v-text-field {
  border-style: none;
}
</style>