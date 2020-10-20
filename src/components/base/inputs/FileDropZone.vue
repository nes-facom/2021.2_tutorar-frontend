<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from "vue-property-decorator"

@Component({ name: "FileDropZone" })
export default class FileDropZone extends Vue {
  // Counter for enter/leave events (necessary due to issues with rippling)
  hoverCounter = 0

  // Reflects the files currently hovering over the box (used for type checking)
  hoveringContent: DataTransferItemList | null = null

  /**
   * Array of selected files
   * .sync/v-model not needed for :files="[]", because the array is passed by
   * reference and this component only uses reactive functions for modification
   */
  @Prop(Array) readonly files!: File[]

  @Ref() readonly filebtn!: HTMLInputElement
  @Ref() readonly dropzone!: HTMLDivElement

  @Watch("hoverCounter")
  onHoverCounterChanged(val: number) {
    if (val === 0) this.hoveringContent = null
  }

  /**
   * Manages <input type="file">'s state to integrate it with the rest of the box
   */
  upload() {
    for (let i = 0; i < this.filebtn.files!.length; i++) {
      this.files.splice(0, this.files.length)
      this.files.push(this.filebtn.files![i])
    }
    this.filebtn.value = ""
  }

  dragenter(e: DragEvent) {
    this.hoveringContent = e.dataTransfer!.items
    this.hoverCounter++
  }

  dragleave(e: DragEvent) {
    this.hoverCounter--
  }

  /**
   * Validates and keeps track of dropped content
   */
  drop(e: DragEvent) {
    // Keep from leaving the page
    e.preventDefault()

    // Content can't be dragged out, so go ahead and reset the counter
    this.hoverCounter = 0

    if (e.dataTransfer!.items) {
      for (let i = 0; i < e.dataTransfer!.items.length; i++) {
        if (e.dataTransfer!.items[i].kind === "file") {
          const file = e.dataTransfer!.items[i].getAsFile()
          if (file) {
            this.files.splice(0, this.files.length)
            this.files.push(file)
          }
        }
      }
    }
  }

  /**
   * Removes attachment per user's request
   */
  remove(file: File) {
    const arr = this.files as File[]
    arr.splice(arr.indexOf(file), 1)
    this.$emit("update", null)
  }
}
</script>

<template>
  <div class="dropzone" @dragover.prevent @dragleave="dragleave" @dragenter="dragenter" @drop="drop" ref="dropzone">
    <v-btn @click="$refs.filebtn.click()" class="mt-4 mb-3 white--text elevation-0" color="#4285F4">
      <v-icon left dark>mdi-cloud-upload</v-icon>
      <span>Upload</span>
    </v-btn>

    <span class="caption mb-2">
      Ou arraste sua foto aqui !
    </span>

    <span class="caption grey--text">
      Formatos Permitidos: JPEG e PNG
    </span>

    <!-- Indicate selected files -->
    <div class="input-container">
      <v-input v-for="file in files" :key="file.name" append-icon="close" @click:append="remove(file)">
        <span>{{ file.name }}</span>
      </v-input>
    </div>

    <!-- Hidden upload button to bring up file selection dialog -->
    <input ref="filebtn" class="filebtn" type="file" accept="image/png, image/jpeg" @input="upload" />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 1.5em;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  color: hsla(0, 0%, 100%, 0.7);
}

p {
  margin: 0;
  font-size: 0.75em;
  font-weight: 100;
}

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

div.input-container {
  min-width: 50%;
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

input.filebtn {
  display: none;
}
</style>
