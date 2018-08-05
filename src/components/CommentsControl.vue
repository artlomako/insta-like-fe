<template>
  <div>
    <comment-editor/>
    <comment-list/>
  </div>
</template>

<script>
  import CommentEditor from "./CommentEditor";
  import CommentList from "./CommentList";

  export default {
    name: "CommentsControl",
    components: {
      CommentEditor,
      CommentList
    },
  };
</script>