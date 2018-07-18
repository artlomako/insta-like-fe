<template>
  <v-modal title="Aktualne procesy" @close="$emit('close')">
    <v-list :items="listData"/>
  </v-modal>
</template>

<script>
  import VModal from "./common/VModal";
  import VList from "./common/VList";
  import {apiFetchStatus} from "../api";

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
      listData() {
        return this.processes.map(process => ({
          id: process.hash,
          text: process.url + "<br/>" + this.remainingText(process)
        }));
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
      }
    },
    components: {
      VModal,
      VList
    }
  }
</script>