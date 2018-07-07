<template>
  <div class="likes-control">
    <v-switch icon="heart.svg" :enabled="likes.enabled" @toggle="switchLikes"/>
    <counter :max="limits.likes" class="likes-control__number" :value="likes.number" @change="changeNumberOfLikes"
             :disabled="!likes.enabled"/>
    <counter :max="999" class="likes-control__number" :value="likes.period"
             @change="changeLikesPeriod"
             :disabled="!likes.enabled" label="Przerwa (s)"/>

  </div>
</template>

<script>
  import Counter from "./Counter";
  import VSwitch from "./common/VSwitch";
  import {createNamespacedHelpers} from "vuex";

  const {mapMutations, mapState} = createNamespacedHelpers("settings");

  export default {
    name: "LikesControl",
    computed: {
      ...mapState(["likes", "limits"]),
    },
    methods: {
      ...mapMutations(["switchLikes", "changeNumberOfLikes", "changeLikesPeriod"])
    },
    components: {
      Counter,
      VSwitch
    }
  }
</script>

<style scoped>
  .likes-control {
    display: flex;
    flex-direction: column;
  }

  .likes-control__number {
    margin-top: 0.5rem;
  }
</style>