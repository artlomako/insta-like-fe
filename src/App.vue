<template>
  <div id="app">
    <the-header/>
    <router-view/>
    <message-dialog/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader";
  import MessageDialog from "./components/MessageDialog";

  export default {
    name: "App",
    components: {MessageDialog, TheHeader}
  };
</script>


<style>
  body {
    margin: 0;
    height: 100vh;
    background-color: #e6e8d3;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }
</style>
