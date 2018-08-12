<template>
  <v-modal title="Wybierz komentarz z listy" @close="$emit('close')">
    <v-list :items="listData" :on-select="onCommentClick"/>
  </v-modal>
</template>

<script>
  import VList from "./common/VList";
  import VModal from "./common/VModal";
  import {fetchDefaultComments as apiFetchDefaultComments} from "../api/worker";
  import {mapMutations} from "vuex";

  export default {
    name: "DefaultCommentList",
    data() {
      return {
        comments: []
      };
    },
    mounted() {
      apiFetchDefaultComments().then(r => r.json()).then(comments => this.comments = comments);
    },
    methods: {
      ...mapMutations("worker/comments", ["addComment"]),
      onCommentClick(comment) {
        this.addComment(comment);
        this.$emit("close");
      }
    },
    computed: {
      listData() {
        return this.comments.map((el, idx) => ({text: el, id: idx}));
      }
    },
    components: {
      VList,
      VModal
    }
  };
</script>
