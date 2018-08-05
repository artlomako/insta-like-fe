<template>
  <div id="app">
    <the-header/>
    <div class="main-view">
      <router-view/>
    </div>
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

  .main-view {
    padding: 2rem 17% 0 17%;
  }

  @media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    .main-view {
      padding: 2rem 5% 0 5%;
    }
  }

</style>
