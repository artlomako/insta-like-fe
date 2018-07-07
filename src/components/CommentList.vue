<template>
  <v-list :items="comments" :on-select="selectComment" :on-delete="deleteComment" :is-selected="isCommentEditing"/>
</template>

<script>
  import VList from "./common/VList";
  import {createNamespacedHelpers} from "vuex";

  const {mapGetters, mapState, mapActions} = createNamespacedHelpers("comments");

  export default {
    name: "CommentList",
    computed: {
      ...mapGetters(["isCommentEditing"]),
      ...mapState(["editingComment", "comments"])
    },
    methods: {
      isSelected(commentId) {
        return this.editingComment.id === commentId;
      },
      ...mapActions(["selectComment", "deleteComment"])
    },
    components: {
      VList
    }
  };
</script>

<style scoped>
</style>
