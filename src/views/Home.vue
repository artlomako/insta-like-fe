<template>
  <div class="home">
    <photo-url-input :value="photoUrl" @change="changePhotoUrl"/>

    <div class="switches">
      <v-switch icon="heart.svg" :enabled="shouldLike" @click="switchShouldLike"/>
      <v-switch icon="start.svg" primary @click="onClickStart"/>
      <v-switch icon="comment.svg" :enabled="shouldComment" @click="switchShouldComment"/>
    </div>
    <transition name="fade">
      <comments-control class="comments" v-if="shouldComment"/>
    </transition>
  </div>

</template>

<script>
  import {mapMutations, mapState, mapActions} from "vuex";
  import PhotoUrlInput from "@/components/PhotoUrlInput";
  import VSwitch from "@/components/VSwitch";
  import CommentsControl from "@/components/CommentsControl";
  import StatePanel from "@/components/StatePanel";

  export default {
    name: "home",
    computed: {
      ...mapState(["photoUrl", "shouldLike", "shouldComment"])
    },
    components: {
      PhotoUrlInput,
      VSwitch,
      CommentsControl,
      StatePanel
    },
    methods: {
      ...mapMutations([
        "switchShouldLike",
        "switchShouldComment",
        "changePhotoUrl"
      ]),
      ...mapActions(["start"]),
      onClickStart() {
        this.start();
      }
    }

  }
  ;
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    padding: 2rem 25% 0 25%;
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