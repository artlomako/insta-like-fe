<template>
  <div class="likes-view">
    <v-slider title="Liczba akcji:" :min="50" :max="2000" :value="123"/>
    <v-slider title="Odstęp czasowy (sek):" :max="100" :value="456"/>
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";

  export default {
    name: "LikesView",
    components: {
      VSlider
    }
  }
</script>

<style>
  .likes-view{
    width: 100%;
  }
</style>

