<template>
  <div id="app">
    <the-header/>
    <router-view/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader";

  export default {
    name: "App",
    components: {TheHeader}
  };
</script>


<style>
  body {
    margin: 0;
    height: 100vh;
    background-color: #e6e8d3;
  }

  #app * {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    /* -webkit-font-smoothing: antialiased; */
    color: #2c3e50;
  }

  .v--modal-box.v--modal {
    background-color: #fcfeeb;
  }


</style>
