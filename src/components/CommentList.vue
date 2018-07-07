<template>
  <list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
</template>


<script>
  import List from "./List";
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
      List
    }
  };
</script>

<style scoped>
</style>
