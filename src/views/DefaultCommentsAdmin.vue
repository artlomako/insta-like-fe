<template>
  <div>
    <h2>Komentarze</h2>
    <input class="editor__text-area" :value="adminPassword"
           @change="changeAdminPassword($event.target.value)" placeholder="Hasło"></input>
    <div class="editor">
      <input class="editor__text-area" :value="editingComment.text"
             @change="changeEditingCommentText($event.target.value)" placeholder="Treść komentarza..."
             @keyup.enter="onSubmit"></input>
      <div class="editor__buttons">
        <v-icon-button @click="onSubmit" :icon="`${submitButtonIcon}.svg`" class="editor__button"/>
      </div>
    </div>
    <list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
    <div class="btn">
      <v-switch class="refresh-btn" icon="save.svg" @click="submitComments"/>
    </div>
  </div>
</template>


<script>
  import List from "@/components/List";
  import VIconButton from "@/components/VIconButton";
  import VSwitch from "@/components/VSwitch";
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    components: {
      List,
      VIconButton,
      VSwitch
    },
    computed: {
      ...mapState("defaultComments", ["comments", "editingComment", "adminPassword"]),
      ...mapGetters("defaultComments", ["isCommentEditing"]),
      submitButtonIcon() {
        return this.editingComment.id === -1 ? "plus" : "check";
      }

    },
    methods: {
      ...mapMutations("defaultComments", ["changeEditingCommentText", "changeAdminPassword"]),
      ...mapActions("defaultComments", ["selectComment", "deleteComment", "fetchComments", "submitEditingComment", "submitComments"]),
      onSubmit() {
        if (this.editingComment.text.trim().length > 0) {
          this.submitEditingComment();
        }
      }
    },
    beforeMount() {
      this.fetchComments();
    }
  }

</script>

<style>
  .editor__text-area {
    margin-top: 1rem;
  }

  .btn {
    text-align: center;
  }
</style>