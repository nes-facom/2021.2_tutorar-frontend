<script>
export default {
  name: "CardPerfilResumidoProfessor",

  components: {},

  data: () => ({
    file: null
  }),

  methods: {}
}
</script>

<template>
  <v-row no-gutters align="center">
    <v-col cols="12" class="mx-auto">
      <v-card>
        <v-card-title class="font-weight-bold pb-2">
          Informações do Usuário
        </v-card-title>
        <v-row align="center" justify="center" class="my-10" no-gutters>
          <v-col cols="6" class="pa-0" style="border-right: 1px solid #e3e3e3;">
            <div class="py-6 px-4">
              <div class="d-flex align-center">
                <v-avatar size="150px" class="mb-4 mx-auto">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
                </v-avatar>
              </div>

              <v-card-text class="text-center">
                <h4 class="display font-weight-light grey--text mb-3">Leonardo</h4>
                <h4 class="display font-weight-bold">
                  <span class="green--text">P</span>
                  <span class="blue--text">R</span>
                  <span class="orange--text">O</span>
                  <span class="red--text">F</span>
                  <span class="green--text">E</span>
                  <span class="blue--text">S</span>
                  <span class="orange--text">S</span>
                  <span class="red--text">O</span>
                  <span class="blue--text">R</span>
                </h4>
              </v-card-text>
            </div>
          </v-col>

          <v-col cols="6" class="px-16">
            <v-text-field disabled value="Leonardo Kauan Pereira" label="Nome Completo" />
            <v-text-field disabled value="20 anos" label="idade" />
            <v-text-field disabled value="Masculino" label="Genêro" />
            <v-text-field disabled value="leonardo.12345@gmail.com" label="E-mail" />
            <v-text-field disabled value="(67) 99234-5678" label="Celular" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="$router.push({ path: '/monitor/listagem-usuarios' })">
            Voltar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.container {
  background: #596678;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-round-rainbow {
  width: 400px;
  height: 50%;
  background: white;
  border-radius: 4px;

  background-image: repeating-linear-gradient(
    to right,
    #c4e17f 0px,
    #c4e17f 50px,
    #f7fdca 50px,
    #f7fdca 100px,
    #fad071 100px,
    #fad071 150px,
    #f0766b 150px,
    #f0766b 200px,
    #db9dbe 200px,
    #db9dbe 250px,
    #c49cdf 250px,
    #c49cdf 300px,
    #6599e2 300px,
    #6599e2 350px,
    #61c2e4 350px,
    #61c2e4 400px
  );
  background-size: 100% 10px;
  background-repeat: no-repeat;
}
</style>
