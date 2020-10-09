<script>
import FileFropZone from "@/components/base/inputs/FileDropZone.vue";

export default {
  name: "AXASDASDIJ",

  components: {
    FileFropZone,
  },

  data: () => ({
    file: null,
  }),

  methods: {
    addDropFile(e) {
      this.file = e.dataTransfer.files[0];
    },
  },
};
</script>

<template>
  <div class="pa-12 grey">
    <FileFropZone />
  </div>
</template>

<style></style>
