<template>
  <div class="comments-view">
    <v-slider class="comments-view__slider" title="Liczba akcji:" :min="50" :max="2000" :value="123"/>
    <v-slider class="comments-view__slider" title="Odstęp czasowy (sek):" :max="100" :value="456"/>
    <comments-control class="comments-view__control"/>
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";
  import CommentsControl from "@/components/CommentsControl";

  export default {
    name: "CommentsView",
    components: {
      CommentsControl,
      VSlider
    }
  }
</script>

<style>
  .comments-view {
    width: 100%;
  }

  .comments-view__slider {
    margin-bottom: 0.3rem;
  }

  .comments-view__control {
    margin-top: 1rem;
  }
</style>

