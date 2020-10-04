<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from "vue-property-decorator";
import {} from "vuetify/lib";
@Component
export default class extends Vue {
  /**
   * Counter for enter/leave events (necessary due to issues with rippling)
   */
  hoverCounter = 0;

  /**
   *  Reflects the files currently hovering over the box (used for type checking)
   */
  hoveringContent: DataTransferItemList | null = null;
  matchAnything = /.*/;

  /**
   *  Replaces the default "Upload Box" text
   */
  @Prop(String) readonly label!: string | undefined;

  /**
   * Array of selected files
   * .sync/v-model not needed for :files="[]", because the array is passed by
   * reference and this component only uses reactive functions for modification
   */
  @Prop(Array) readonly files!: File[];

  /**
   *  Same as <input type=file>
   */
  @Prop(String) readonly accept!: string | undefined;
  /**
   *  Same as <input type=file>
   */
  @Prop(Boolean) readonly multiple!: boolean | undefined;
  /** Disables the "Upload box" label */
  @Prop(Boolean) readonly disableLabel!: boolean | undefined;
  /** Disables the "*Files can also be dropped in the box" hint */
  @Prop(Boolean) readonly disableHint!: boolean | undefined;
  // Refs
  @Ref() readonly filebtn!: HTMLInputElement;
  @Ref() readonly dropzone!: HTMLDivElement;
  // Watchers
  @Watch("multiple")
  onMultipleChanged(val: boolean) {
    if (!val) {
      this.files.splice(0, this.files.length - 1);
    }
  }
  @Watch("hoveringContent")
  onhoveringContentChanged(val: DataTransferItemList) {
    // If a file is hovering
    if (val) {
      // If we have type checking and we're using mimetypes only
      if (
        this.accept &&
        this.accept.length &&
        this.validTypes.extensions.length === 0
      ) {
        let shouldDim = false;
        // For each file hovering over the box...
        for (let i = 0; i < val.length; i++) {
          if (
            // Check the type against all our mime types
            this.validTypes.mimetypes.reduce(
              (prev, regex) => prev || !!val[i].type.match(regex),
              false as boolean
            )
          ) {
            shouldDim = true;
            break;
          }
        }
        // If we found a match, dim the box
        if (shouldDim)
          this.dropzone.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
        // If not, we can't definitively typecheck, so...
      } else {
        // Check that we have a file in there
        let shouldDim = false;
        for (let i = 0; i < val.length; i++) {
          if (val[i].kind === "file") {
            shouldDim = true;
            break;
          }
        }
        // ... and dim the box
        if (shouldDim)
          this.dropzone.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
      }
      // Otherwise...
    } else {
      // Un-dim the box
      this.dropzone.style.backgroundColor = "";
    }
  }
  @Watch("hoverCounter")
  onHoverCounterChanged(val: number) {
    if (val === 0) this.hoveringContent = null;
  }
  /**
   * Turn validatedAccept result into regex arrays for checking dropped files.
   * Each regex pattern checks for its corresponding accept filter.
   * If no accept filters can be properly validated, everything will match.
   * @returns {
   *   extensions: Regex[],
   *   mimetypes: Regex[],
   * }
   */
  get validTypes() {
    if (this.validatedAccept) {
      return {
        extensions: this.validatedAccept.extensions
          .map(ext => ext.replace(/(\W)/g, "\\$1")) // Escape all potential regex tokens
          .map(rgxstr => new RegExp(`${rgxstr}$`, "i")), // Transform into regex to look for extension
        mimetypes: this.validatedAccept.mimetypes
          .map(mt => mt.replace(/([-+/])/g, "\\$1")) // Escape special characters
          .map(mt => mt.replace(/\*/g, "(?:[A-Za-z0-9\\-\\+]*)*")) // Enable wildcards
          .map(rgxstr => new RegExp(`^${rgxstr}$`)) // Transform into regex
      };
    } else {
      // If we haven't been given any filters...
      return {
        extensions: [this.matchAnything],
        mimetypes: [this.matchAnything]
      };
    }
  }
  /**
   * Validate & filter accept property and separate into categories
   * @returns { extensions: string[], mimetypes: string[] } | null
   */
  get validatedAccept() {
    if (this.accept) {
      return {
        extensions: this.accept
          .split(",")
          .filter(type => type.match(/^\.(?!.*\/)/)), // Get only extension filters
        mimetypes: this.accept
          .split(",")
          .filter(type =>
            type.match(
              /^(?:(?:[A-Za-z0-9\-+]*)|\*)\/(?:(?:[A-Za-z0-9\-+]*)|\*)$/
            )
          ) // Get only mimetype filters
      };
    } else {
      return null;
    }
  }
  /**
   * Manages <input type="file">'s state to integrate it with the rest of the box
   */
  upload() {
    for (let i = 0; i < this.filebtn.files!.length; i++) {
      if (!this.multiple) this.files.splice(0, this.files.length);
      const shouldPush =
        this.validTypes.extensions.reduce(
          (prev, regex) => prev || !!this.filebtn.files![i].name.match(regex),
          false as boolean
        ) ||
        this.validTypes.mimetypes.reduce(
          (prev, regex) => prev || !!this.filebtn.files![i].type.match(regex),
          false as boolean
        );
      if (shouldPush) this.files.push(this.filebtn.files![i]);
    }
    this.filebtn.value = "";
  }
  /**
   * Keep track of what is being dragged over the box, and count enter events (fix for event rippling issues)
   */
  dragenter(e: DragEvent) {
    this.hoveringContent = e.dataTransfer!.items;
    this.hoverCounter++;
  }
  /**
   * Counts leave events (fix for event rippling issues)
   */
  dragleave(e: DragEvent) {
    this.hoverCounter--;
  }
  /**
   *  Validates and keeps track of dropped content
   */
  drop(e: DragEvent) {
    e.preventDefault(); // Keep from leaving the page
    this.hoverCounter = 0; // Content can't be dragged out, so go ahead and reset the counter
    if (e.dataTransfer!.items) {
      const rejected = []; // Keeps track of rejected items for reporting at the end
      for (let i = 0; i < e.dataTransfer!.items.length; i++) {
        if (e.dataTransfer!.items[i].kind === "file") {
          // Directories are not supported. Skip any that are found
          if (e.dataTransfer!.items[i].webkitGetAsEntry()) {
            const entry = e.dataTransfer!.items[i].webkitGetAsEntry();
            if (entry.isDirectory) {
              rejected.push(entry.name);
              continue;
            }
          }
          const file = e.dataTransfer!.items[i].getAsFile();
          if (file) {
            const shouldPush = // Check against Regex arrays from accept property
              this.validTypes.extensions.reduce(
                (prev, regex) => prev || !!file.name.match(regex),
                false as boolean
              ) ||
              this.validTypes.mimetypes.reduce(
                (prev, regex) => prev || !!file.type.match(regex),
                false as boolean
              );
            if (shouldPush) {
              if (this.multiple) {
                // Remove duplicates
                this.files
                  .filter(currFile => currFile.name === file.name)
                  .forEach(fileToRemove =>
                    this.files.splice(this.files.indexOf(fileToRemove), 1)
                  );
              } else {
                // Remove all
                this.files.splice(0, this.files.length);
              }
              this.files.push(file);
            } else {
              rejected.push(file); // Keep track of rejected files
              continue;
            }
          } else continue;
        }
      }
      // Emit rejected files
      if (rejected.length) this.$emit("rejectedFiles", rejected);
    }
  }
  /**
   * Removes attachment per user's request
   */
  remove(file: File) {
    const arr = this.files as File[];
    arr.splice(arr.indexOf(file), 1);
    this.$emit("update", null);
  }
}
</script>

