<template>
  <div class="home">
    <photo-url-input/>
    <div class="switches">
      <likes-control/>
      <v-button icon="start.svg" size="big" @click="onClickStart"/>
      <v-button icon="info.svg" size="big" @click="showStatusModal=true"/>
      <comments-ctrl/>
    </div>
    <transition name="fade">
      <comments-control class="comments" v-if="comments.enabled"/>
    </transition>
    <status-modal v-if="showStatusModal" @hide="showStatusModal=false"/>
    <error-dialog/>
  </div>

</template>

<script>
  import {mapActions, mapState} from "vuex";
  import PhotoUrlInput from "@/components/PhotoUrlInput";
  import CommentsControl from "@/components/CommentsControl";
  import ErrorDialog from "@/components/ErrorDialog";
  import StatusModal from "@/components/StatusModal";
  import LikesControl from "@/components/LikesControl";
  import CommentsCtrl from "@/components/CommentsCtrl";
  import VButton from "../components/common/VButton";

  export default {
    name: "home",
    data() {
      return {
        showStatusModal: false
      };
    },
    components: {
      VButton,
      PhotoUrlInput,
      CommentsControl,
      ErrorDialog,
      LikesControl,
      CommentsCtrl,
      StatusModal,
    },
    computed: {
      ...mapState("settings", ["comments"])
    },
    methods: {
      ...mapActions("service", ["start"]),
      ...mapActions("settings", ["fetchLimits"]),
      onClickStart() {
        this.start();
      },
    },
    beforeMount() {
      this.fetchLimits();
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
</style>