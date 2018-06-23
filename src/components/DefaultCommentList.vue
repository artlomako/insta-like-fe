<template>
  <list :items="defaultComments" :on-select="onCommentClick"/>
</template>


<script>
  import {mapState, mapActions} from "vuex";
  import List from "./List";

  export default {
    name: "DefaultCommentList",
    computed: {
      ...mapState("settings", ["editingComment", "defaultComments"])
    },
    methods: {
      ...mapActions("settings", ["submitComment"]),
      onCommentClick(comment) {
        this.submitComment(comment);
        this.$modal.hide("hello-world");
      }
    },
    components: {
      List
    }
  };
</script>

<style scoped>

</style>
