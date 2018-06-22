<template>
  <div>
    <div class="editor">
    <textarea class="editor__text-area" :value="editingComment.text"
              @change="changeEditingCommentText($event.target.value)" placeholder="Treść komentarza..."></textarea>
      <div class="editor__buttons">
        <v-icon-button @click="onSubmit" :icon="`${submitButtonIcon}.svg`" class="editor__button"/>
        <v-icon-button @click="openModal" icon="search.svg" class="editor__button"/>
      </div>
    </div>
    <modal name="hello-world">
      <div class="cl">
        <p class="default-comment-list__title">Wybierz komentarz z listy</p>
        <default-comment-list/>
      </div>
    </modal>
    <modal name="state-panel">
      <state-panel/>
    </modal>
    <v-dialog @before-closed="resetError"/>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapState} from "vuex";
  import VIconButton from "./VIconButton";
  import DefaultCommentList from "./DefaultCommentList";
  import StatePanel from "./StatePanel";

  export default {
    name: "CommentEditor",
    computed: {
      ...mapState(["editingComment", "error"]),
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
      openModal() {
        this.fetchDefaultComments();
        this.$modal.show('hello-world');
      },
      ...mapMutations(["changeEditingCommentText", "resetError"]),
      ...mapActions(["submitComment", "fetchDefaultComments"])
    },
    watch: {
      error(e) {
        if (e) {
          this.$modal.show('dialog', {
            text: 'Użytkownik który udostępnił zdjęcie nie ma dostepu do serwisu.',
            buttons: [
              {
                title: 'OK',
                default: true
              }
            ]
          });
        }
      }
    },
    components: {
      StatePanel,
      VIconButton,
      DefaultCommentList
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
