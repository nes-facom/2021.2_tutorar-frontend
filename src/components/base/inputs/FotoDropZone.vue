<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({ name: "FotoDropZone" })
export default class FotoDropZone extends Vue {
  value: File | null = null

  preview: string | null = null

  rules: ((v: File | null) => true | string)[] = [
    v => !!v || "Escolha uma foto",
    v => (!!v && v.size < 7000000) || "Foto deve ter no máximo 7 MB!"
  ]

  onImageSelected(e: any) {
    const file = e.target?.files[0]
    this.value = file
    this.preview = file ? URL.createObjectURL(file) : null
  }

  onImageDragged(e: DragEvent) {
    const file = e.dataTransfer?.files[0]
    if (file) this.onImageSelected(file)
  }
}
</script>

<template>
  <div v-cloak @drop.prevent="onImageDragged" @dragover.prevent class="mb-8 dropzone">
    <v-btn v-if="!value" class="my-3 white--text elevation-0" color="#4285F4" @click="$refs.fileInput.click()">
      <v-icon left dark>mdi-cloud-upload</v-icon>
      <span>Upload</span>
    </v-btn>

    <!-- <v-file-input
      solo
      flat
      ref="fileInput"
      hide-details
      v-model="value"
      :prepend-icon="null"
      :rules="rules"
      @change="onImageSelected"
      placeholder="Arraste ou Selecione uma foto"
      accept="image/png, image/jpeg"
      show-size
    /> -->

    <input ref="fileInput" class="d-none" type="file" accept="image/png, image/jpeg" @change="onImageSelected" />
    <v-img v-if="preview" :src="preview" />
  </div>
</template>

<style lang="scss" scoped>
.dropzone {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 2px solid hsl(0, 0%, 84%);
  overflow: hidden;
  transition: background-color 0.2s;
}

.v-input {
  ::v-deep div.v-input__control {
    div.v-input__slot {
      margin-top: 4px;
      margin-bottom: 0 !important;
    }
    div.v-messages {
      display: none;
    }
  }
}
</style>
