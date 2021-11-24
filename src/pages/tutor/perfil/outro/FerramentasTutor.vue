<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator"

@Component({
  name: "FerramentasTutor"
})
export default class Horarios extends Vue {
 @Prop({ required: true })
 habilidades!: string[]

 @Prop({ required: true })
 habilidadeEscolhida!: string

 updateHabilidadeSelected(habilidadeE: string) {
      // Emite um evento partindo do child para ser capturado pelo parent
      this.$emit('update-habilidades-selected', habilidadeE)
  }


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
  <div  class="tools">
    <div class="iconAndTitle">
      <div class="icon">
        <v-icon> mdi-tools</v-icon>
      </div>
      Ferramentas
    </div >
    <v-chip-group center-active v-if="habilidades.length > 0" active-class="primary--text" show-arrows>
      <v-chip filter v-show="true" v-for="tag in habilidades" :key="tag"
      @click="updateHabilidadeSelected(tag)"
      >
        {{ tag }}
      </v-chip>
    </v-chip-group>
    <p v-else>Infelizmente esse tutor não informou suas habilidades</p>
   
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

p {
  padding-left: 40px;
}


</style>