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
      title="Przez ile godzin dodawać:"
      :max="maxHoursCount"
      :value="hoursCount"
      @change="changeHoursCount"
    />
    <router-view/>
  </div>
</template>

<script>
  import VSlider from "@/components/common/VSlider";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations, mapActions, mapGetters} = createNamespacedHelpers("worker/likes");

  export default {
    name: "LikesView",
    components: {
      VSlider
    },
    computed: {
      ...mapState(["actionsCount", "hoursCount", "limits"]),
      ...mapGetters(["maxHoursCount"])
    },
    methods: {
      ...mapMutations(["changeActionsCount", "changeHoursCount"]),
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

