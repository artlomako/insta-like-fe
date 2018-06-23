<template>
  <list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
</template>


<script>
  import {mapState, mapGetters, mapActions} from "vuex";
  import VIconButton from "./VIconButton";
  import List from "./List";

  export default {
    name: "CommentList",
    computed: {
      ...mapGetters("settings", ["isCommentEditing"]),
      ...mapState("settings", ["editingComment", "comments"])
    },
    methods: {
      isSelected(commentId) {
        return this.editingComment.id === commentId;
      },
      ...mapActions("settings", ["selectComment", "deleteComment"])
    },
    components: {
      VIconButton,
      List
    }
  };
</script>

<style scoped>

</style>
