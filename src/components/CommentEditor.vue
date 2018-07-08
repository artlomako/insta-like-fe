<template>
  <div>
    <div class="editor">
      <v-text-field :text="editingComment.text"
                    @change="changeEditingCommentText"
                    type="secondary"
                    placeholder="Treść komentarza"
                    @keyup.enter="onSubmit"></v-text-field>
      <div class="editor__buttons">
        <v-button size="tiny" @click="onSubmit" :icon="`${submitButtonIcon}.svg`"/>
        <v-button size="tiny" @click="showDefaultComments=true" icon="search.svg"/>
      </div>
    </div>
    <default-comment-list v-if="showDefaultComments" @close="showDefaultComments=false"/>
  </div>
</template>

<script>
  import VButton from "./common/VButton";
  import VTextField from "./common/VTextField";
  import DefaultCommentList from "./DefaultCommentList";

  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapActions, mapMutations} = createNamespacedHelpers("comments");
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
        return !this.editingComment.id ? "plus" : "check";
      }
    },
    methods: {
      onSubmit() {
        if (this.editingComment.text.trim().length > 0) {
          this.submitEditingComment();
        }
      },
      ...mapMutations(["changeEditingCommentText"]),
      ...mapActions(["submitEditingComment"])
    },
    components: {
      VButton,
      DefaultCommentList,
      VTextField
    }
  };
</script>

<style scoped>
  .editor {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .editor__buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.5rem;
  }
</style>
