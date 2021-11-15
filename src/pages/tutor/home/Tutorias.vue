<script lang="ts">
import Auth from "@/store/modules/auth"
import { Vue, Component } from "vue-property-decorator"
import { getModule } from "vuex-module-decorators"
import TutoriaModule from "@/store/modules/tutoria-module"
import ProfessorModule from "@/store/modules/professor-module"
import { User } from "@/store/modules/auth-types"

export interface DadosTutoriaRegistrada {
  id: string
  fotoProfessor: string
  nomeProfessor: string
  date: string
  time: string
  assunto: string
}

@Component({
  name: "Tutorias"
})
export default class Tutorias extends Vue {
  authModule = getModule(Auth, this.$store)
  tutoriaModule = getModule(TutoriaModule, this.$store)
  professorModule = getModule(ProfessorModule, this.$store)

  userCopy: User = { ...this.authModule.user } as User

  showModalRegitrarTutoria = false
  dialog = false
  isCarregandoTutorias = true

  tutoriasArray: DadosTutoriaRegistrada[] = []

  headers = [
    {
      text: "Avatar",
      value: "avatar",
      sortable: false,
      align: "start"
    },
    {
      text: "Nome",
      value: "nomeProfessor"
    },
    {
      text: "Data",
      value: "date"
    },
    {
      text: "Horário",
      value: "time"
    },
    {
      text: "Assunto",
      value: "assunto"
    },
    {
      text: "",
      value: "acao"
    }
  ]

  criarTutoria(
    id: string,
    fotoProfessor: string,
    nomeProfessor: string,
    date: string,
    time: string,
    assunto: string
  ): DadosTutoriaRegistrada {
    const tutoriaCriada: DadosTutoriaRegistrada = {
      id,
      fotoProfessor,
      nomeProfessor,
      date,
      time,
      assunto
    }

    return tutoriaCriada
  }

  registrarTutoria(tutoria: any) {
    this.showModalRegitrarTutoria = true
  }

  editarTutoria(tutoria: any) {
    this.showModalRegitrarTutoria = true
  }

  adicionaZero(numero: number) {
    if (numero <= 9) return "0" + numero
    else return numero
  }

  formatarData(data: string) {
    if (!data) return ""
    let dataFormatada = data.substring(0, 10)

    const dia = dataFormatada.substring(8, 10)
    const mes = dataFormatada.substring(5, 7)
    const ano = dataFormatada.substring(0, 4)

    dataFormatada = `${dia}/${mes}/${ano}`
    
    return dataFormatada
  }

  async getTutorias() {
    const tutoriasAux: any[] = []

    await this.tutoriaModule
      .getTutoriasPendentesFromTutor(this.userCopy._id)
      .then(tutorias => {
        tutorias.forEach(tutoria => {
          this.professorModule.fetchProfessorById(tutoria.professorId).then(professor => {
            const tutoriaCriada = this.criarTutoria(
              tutoria._id,
              "professor.fotoPerfil",
              professor.nome,
              this.formatarData(tutoria.tutoringDate.toString()),
              tutoria.tutoringHour.toString(),
              "Google meet"
            )
            tutoriasAux.push(tutoriaCriada)
          })
        })
      })
      .finally(() => {
        this.tutoriasArray = tutoriasAux
        this.isCarregandoTutorias = false
      })
  }

  mounted() {
    this.getTutorias()
  }
}
</script>

<template>
  <section id="main" v-if="!isCarregandoTutorias">
    <v-data-table :headers="headers" :items="tutoriasArray" :items-per-page="10" class="" fixed-header height="40em">
      <template v-slot:[`item.avatar`]>
        <v-avatar size="36px">
          <v-img src="@/assets/dog.jpg" />
        </v-avatar>
      </template>

      <template v-slot:[`item.acao`]>
        <div class="buttonWrapper">
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-2" text color="#106CE5" v-bind="attrs" v-on="on"> Registrar tutoria </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h6"> Registrar tutoria </v-card-title>
              <div class="infosTutoria">
                <div class="itemInfo">
                  <p class="subtitle1 titleInfo">Professor:</p>
                  <p class="textInfo">Robertinho inho</p>
                </div>
                <div class="itemInfo">
                  <p class="subtitle1 titleInfo">Horário:</p>
                  <p class="textInfo">14h00 às 15h00</p>
                </div>
                <div class="itemInfo">
                  <p class="subtitle1 titleInfo">Data:</p>
                  <p class="textInfo">20/10/2010</p>
                </div>
              </div>

              <div class="titleAndRadioButtons">
                <h6 class="subtitle1">O professor compareceu a reunião?</h6>
                <v-radio-group>
                  <v-radio value="Sim">
                    <template v-slot:label>
                      <div class="radioButton">Sim</div>
                    </template>
                  </v-radio>
                  <v-radio value="Não">
                    <template v-slot:label>
                      <div class="radioButton">Não</div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
              <div class="titleAndTextArea">
                <h6 class="subtitle1 textArea">Descreva como foi a reunião:</h6>
                <v-textarea auto-grow name="input" outlined no-resize></v-textarea>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#106CE5" outlined @click="dialog = false"> Cancelar </v-btn>
                <v-btn class="btnTextWhite" color="#106CE5" @click="dialog = false"> Registrar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-data-table>
  </section>
  <section id="loading" v-else>
    <v-progress-linear color="deep-purple accent-4" class="mt-12" indeterminate rounded height="6" />
  </section>
</template>

<style lang = "scss" >
.buttonWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.btnTextWhite {
  color: white !important;
}
.infosTutoria {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 24px;
  margin-right: 24px;
}
.subtitle1 {
  font-weight: 400;
  line-height: 18, 75px;
  letter-spacing: 0.15px;
  font-size: 16px;
}
.titleAndRadioButtons {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.radioButton {
  font-size: 14px;
}
.textArea {
  margin-bottom: 16px;
}

.titleAndTextArea {
  margin-left: 20px;
  margin-right: 20px;
}
.titleInfo {
  margin-right: 8px;
}
.textInfo {
  font-size: 13px;
  color: green;
}

.itemInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>