<template>
  <v-modal :title="title" @close="goBack">
    <v-list :items="listData"/>
  </v-modal>
</template>

<script>
  import VModal from "./common/VModal";
  import VList from "./common/VList";
  import {apiFetchStatus} from "../api";
  import {mapGetters} from "vuex";

  export default {
    name: "StatusModal",
    mounted() {
      apiFetchStatus().then(response => {
        this.processes = response
      });
    },
    data() {
      return {
        processes: []
      }
    },
    computed: {
      ...mapGetters("worker", {workerMode: "mode"}),
      listData() {
        return this.processes.map(process => ({
          id: process.hash,
          text: process.url + "<br/>" + this.remainingText(process)
        }));
      },
      title() {
        const suffix = this.workerMode === "LIKES" ? "polubień" : "komentarzy";
        return "Status " + suffix;
      }
    },
    methods: {
      remainingText(process) {
        if (!process.remainingLikes && !process.remainingComments) {
          return "Zakończono";
        }
        let text = "Pozostało: ";
        if (process.remainingLikes) {
          text += process.remainingLikes + " \uD83D\uDC4D";
        }
        if (process.remainingComments) {
          text += process.remainingComments + " \uD83D\uDCAC";
        }
        return "<strong>" + text + "</strong>";
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