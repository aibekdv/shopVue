<template>
  <div id="app">
    <main-wrapper />
  </div>
</template>

<script>
import MainWrapper from "./components/MainWrapper.vue";
export default {
  name: "app",
  components: {
    mainWrapper: MainWrapper
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(28, 51, 100);
}
</style>
