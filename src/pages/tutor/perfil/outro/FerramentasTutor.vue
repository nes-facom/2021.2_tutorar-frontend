<script>
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "FerramentasTutor"
})
export default class Horarios extends Vue {
  data() {
    return {
      tags: [
        "Work",
        "Home Improvement",
        "Vacation",
        "Food",
        "Drawers",
        "Shopping",
        "Art",
        "Tech",
        "Creative Writing"
      ]
    }
  }
}
</script>


<template>
  <div class="tools">
    <div class="iconAndTitle">
      <div class="icon">
        <v-icon> mdi-tools</v-icon>
      </div>
      Ferramentas
    </div>
    <v-chip-group active-class="primary--text" show-arrows>
      <v-chip v-for="tag in tags" :key="tag">
        {{ tag }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<style lang = "scss" >

.iconAndTitle {
  padding-left: 20px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: row;
}
.icon{
  margin-right: 8px;
}
.tools{
display: flex;
padding-top: 32px;
padding-bottom: 32px;
flex-direction: column;
align-content: flex-start;
align-items: flex-start;
}
.chip{
  color: white !important;
  background-color: aqua  !important;
}


</style>