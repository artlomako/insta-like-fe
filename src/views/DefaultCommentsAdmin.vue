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
    <list :items="comments" :onSelect="selectComment" :onDelete="deleteComment" :isSelected="isCommentEditing"/>
    <div class="btn">
      <v-switch icon="save.svg" :on-click="submitComments"/>
    </div>
  </div>
</template>


<script>
  import List from "@/components/List";
  import VButton from "@/components/common/VButton";
  import VTextField from "@/components/common/VTextField";
  import VSwitch from "@/components/VSwitch";
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    components: {
      List,
      VTextField,
      VButton,
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

<style scoped>
  .btn {
    text-align: center;
  }
</style>