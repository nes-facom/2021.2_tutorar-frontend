<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({ name: "FotoDropZone" })
export default class FotoDropZone extends Vue {
  /**
   * Tipos de imagem aceitos pelo input
   * @see: https://www.w3schools.com/tags/att_input_accept.asp
   */
  @Prop({ default: "image/png, image/jpeg" }) allowedMimeTypes!: string
  @Prop({ default: 7000000 }) maxSize!: number

  value: File | null = null

  preview: string | null = null

  /**
   * Uso counter ao invés de boolean pois ao dar hover
   * em child elements da minha dropzone o dragleave é
   * triggered.
   */
  dragEnterCounter = 0

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) this.selectFile(target.files[0])
  }

  onImageDragged(e: DragEvent) {
    const file = e.dataTransfer?.files[0]
    if (file) this.selectFile(file)
    this.dragEnterCounter = 0
  }

  selectFile(file: File) {
    if (!this.validateFile(file)) return
    this.value = file
    this.preview = file ? URL.createObjectURL(file) : null

    this.$emit("input", this.value)
  }

  removeImage() {
    this.value = null
    this.preview = null
    this.$emit("input", this.value)
  }

  validateFile(file: File): boolean {
    if (this.allowedTypesArray.indexOf(file.type) === -1) return false
    if (file.size > this.maxSize) return false
    return true
  }

  get draggingFile(): boolean {
    return this.dragEnterCounter > 0 && !this.value
  }

  get allowedTypesArray(): string[] {
    return this.allowedMimeTypes.split(",").map(type => type.trim())
  }

  get errors(): string[] {
    const errors = []
    if (!this.value) errors.push("Escolha uma foto")
    if (this.value && this.value.size > this.maxSize) errors.push("Foto deve ter no máximo 7 MB!")
    return errors
  }
}
</script>

<template>
  <div>
    <div
      v-cloak
      :class="['dropzone', draggingFile ? 'dropzone-dragging-file' : '']"
      @dragenter="dragEnterCounter++"
      @dragleave="dragEnterCounter--"
      @drop.prevent="onImageDragged"
      @dragover.prevent
    >
      <v-btn v-if="!value" class="my-3 white--text elevation-0" color="#4285F4" @click="$refs.fileInput.click()">
        <v-icon class="mr-3" dark>mdi-cloud-upload</v-icon>
        <span>Escolher Arquivo</span>
      </v-btn>
      <input ref="fileInput" class="d-none" type="file" :accept="allowedMimeTypes" @change="onImageSelected" />
      <span v-if="!preview" class="grey--text text--darken-1">
        {{ draggingFile ? "Solte a foto para subir" : "Ou arraste sua foto aqui" }}
      </span>
      <v-img v-if="preview" :src="preview" />
    </div>
    <v-card-actions class="mb-8 ">
      <v-spacer />
      <v-btn v-if="preview" depressed color="error" @click="removeImage">Remover</v-btn>
      <v-spacer />
    </v-card-actions>
    <!-- 
      Esse input é meramente utilitario, o v-form verifica se o formulario é valido
      procurando se existe inputs inválidos dentro dela, uso ele pra emitir tais erros
       -->
    <v-text-field class="d-none" :error-messages="errors" />
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
  max-height: 350px;
  z-index: 99;
}

.dropzone-dragging-file {
  background-color: #e3e3e3 !important;
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
