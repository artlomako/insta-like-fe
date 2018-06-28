<template>
  <div class="likes-control">
    <v-switch icon="heart.svg" :enabled="likes.enabled" @click="switchLikes"/>
    <counter max="500" class="likes-control__number" :value="likes.number" @change="changeNumberOfLikes"
             :disabled="!likes.enabled"/>
  </div>
</template>

<script>
  import Counter from "./Counter";
  import VSwitch from "./VSwitch";
  import {createNamespacedHelpers} from "vuex";

  const {mapMutations, mapState} = createNamespacedHelpers("settings");

  export default {
    name: "LikesControl",
    computed: {
      ...mapState(["likes"]),
    },
    methods: {
      ...mapMutations(["switchLikes", "changeNumberOfLikes"])
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