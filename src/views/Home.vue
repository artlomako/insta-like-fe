<template>
  <div class="home">
    <photo-url-input />
    <div class="switches">
      <router-link
        to="status"
        append
      >
        <v-button
          icon="info.svg"
          size="big"
        />
      </router-link>
      <v-button
        icon="start.svg"
        size="big"
        @click="start"
      />
      <mode-selector />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import PhotoUrlInput from "@/components/PhotoUrlInput";
import VButton from "@/components/common/VButton";
import ModeSelector from "@/components/ModeSelector";
import { mapActions } from "vuex";
import { fetchLock as apiFetchLock } from "../api/settings";

export default {
  name: "home",
  components: {
    ModeSelector,
    VButton,
    PhotoUrlInput
  },
  methods: {
    ...mapActions("worker", ["start"])
  },
  async created() {
    const response = await apiFetchLock();
    const { serviceLocked } = await response.json();
    if (serviceLocked) {
      this.$router.push("/service-locked");
    }
  }
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.switches {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
  align-items: center;
}
</style>
