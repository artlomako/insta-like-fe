<template>
  <div>
    <v-text-field
      class="admin-lock__control"
      :text="settings.message"
      @input="setMessage"
      type="secondary"
      placeholder="Komunikat"
    />
    <label>
      <input
        type="checkbox"
        :checked="settings.serviceLocked"
        @change="setServiceLocked(!settings.serviceLocked)"
      />Serwis zablokowany
    </label>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import VTextField from "../components/common/VTextField";

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "admin/lock"
);

export default {
  components: {
    VTextField
  },
  computed: {
    ...mapState(["settings"])
  },
  methods: {
    ...mapActions(["fetchSettings"]),
    ...mapMutations(["setServiceLocked", "setMessage"])
  },
  mounted() {
    this.$store.commit("admin/changeMode", "LOCK");
    this.$store.dispatch("admin/fetch");
  }
};
</script>

<style>
.admin-lock__control {
  margin-bottom: 0.5rem;
}
</style>
