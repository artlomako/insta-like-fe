<template>
  <div class="likes-view">
    <v-slider
      title="Liczba akcji:"
      :min="50"
      :max="2000"
      :value="actionsCount"
      @change="changeActionsCount"
    />
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations} = createNamespacedHelpers("worker/likes");

  export default {
    name: "LikesView",
    components: {
      VSlider
    },
    computed: {
      ...mapState(["actionsCount"])
    },
    methods: {
      ...mapMutations(["changeActionsCount"])
    }
  }
</script>

<style>
  .likes-view {
    width: 100%;
  }
</style>

