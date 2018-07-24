<template>
  <v-switch :front="mode === 'LIKES'" @toggle="switchToNextMode" icon-front="heart.svg" icon-back="comment.svg" size="big"/>
</template>

<script>
  import VSwitch from "./common/VSwitch";
  import {createNamespacedHelpers} from "vuex";

  const {mapGetters, mapMutations} = createNamespacedHelpers("worker");

  export default {
    name: "ModeSelector",
    computed: {
      ...mapGetters(["mode"])
    },
    methods: {
      ...mapMutations(["nextMode"]),
      switchToNextMode(){
        this.nextMode();
        const nextRoute = this.mode === "LIKES" ? "likes" : "comments";
        this.$router.push(nextRoute);
      }
    },
    components: {
      VSwitch
    }
  }
</script>