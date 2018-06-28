<template>
  <div class="likes-control">
    <v-switch icon="comment.svg" :enabled="comments.enabled" @click="switchComments"/>
    <counter max="50" class="likes-control__number" :value="comments.number" @change="changeNumberOfComments"
             :disabled="!comments.enabled" :max="20"/>
  </div>
</template>

<script>
  import Counter from "./Counter";
  import VSwitch from "./VSwitch";
  import {createNamespacedHelpers} from "vuex";

  const {mapMutations, mapState} = createNamespacedHelpers("settings");

  export default {
    name: "CommentsCtrl",
    computed: {
      ...mapState(["comments"]),
    },
    methods: {
      ...mapMutations(["switchComments", "changeNumberOfComments"])
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