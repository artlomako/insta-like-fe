<template>
  <div>
    <h2>Użytkownicy</h2>
    <v-text-field :text="adminPassword"
                  @change="changeAdminPassword"
                  type="secondary"
                  placeholder="Hasło"></v-text-field>
    <v-text-field :text="editingComment.text"
                  @change="changeEditingCommentText"
                  type="secondary"
                  placeholder="Użytkownik"></v-text-field>
    <v-button size="medium" @click="onSubmit" :icon="`${submitButtonIcon}.svg`"/>
    <v-list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
    <v-button class="save-btn" icon="save.svg" size="medium" @click="submitComments"/>
  </div>
</template>


<script>
  import VList from "@/components/common/VList";
  import VButton from "@/components/common/VButton";
  import VTextField from "@/components/common/VTextField";
  import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    components: {
      VList,
      VButton,
      VTextField
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
  .btn {
    text-align: center;
  }
</style>