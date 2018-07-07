<template>
  <div>
    <div class="editor">
      <input class="editor__text-area" :value="editingComment.text"
             @change="changeEditingCommentText($event.target.value)" placeholder="Treść komentarza..."
             @keyup.enter="onSubmit"></input>
      <div class="editor__buttons">
        <v-button size="tiny" @click="onSubmit" :icon="`${submitButtonIcon}.svg`"/>
        <v-button size="tiny" @click="showDefaultComments" icon="search.svg"/>
      </div>
    </div>
    <default-comment-list/>
  </div>
</template>

<script>
  import VButton from "./common/VButton";
  import DefaultCommentList from "./DefaultCommentList";

  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapActions, mapMutations} = createNamespacedHelpers("comments");
  export default {
    name: "CommentEditor",
    computed: {
      ...mapState(["editingComment"]),
      submitButtonIcon() {
        return !this.editingComment.id ? "plus" : "check";
      }
    },
    methods: {
      onSubmit() {
        if (this.editingComment.text.trim().length > 0) {
          this.submitEditingComment();
        }
      },
      showDefaultComments() {
        this.$modal.show("default-comments");
      },
      ...mapMutations(["changeEditingCommentText"]),
      ...mapActions(["submitEditingComment"])
    },
    components: {
      VButton,
      DefaultCommentList
    }
  };
</script>

<style scoped>
  .editor {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .editor__text-area {
    resize: none;
    height: 2rem;
    border: none;
    background-color: #d1d3c0;
    font-size: 1rem;
    width: 100%;
    margin: 0;
  }

  .editor__buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.5rem;
  }

</style>
