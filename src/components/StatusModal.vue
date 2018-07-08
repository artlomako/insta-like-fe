<template>
  <v-modal title="Aktualne procesy" @close="$emit('hide')">
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
        processes: [{
          "likes": {"error": 0, "waiting": 1, "success": 0},
          "url": "https://www.instagram.com/p/BkeosKDBBep/?taken-by=miejscawewroclawiu_pl",
          hash: "hashAAAbbaA"
        }]
      }
    },
    computed: {
      listData() {
        return this.processes.map(p => {
          return {
            id: p.hash,
            text: this.completedActions(p) + "/" + this.totalActions(p) + " | " + p.url
          }
        });
      }
    },
    methods: {
      totalActions(process) {
        let total = 0;

        if (process.likes) {
          total += process.likes.error;
          total += process.likes.waiting;
          total += process.likes.success;
        }
        if (process.comments) {
          total += process.comments.error;
          total += process.comments.waiting;
          total += process.comments.success;
        }

        return total;
      },
      completedActions(process) {
        let completed = 0;

        if (process.likes) {
          completed += process.likes.error;
          completed += process.likes.success;
        }
        if (process.comments) {
          completed += process.comments.error;
          completed += process.comments.success;
        }

        return completed;
      }
    },
    components: {
      VModal,
      VList
    }
  }
</script>