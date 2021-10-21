<!--
<script lang="ts">
import { TutoriaFormatada } from "@/pages/tutor/perfil/usuario/SolicitacoesTutoria.vue"
import { Professor } from "@/store/modules/auth-types"
import ProfessorModule from "@/store/modules/professor-module"
import { getApropriateTelefoneMask } from "@/utils/inputs/mask"
import { Vue, Component, Prop } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"

@Component({ name: "ModalAceitarTutoria" })
export default class ModalAceitarTutoria extends Vue {
  @Prop({ required: true })
  value!: boolean

  @Prop({ required: true, type: Object })
  tutoria!: TutoriaFormatada

  @Prop({ type: String, default: "6798801996" })
  telefone!: string

  professorModule = getModule(ProfessorModule, this.$store)

  openTutorWhatsAppLink() {
    window.open(`https://wa.me/55${this.telefone}`)
  }

  get mascaraTelefone(): string {
    return getApropriateTelefoneMask(this.telefone)
  }

  get professor(): Professor {
    return this.professorModule.byId[this.tutoria.professorId]
  }
}
</script>

<template>
  <v-dialog :value="value" persistent width="500" @click:outside="$emit('input', false)">
    <v-card>
      <v-card-title>
        <v-avatar size="100">
          <v-img :src="tutoria.fotoProfessor" lazy-src="@/assets/dog.jpg" />
        </v-avatar>
        <p class="ml-3">
          <span class="grey--text text--darken-1">Nova solicitação de tutoria !</span>
          <br />
          <span v-text="tutoria.nomeProfessor" />
        </p>
      </v-card-title>

      <v-card-text>
        Professor de letras @UFMS paixão por ensino blablabla, sempre disposta a novos desafios !
      </v-card-text>

      <div class="pl-6">
        <v-icon left>mdi-calendar</v-icon>
        <span v-text="tutoria.dataFormatada" />
        <v-icon left class="ml-8">mdi-clock</v-icon>
        <span v-text="tutoria.tutoringHour" />
      </div>

      <v-row class="px-6 pb-6 " no-gutters>
        <v-col cols="6">
          <v-card-subtitle class="pl-0 pb-2">
            <span>Telefone</span>
          </v-card-subtitle>
          <a v-if="telefone.length > 0" @click="openTutorWhatsAppLink">
            {{ professor.celular | VMask(mascaraTelefone) }}
          </a>
        </v-col>
        <v-col cols="6">
          <v-card-subtitle class="pl-0 pb-2">
            <span>Email</span>
          </v-card-subtitle>
          <span v-text="professor.email" />
        </v-col>
      </v-row>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="red" text @click="$emit('input', false)">
          Cancelar
        </v-btn>
        <v-btn color="green" class="white--text" @click="$emit('tutoria-aceita')">
          Aceitar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
-->