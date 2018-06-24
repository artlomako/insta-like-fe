<template>
  <modal name="default-comments" @before-open="fetchDefaultComments">
    <div class="cl">
      <p class="default-comment-list__title">Wybierz komentarz z listy</p>
      <list :items="defaultComments" :on-select="onCommentClick"/>
    </div>
  </modal>
</template>

<script>
  import List from "./List";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapActions} = createNamespacedHelpers("comments");

  export default {
    name: "DefaultCommentList",
    computed: {
      ...mapState(["defaultComments"])
    },
    methods: {
      ...mapActions(["submitComment", "fetchDefaultComments"]),
      onCommentClick(comment) {
        this.submitComment(comment);
        this.$modal.hide("default-comments");
      }
    },
    components: {
      List
    }
  };
</script>

<style scoped>
  .default-comment-list__title {
    margin: 0.5rem 0 0 0.5rem;
    font-weight: bold;
    text-align: center;
  }

  .cl {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
  }
</style>
