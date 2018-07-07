<template>
  <div class="likes-control">
    <v-switch icon="comment.svg" :enabled="comments.enabled" @toggle="switchComments"/>
    <counter :max="limits.comments" class="likes-control__number" :value="comments.number"
             @change="changeNumberOfComments"
             :disabled="!comments.enabled"/>
    <counter :max="999" class="likes-control__number" :value="comments.period"
             @change="changeCommentsPeriod"
             :disabled="!comments.enabled" label="Przerwa (s)"/>
  </div>
</template>

<script>
  import Counter from "./Counter";
  import VSwitch from "./common/VSwitch";
  import {createNamespacedHelpers} from "vuex";

  const {mapMutations, mapState} = createNamespacedHelpers("settings");

  export default {
    name: "CommentsCtrl",
    computed: {
      ...mapState(["comments", "limits"]),
    },
    methods: {
      ...mapMutations(["switchComments", "changeNumberOfComments", "changeCommentsPeriod"])
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