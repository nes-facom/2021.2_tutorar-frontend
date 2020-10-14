<script>
export default {
  name: "PageTeste",

  components: {},

  data: () => ({
    file: null
  }),

  methods: {}
};
</script>

<template>
  <div class="container">
    <div class="top-round-rainbow"></div>
  </div>
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
