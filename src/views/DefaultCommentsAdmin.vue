<template>
  <div>
    <h2>Komentarze</h2>
    <v-text-field :text="adminPassword"
                  @change="changeAdminPassword"
                  type="secondary"
                  placeholder="Hasło"/>
    <v-text-field :text="editingComment.text"
                  @change="changeEditingCommentText"
                  type="secondary"
                  placeholder="Treść komentarza..."/>
    <v-button size="medium" @click="onSubmit" :icon="`${submitButtonIcon}.svg`"/>
    <v-list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
    <v-button icon="save.svg" size="medium" @click="submitComments"/>
  </div>
</template>


<script>
  import VList from "@/components/common/VList";
  import VTextField from "@/components/common/VTextField";
  import VButton from "@/components/common/VButton";
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    components: {
      VList,
      VTextField,
      VButton
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