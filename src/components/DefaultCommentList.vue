<template>
  <v-modal title="Wybierz komentarz z listy" @close="$emit('close')">
    <v-list :items="listData" :on-select="onCommentClick"/>
  </v-modal>
</template>

<script>
  import VList from "./common/VList";
  import VModal from "./common/VModal";
  import {apiFetchDefaultComments} from "../api";
  import {mapActions} from "vuex";

  export default {
    name: "DefaultCommentList",
    data() {
      return {
        comments: []
      };
    },
    mounted() {
      apiFetchDefaultComments().then(comments => this.comments = comments);
    },
    methods: {
      ...mapActions("comments", ["submitComment"]),
      onCommentClick(comment) {
        this.submitComment(comment);
        this.$emit('close');
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
