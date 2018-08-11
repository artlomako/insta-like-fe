<template>
  <div>
    <v-slider
      class="admin-likes__slider"
      title="Minimalna liczba polubień:"
      :max="9999"
      :value="settings.minActionsCount"
      @change="minActionsCount => changeSettings({minActionsCount})"
    />
    <v-slider
      class="admin-likes__slider"
      title="Maksymalna liczba polubień:"
      :max="9999"
      :value="settings.maxActionsCount"
      @change="maxActionsCount => changeSettings({maxActionsCount})"
    />
  </div>
</template>

<script>
  import VSlider from "../components/common/VSlider";

  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers("admin/likes");


  export default {
    name: "AdminLikesView",
    components: {
      VSlider
    },
    computed: {
      ...mapState(["settings"])
    },
    methods: {
      ...mapActions(["fetchSettings"]),
      ...mapMutations(["changeSettings"]),
    },
    mounted() {
      this.$store.commit("admin/changeMode", "LIKES");
      this.$store.dispatch("admin/fetch");
    }
  }
</script>

<style>
  .admin-likes__slider {
    margin-bottom: 0.5rem;
  }
</style>