<script>
export default {
  name: "AXASDASDIJ",

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
  <div v-cloak @drop.prevent="addDropFile" @dragover.prevent>
    <v-file-input v-model="file" />
  </div>
</template>

<style></style>
