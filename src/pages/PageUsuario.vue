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
    return this.authModule.user;
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
  <v-row no-gutters>
    <v-col cols="12" md="5" lg="3">
      <v-card class="pa-6">
        <v-row align="center" justify="center">
          <v-avatar size="300px" class="mb-4">
            <v-img src="@/assets/dog.jpg" />
          </v-avatar>

          <v-card-text class="text-center">
            <h6 class="display-1 mb-4 grey--text">
              Professora / Bacharellado Química
            </h6>

            <h4 class="display-2 font-weight-light mb-3">Fulana da Silva</h4>

            <p class="font-weight-light grey--text" v-text="user.descricao" />

            <div>
              <v-btn color="orange" dark rounded class="mr-3"
                >100+ Tutorias</v-btn
              >

              <v-btn color="green" dark rounded>Avaliação 4.7/5</v-btn>
            </div>
          </v-card-text>
        </v-row>
      </v-card>
    </v-col>

    <v-col class="ma-0 pa-0" cols="12" md="7" lg="9">
      <v-card
        class="pa-8 ml-lg-8 mt-0 mt-md-4 mt-lg-0"
        :class="{ 'elevation-0': this.$vuetify.breakpoint.smAndDown }"
      >
        <v-card-title class="mx-0 mt-0 mb-4 px-0 py-0">
          <span class="display-2 font-weight-light grey--text">Meu Perfil</span>

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
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.nome"
                :readonly="!isEditing"
                label="Nome Completo"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.email"
                label="Email"
                :readonly="!isEditing"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.telefone"
                v-mask="'#####-####'"
                :readonly="!isEditing"
                label="Telefone"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.campoExemplo1"
                :readonly="!isEditing"
                label="Campo 1"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.campoExemplo2"
                :readonly="!isEditing"
                label="Campo 2"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="user.descricao"
                :readonly="!isEditing"
                label="Sobre mim"
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
      </v-card>
    </v-col>
  </v-row>
</template>
