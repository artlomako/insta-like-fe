<template>
  <v-switch :front="mode === 'LIKES'" @toggle="switchToNextMode" icon-front="heart.svg" icon-back="comment.svg"
            size="big"/>
</template>

<script>
  import VSwitch from "./common/VSwitch";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations} = createNamespacedHelpers("worker");

  export default {
    name: "ModeSelector",
    computed: {
      ...mapState(["mode"])
    },
    methods: {
      ...mapMutations(["changeMode"]),
      switchToNextMode() {
        const nextMode = this.mode === "LIKES" ? "COMMENTS" : "LIKES";
        this.changeMode(nextMode);
        this.$router.push("/" + nextMode.toLowerCase());
      }
    },
    components: {
      VSwitch
    }
  }
</script>