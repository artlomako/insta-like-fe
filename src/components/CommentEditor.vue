<template>
  <div>
    <div class="comment-editor">
      <v-text-field class="comment-editor__text-field"
                    :text="editingComment.text"
                    @input="changeEditingCommentText"
                    type="secondary"
                    placeholder="Treść komentarza"
                    @keyup.enter="submitComment"
      />
      <v-button v-show="this.editorActive" size="medium" :icon="`${submitButtonIcon}.svg`"
                @click="submitComment"/>
      <v-button v-show="!this.editorActive" size="medium" icon="search.svg" @click="showDefaultComments=true"/>
    </div>
    <default-comment-list v-if="showDefaultComments" @close="showDefaultComments=false"/>
  </div>
</template>

<script>
  import VButton from "./common/VButton";
  import VList from "./common/VList";
  import VTextField from "./common/VTextField";
  import DefaultCommentList from "./DefaultCommentList";

  import {createNamespacedHelpers} from "vuex";

  const {mapMutations, mapState, mapActions} = createNamespacedHelpers("worker/comments");

  export default {
    name: "CommentEditor",
    data() {
      return {
        showDefaultComments: false
      }
    },
    computed: {
      ...mapState(["editingComment"]),
      submitButtonIcon() {
        return typeof this.editingComment.id === "undefined" ? "plus" : "check";
      },
      editorActive() {
        return this.editingComment.text.length > 0;
      }
    },
    methods: {
      ...mapActions(["submitComment"]),
      ...mapMutations(["changeEditingCommentText"])
    },
    components: {
      VButton,
      DefaultCommentList,
      VTextField,
      VList
    }
  };
</script>

<style>
  .comment-editor {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .comment-editor__text-field {
    margin-right: 0.5rem;
  }
</style>
