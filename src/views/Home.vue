<template>
  <div class="home">
    <photo-url-input/>
    <div class="switches">
      <likes-control/>
      <v-switch icon="start.svg" primary @click="onClickStart"/>
      <v-switch icon="info.svg" primary @click="showStatusModal"/>
      <comments-ctrl/>
    </div>
    <transition name="fade">
      <comments-control class="comments" v-if="comments.enabled"/>
    </transition>
    <status-modal/>
    <error-dialog/>
  </div>

</template>

<script>
  import {mapActions, mapState} from "vuex";
  import PhotoUrlInput from "@/components/PhotoUrlInput";
  import VSwitch from "@/components/VSwitch";
  import CommentsControl from "@/components/CommentsControl";
  import ErrorDialog from "@/components/ErrorDialog";
  import StatusModal from "@/components/StatusModal";
  import LikesControl from "@/components/LikesControl";
  import CommentsCtrl from "@/components/CommentsCtrl";

  export default {
    name: "home",
    data() {
      return {val: 1};
    },
    components: {
      PhotoUrlInput,
      VSwitch,
      CommentsControl,
      ErrorDialog,
      LikesControl,
      CommentsCtrl,
      StatusModal
    },
    computed: {
      ...mapState("settings", ["comments"])
    },
    methods: {
      ...mapActions("service", ["start"]),
      onClickStart() {
        this.start();
      },
      showStatusModal() {
        this.$modal.show("processes");
      }
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

  .btn-clazz {

  }
</style>