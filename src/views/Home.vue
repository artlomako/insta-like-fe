<template>
  <div class="home">
    <photo-url-input/>
    <div class="switches">
      <router-link :to="$route.path + '/status'">
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

  @media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    .home {
      padding: 2rem 5% 0 5%;
    }
  }

  .switches {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;
    align-items: center;
  }
</style>