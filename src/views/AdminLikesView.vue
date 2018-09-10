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
      :max="settings.limits.maxActionsCount"
      :value="settings.limits.minActionsCount"
      @change="minActionsCount => changeLimits({minActionsCount})"
    />
    <v-slider
      class="admin-likes__control"
      title="Maksymalna liczba polubień:"
      :min="settings.limits.minActionsCount"
      :max="9999"
      :value="settings.limits.maxActionsCount"
      @change="maxActionsCount => changeLimits({maxActionsCount})"
    />
    <v-slider
      class="admin-likes__control"
      title="Maksymalna liczba polubień na dobę:"
      :min="settings.limits.maxActionsCount"
      :max="9999"
      :value="settings.limits.dailyLimit"
      @change="dailyLimit => changeLimits({dailyLimit})"
    />
    <v-slider
      class="admin-likes__control"
      title="Maksymalny czas wykonywania (godz.):"
      :max="48"
      :value="settings.limits.maxHoursCount"
      @change="maxHoursCount => changeLimits({maxHoursCount})"
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