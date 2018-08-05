<template>
  <v-list
    empty-message="Brak komentarzy..."
    :items="items"
    :on-select="selectComment"
    :on-delete="deleteComment"
  />
</template>

<script>
  import VList from "./common/VList";
  import {createNamespacedHelpers} from "vuex";

  const {mapActions, mapGetters} = createNamespacedHelpers("worker/comments");

  export default {
    name: "CommentList",
    computed: {
      ...mapGetters(["items"])
    },
    methods: {
      ...mapActions(["selectComment", "deleteComment"]),
    },
    components: {
      VList
    }
  };
</script>
