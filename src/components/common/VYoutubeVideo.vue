<template>
  <div>
    <v-spinner class="video__spinner" v-show="!loaded"/>
    <div v-show="loaded" class="video__embed">
      <iframe
        @load="loaded = true"
        class="video__iframe"
        :src="embedUrl"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script>
  import VSpinner from "./VSpinner";
  export default {
    name: "VYoutubeVideo",
    components: {VSpinner},
    data() {
      return {
        loaded: false
      }
    },
    props: ["videoHash"],
    computed: {
      embedUrl() {
        return "https://www.youtube.com/embed/" + this.videoHash;
      }
    }
  }
</script>

<style>
  .video__embed {
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
  }

  .video__spinner {
    margin-left: auto;
    margin-right: auto;
  }

  .video__iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>