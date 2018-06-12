<template>
  <div class="home">
    <photo-url-input :value="photoUrl" @change="changePhotoUrl"/>
    <div class="switches">
      <v-switch icon="heart.svg" :enabled="shouldLike" @click="switchShouldLike"/>
      <v-switch icon="comment.svg" :enabled="shouldComment" @click="switchShouldComment"/>
    </div>
    <transition name="fade">
      <comments-control class="comments" v-if="shouldComment"/>
    </transition>
    <button>START</button>
  </div>

</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import PhotoUrlInput from "@/components/PhotoUrlInput";
  import VSwitch from "@/components/VSwitch";
  import CommentsControl from "@/components/CommentsControl";

  export default {
    name: "home",
    computed: {
      ...mapState(["photoUrl", "shouldLike", "shouldComment"])
    },
    components: {
      PhotoUrlInput,
      VSwitch,
      CommentsControl
    },
    methods: {
      ...mapMutations([
        "switchShouldLike",
        "switchShouldComment",
        "changePhotoUrl"
      ])
    }

  };
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    padding: 1rem 25% 0 25%;
    align-items: center;
  }

  .switches {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;
  }

  .comments{
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