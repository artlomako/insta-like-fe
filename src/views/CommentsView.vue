<template>
  <div class="comments-view">
    <v-slider
      class="comments-view__slider"
      title="Liczba akcji:"
      :min="limits.minActionsCount"
      :max="limits.maxActionsCount"
      :value="actionsCount"
      @change="changeActionsCount"
    />
    <v-slider
      class="comments-view__slider"
      title="Odstęp czasowy (sek):"
      :min="limits.minTimeInterval"
      :max="limits.maxTimeInterval"
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

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers("worker/comments");

  export default {
    name: "CommentsView",
    components: {
      CommentsControl,
      VSlider
    },
    computed: {
      ...mapState(["actionsCount", "timeInterval", "limits"])
    },
    methods: {
      ...mapMutations(["changeActionsCount", "changeTimeInterval"]),
      ...mapActions(["fetchLimits"])
    },
    mounted() {
      this.fetchLimits();
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

