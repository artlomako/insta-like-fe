<template>
  <modal name="default-comments" @before-open="fetchComments">
    <div class="cl">
      <p class="default-comment-list__title">Wybierz komentarz z listy</p>
      <v-list :items="comments" :on-select="onCommentClick"/>
    </div>
  </modal>
</template>

<script>
  import VList from "./common/VList";
  import {mapState, mapActions} from "vuex";


  export default {
    name: "DefaultCommentList",
    computed: {
      ...mapState("defaultComments", ["comments"])
    },
    methods: {
      ...mapActions("comments", ["submitComment"]),
      ...mapActions("defaultComments", ["fetchComments"]),
      onCommentClick(comment) {
        this.submitComment(comment);
        this.$modal.hide("default-comments");
      }
    },
    components: {
      VList
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