<template>
  <!-- Drop box -->
  <div
    class="dropzone"
    @dragover.prevent
    @dragleave="dragleave"
    @dragenter="dragenter"
    @drop="drop"
    ref="dropzone"
  >
    <!-- Box Label -->
    <slot v-if="!disableLabel"
      ><h1>{{ label || "Upload Box" }}</h1></slot
    >
    <!-- Upload Button -->
    <v-btn @click="$refs.filebtn.click()">
      <v-icon left dark>cloud_upload</v-icon>
      Upload
    </v-btn>
    <!-- Indicate files can be dropped in here -->
    <p v-if="!disableHint">
      *Files can also be dropped in the box
    </p>
    <!-- Indicate selected files -->
    <div class="input-container">
      <v-input
        v-for="file in files"
        :key="file.name"
        append-icon="close"
        @click:append="remove(file)"
        prepend-icon="insert_drive_file"
      >
        {{ file.name }}
      </v-input>
    </div>
    <!-- Hidden upload button to bring up file selection dialog -->
    <input
      ref="filebtn"
      class="filebtn"
      type="file"
      :multiple="multiple"
      :accept="
        validatedAccept &&
          [...validatedAccept.extensions, ...validatedAccept.mimetypes].join(
            ','
          )
      "
      @input="upload"
    />
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
  border: 2px dashed hsla(0, 0%, 100%, 0.7);
  border-radius: 20px;
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