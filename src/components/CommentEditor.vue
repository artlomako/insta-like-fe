<template>
  <div class="editor">
    <textarea class="editor__text-area" :value="editingComment.text"
              @change="changeEditingCommentText($event.target.value)" placeholder="Treść komentarza..."></textarea>
    <div class="editor__buttons">
      <v-icon-button @click="onSubmit" :icon="`${submitButtonIcon}.svg`" class="editor__button"/>
      <v-icon-button @click="onSubmit" icon="search.svg" class="editor__button"/>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapState} from "vuex";
  import VIconButton from "./VIconButton";

  export default {
    name: "CommentEditor",
    computed: {
      ...mapState(["editingComment"]),
      submitButtonIcon() {
        return this.editingComment.id === -1 ? "plus" : "check";
      }
    },
    methods: {
      onSubmit() {
        if (this.editingComment.text.trim().length > 0) {
          this.submitComment();
        }
      },
      ...mapMutations(["changeEditingCommentText"]),
      ...mapActions(["submitComment"])
    },
    components: {
      VIconButton
    }
  };
</script>

<style>
  .editor {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .editor__text-area {
    resize: none;
    height: 3rem;
    border: none;
    background-color: #d1d3c0;
    font-size: 1rem;
    width: 100%;
  }

  .editor__buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2rem 0 0.2rem 0.5rem;
  }

  .editor__button {
    width: 1.4rem;
    height: 1.4rem;
  }
</style>
