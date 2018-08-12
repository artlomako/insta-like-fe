<template>
  <div class="likes-view">
    <v-slider
      title="Liczba akcji:"
      :min="limits.minActionsCount"
      :max="limits.maxActionsCount"
      :value="actionsCount"
      @change="changeActionsCount"
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
      ...mapState(["actionsCount", "limits"])
    },
    methods: {
      ...mapMutations(["changeActionsCount"]),
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
</style>

