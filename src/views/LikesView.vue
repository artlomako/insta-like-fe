<template>
  <div class="likes-view">
    <v-slider
      class="likes-view__slider"
      title="Liczba akcji:"
      :min="limits.minActionsCount"
      :max="limits.maxActionsCount"
      :value="actionsCount"
      @change="changeActionsCount"
    />
    <v-slider
      class="likes-view__slider"
      title="Odstęp czasowy (min):"
      :min="limits.minTimeInterval"
      :max="limits.maxTimeInterval"
      :value="timeInterval"
      @change="changeTimeInterval"
    />
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers("worker/likes");

  export default {
    name: "LikesView",
    components: {
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
  .likes-view {
    width: 100%;
  }

  .likes-view__slider {
    margin-bottom: 0.3rem;
  }
</style>

