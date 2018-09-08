<template>
  <div>
    <h1 class="how-to__text">Zobacz instrukcję</h1>
    <v-youtube-video video-hash="xFDmOFAVdxU"/>
  </div>
</template>

<script>
  import VSpinner from "../components/common/VSpinner";
  import VYoutubeVideo from "../components/common/VYoutubeVideo";

  export default {
    name: "HowToView",
    components: {VYoutubeVideo, VSpinner}
  }
</script>

<style>
  .how-to__text {
    text-align: center;
  }
</style>