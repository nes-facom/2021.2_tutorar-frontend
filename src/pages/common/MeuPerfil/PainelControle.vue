<script lang="ts">
import Auth, { Professor, Tutor } from "@/store/modules/auth-types"
import { getModule } from "vuex-module-decorators"
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "PainelControle"
})
export default class PainelControle extends Vue {
  dialogAce = false
  dialogRec = false

  telefone = 67991121437

  headers = [
    { text: "Avatar", value: "avatar", align: "start" },
    { text: "Nome", value: "nome" },
    { text: "Horário", value: "horario" },
    { text: "Ação", value: "acao", align: "end" }
  ]

  solicitacoes = [
    { nome: "Leonarda Kauan Pereira", horario: "09 de novembro às 12:00" }
  ]

  @Prop({ required: true })
  isEditing = false

  @Prop({ required: true })
  user!: Professor | Tutor

  recusarTutoria() {
    return
  }

  aceitarTutoria() {
    return
  }

  whatsappLink(){
    window.open('https://wa.me/55' + this.telefone, '_blank')
  }
}
</script>

<template>
  <div>
    <v-row class="pa-6">
      <v-col cols="12">
        <h3 class="grey--text">Solicitações de Tutorias</h3>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="solicitacoes"
          hide-default-footer
        >
          <template #item.avatar>
            <v-avatar size="36px">
              <v-img src="@/assets/dog.jpg" />
            </v-avatar>
          </template>
          <template #item.acao>
            <v-dialog v-model="dialogAce" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" x-small class="mr-0 white--text" v-bind="attrs" v-on="on">
                  <span>Aceitar</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="primary font-weight-bold headline justify-center py-1">
                    <h5 class="">Aceitar Tutoria</h5>
                </v-card-title>

                <v-card-text>
                  <v-row class="px-3">
                    <v-col cols="3">
                      <v-avatar size="100%">
                        <v-img src="@/assets/dog.jpg" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="9" align-self="center">
                      <h4>professor.nome gostaria de agendar uma tutoria no dia dia.selecao às hora.selecao.</h4>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-text>
                  <v-row class="px-6 py-2">
                    <v-icon class="pr-2">mdi-phone</v-icon>
                    <h3>Informações para contato</h3>
                  </v-row>
                </v-card-text>
                <v-card-text>
                  <v-row class="px-3">
                    <v-col cols="6">
                      <h5>Telefone</h5>
                      <a @click="whatsappLink">{{ telefone }}</a>
                    </v-col>
                    <v-col cols="6">
                      <h5>Email</h5>
                      <h4>email.professor</h4>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="error" text @click="dialogAce = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="primary" text @click="dialogAce = false; aceitarTutoria">
                    Aceitar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogRec" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" x-small class="mr-0 white--text" v-bind="attrs" v-on="on">
                  <span>Recusar</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="error font-weight-bold headline justify-center py-1">
                  <h5>Recusar Tutoria</h5>
                </v-card-title>

                <v-card-text>
                  <v-row class="px-3">
                    <v-col cols="3">
                      <v-avatar size="100%">
                        <v-img src="@/assets/dog.jpg" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="9" align-self="center">
                      <h4>professor.nome gostaria de agendar uma tutoria no dia dia.selecao às hora.selecao.</h4>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-text>
                  <v-row class="px-6 py-2">
                    <v-icon class="pr-2">mdi-phone</v-icon>
                    <h3>Informações para contato</h3>
                  </v-row>
                </v-card-text>
                <v-card-text>
                  <v-row class="px-3">
                    <v-col cols="6">
                      <h5>Telefone</h5>
                      <a @click="whatsappLink">{{ telefone }}</a>
                    </v-col>
                    <v-col cols="6">
                      <h5>Email</h5>
                      <h4>email.professor</h4>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" text @click="dialogRec = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="error" text @click="dialogRec = false; recusarTutoria">
                    Recusar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-6">
      <v-col cols="12">
        RESUMO DO MES
      </v-col>
    </v-row>
  </div>
</template>
