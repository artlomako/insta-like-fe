<template>
  <div>
    <v-text-field
      class="admin-likes__control"
      :text="settings.serviceId"
      @input="changeServiceId"
      type="secondary"
      placeholder="Numer usługi Followiz"
    />
    <v-slider
      class="admin-likes__control"
      title="Minimalna liczba polubień:"
      :max="9999"
      :value="settings.limits.minActionsCount"
      @change="minActionsCount => changeLimits({minActionsCount})"
    />
    <v-slider
      class="admin-likes__control"
      title="Maksymalna liczba polubień:"
      :max="9999"
      :value="settings.limits.maxActionsCount"
      @change="maxActionsCount => changeLimits({maxActionsCount})"
    />
    <v-slider
      class="admin-likes__control"
      title="Minimalny odstęp czasu (min):"
      :max="9999"
      :value="settings.limits.minTimeInterval"
      @change="minTimeInterval => changeLimits({minTimeInterval})"
    />
    <v-slider
      class="admin-likes__control"
      title="Maksymalny odstęp czasu (min):"
      :max="9999"
      :value="settings.limits.maxTimeInterval"
      @change="maxTimeInterval => changeLimits({maxTimeInterval})"
    />
  </div>
</template>

<script>
  import VSlider from "../components/common/VSlider";

  import {createNamespacedHelpers} from "vuex";
  import VTextField from "../components/common/VTextField";

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers("admin/likes");


  export default {
    name: "AdminLikesView",
    components: {
      VTextField,
      VSlider
    },
    computed: {
      ...mapState(["settings"])
    },
    methods: {
      ...mapActions(["fetchSettings"]),
      ...mapMutations(["changeServiceId", "changeLimits"]),
    },
    mounted() {
      this.$store.commit("admin/changeMode", "LIKES");
      this.$store.dispatch("admin/fetch");
    }
  }
</script>

<style>
  .admin-likes__control {
    margin-bottom: 0.5rem;
  }
</style>