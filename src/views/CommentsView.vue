<template>
  <div class="comments-view">
    <v-slider title="Liczba akcji:" :min="50" :max="2000" :value="123"/>
    <v-slider title="Odstęp czasowy (sek):" :max="100" :value="456"/>
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";

  export default {
    name: "CommentsView",
    components: {
      VSlider
    }
  }
</script>

<style>
  .comments-view{
    width: 100%;
  }
</style>

