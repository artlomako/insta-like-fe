<template>
  <v-modal :title="title" @close="goBack">
    <v-list :items="listData"/>
  </v-modal>
</template>

<script>
  import VModal from "./common/VModal";
  import VList from "./common/VList";
  import {fetchLikesStatus, fetchCommentsStatus} from "../api/worker";
  import {mapState} from "vuex";

  export default {
    name: "StatusModal",
    mounted() {
      if (this.workerMode === "LIKES") {
        fetchLikesStatus().then(response => response.json()).then(data => this.processes = data);
      }
      if (this.workerMode === "COMMENTS") {
        fetchCommentsStatus().then(response => response.json()).then(data => this.processes = data);
      }
    },
    data() {
      return {
        processes: []
      }
    },
    computed: {
      ...mapState("worker", {workerMode: "mode"}),
      listData() {
        return this.processes.map(process => ({
          id: process.hash,
          text: process.url + "<br/><strong>" + this.remainingText(process) + "</strong>"
        }));
      },
      title() {
        const suffix = this.workerMode === "LIKES" ? "polubień" : "komentarzy";
        return "Status " + suffix;
      },
      modeIcon() {
        return this.workerMode === "LIKES" ? "\uD83D\uDC4D" : "\uD83D\uDCAC";
      }
    },
    methods: {
      remainingText(process) {
        if (!process.remaining) {
          return "Zakończono";
        }
        return "Pozostało " + process.remaining + " " + this.modeIcon;
      },
      goBack() {
        const path = this.$router.currentRoute.path;
        const lastSeparator = path.lastIndexOf("/");
        const previousPath = path.substr(0, lastSeparator);
        this.$router.push(previousPath);
      }
    },
    components: {
      VModal,
      VList
    }
  }
</script>