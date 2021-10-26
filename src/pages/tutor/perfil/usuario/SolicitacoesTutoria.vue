<script>
const foto = () => import("@/assets/dog.jpg")
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      requestsHeaders: [
        {
          text: "Foto",
          align: "start",
          sortable: false,
          value: "foto"
        },
        { text: "Nome", value: "name" },
        { text: "Data", value: "date" },
        { text: "Horário", value: "time" },
        { text: "Assunto", value: "theme" },
        { text: "", value: "data-table-expand" }
      ],
      requests: [
        {
          foto: foto,
          name: "Frozen Yogurt",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          foto: "",
          name: "Ice cream sandwich",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          foto: "",
          name: "Eclair",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "Cupcake",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "Gingerbread",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "Jelly bean",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "Lollipop",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "Honeycomb",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "Donut",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        },
        {
          photo: "",
          name: "KitKat",
          date: "2/09/21",
          time: "13h00 às 14h00",
          theme: "Google Meet"
        }
      ]
    }
  }
}
</script>
<template>
  <v-data-table
    :headers="requestsHeaders"
    :items="requests"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    fixed-header
    @click:row="handleClick"
    height="40em"
  >
    <template v-slot:[`item.foto`]>
      <v-avatar size="36px">
        <v-img src="@/assets/dog.jpg" />
      </v-avatar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <div class="expandedCellContainer">
          <div class="descriptionContainer">
            <p class="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. More info about {{ item.name }}</p>
            <div class="contactInformationContainer">
              <p>Aqui vai o email</p>
              <p>Aqui vai o celular</p>
            </div>
          </div>
          <div class="buttonsContainer">
            <v-btn class="ma-2" outlined color="#106CE5"> Rejeitar tutoria </v-btn>
            <v-btn class="ma-2 btnTextWhite" color="#106CE5"> Aceitar tutoria </v-btn>
          </div>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<style lang = "scss" >
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
}
.buttonsContainer {
  display: flex;
  flex-direction: column;
}
.contactInformationContainer {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}
.descriptionContainer {
  display: flex;
  flex-direction: row;
  margin-top: 8pt;
  margin-bottom: 16pt;
}
.description{
  max-width: 410pt;
}

.expandedCellContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btnTextWhite {
  color: white !important;
}
</style>