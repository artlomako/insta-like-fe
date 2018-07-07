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
    <list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
    <div class="btn">
      <v-switch icon="save.svg" :on-click="submitComments"/>
    </div>
  </div>
</template>


<script>
  import List from "@/components/List";
  import VButton from "@/components/common/VButton";
  import VSwitch from "@/components/VSwitch";
  import VTextField from "@/components/common/VTextField";
  import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    components: {
      List,
      VButton,
      VSwitch,
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