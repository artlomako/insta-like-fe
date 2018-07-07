<template>
  <div>
    <h2>Użytkownicy</h2>
    <input class="editor__text-area" :value="adminPassword"
           @change="changeAdminPassword($event.target.value)" placeholder="Hasło"></input>
    <div class="editor">
      <input class="editor__text-area" :value="editingComment.text"
             @change="changeEditingCommentText($event.target.value)" placeholder="Użytkownik"
             @keyup.enter="onSubmit"></input>
      <v-button size="medium" @click="onSubmit" :icon="`${submitButtonIcon}.svg`"/>
    </div>
    <list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
    <div class="btn">
      <v-switch class="refresh-btn" icon="save.svg" :on-click="submitComments"/>
    </div>
  </div>
</template>


<script>
  import List from "@/components/List";
  import VButton from "@/components/common/VButton";
  import VSwitch from "@/components/VSwitch";
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    components: {
      List,
      VButton,
      VSwitch
    },
    computed: {
      ...mapState("users", ["comments", "editingComment", "adminPassword"]),
      ...mapGetters("users", ["isCommentEditing"]),
      submitButtonIcon() {
        return this.editingComment.id === -1 ? "plus" : "check";
      }

    },
    methods: {
      ...mapMutations("users", ["changeEditingCommentText"]),
      ...mapActions("users", ["changeAdminPassword", "selectComment", "deleteComment", "fetchComments", "submitEditingComment", "submitComments"]),
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
    resize: none;
    height: 2rem;
    border: none;
    background-color: #d1d3c0;
    font-size: 1rem;
    width: 100%;
    margin-top: 1rem;
  }

  .btn {
    text-align: center;
  }
</style>