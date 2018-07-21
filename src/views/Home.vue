<template>
  <div class="home">
    <photo-url-input/>
    <div class="switches">
      <router-link to="status">
        <v-button icon="info.svg" size="big"/>
      </router-link>
      <mode-selector/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import PhotoUrlInput from "@/components/PhotoUrlInput";
  import VButton from "@/components/common/VButton";
  import ModeSelector from "@/components/ModeSelector";

  export default {
    name: "home",
    components: {
      ModeSelector,
      VButton,
      PhotoUrlInput,
    }
  }
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    padding: 2rem 17% 0 17%;
    align-items: center;
  }

  .switches {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;
    align-items: center;
  }

  .comments {
    width: 100%;
    margin-top: 1rem;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>