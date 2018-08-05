<template>
  <div class="comments-view">
    <v-slider
      class="comments-view__slider"
      title="Liczba akcji:"
      :min="50"
      :max="2000"
      :value="actionsCount"
      @change="changeActionsCount"
    />
    <v-slider
      class="comments-view__slider"
      title="Odstęp czasowy (sek):"
      :max="100"
      :value="timeInterval"
      @change="changeTimeInterval"
    />
    <comments-control class="comments-view__control"/>
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";
  import CommentsControl from "@/components/CommentsControl";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations} = createNamespacedHelpers("worker/comments");

  export default {
    name: "CommentsView",
    components: {
      CommentsControl,
      VSlider
    },
    computed: {
      ...mapState(["actionsCount", "timeInterval"])
    },
    methods: {
      ...mapMutations(["changeActionsCount", "changeTimeInterval"])
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

