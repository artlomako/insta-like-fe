<template>
  <div>
    <v-slider
      class="admin-comments__control"
      title="Minimalna liczba komentarzy:"
      :max="9999"
      :value="settings.limits.minActionsCount"
      @change="minActionsCount => changeLimits({minActionsCount})"
    />
    <v-slider
      class="admin-comments__control"
      title="Maksymalna liczba komentarzy:"
      :max="9999"
      :value="settings.limits.maxActionsCount"
      @change="maxActionsCount => changeLimits({maxActionsCount})"
    />
    <v-slider
      class="admin-comments__control"
      title="Minimalny odstęp czasu (sek):"
      :max="9999"
      :value="settings.limits.minTimeInterval"
      @change="minTimeInterval => changeLimits({minTimeInterval})"
    />
    <v-slider
      class="admin-comments__control"
      title="Maksymalny odstęp czasu (sek):"
      :max="9999"
      :value="settings.limits.maxTimeInterval"
      @change="maxTimeInterval => changeLimits({maxTimeInterval})"
    />
    <div class="admin-comments__comment-editor">
      <v-text-field
        class="admin-comments__comment-input"
        :text="comment"
        @input="changeComment"
        type="secondary"
        placeholder="Nowy komentarz"
        @keyup.enter="onAddComment"
      />
      <v-button
        icon="plus.svg"
        size="medium"
        @click="onAddComment"
        :disabled="comment.length === 0"
      />
    </div>
    <v-list
      :items="comments"
      :on-delete="deleteComment"
    />
  </div>
</template>

<script>
  import VSlider from "../components/common/VSlider";

  import {createNamespacedHelpers} from "vuex";
  import VTextField from "../components/common/VTextField";
  import VButton from "../components/common/VButton";
  import VList from "../components/common/VList";

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers("admin/comments");

  export default {
    name: "AdminCommentsView",
    components: {
      VList,
      VButton,
      VTextField,
      VSlider
    },
    data() {
      return {
        comment: ""
      }
    },
    computed: {
      ...mapState(["settings"]),
      comments() {
        return this.settings.defaultComments;
      }
    },
    methods: {
      ...mapActions(["fetchSettings"]),
      ...mapMutations(["changeLimits", "deleteComment", "addComment", "changeServiceId"]),
      changeComment(comment) {
        this.comment = comment;
      },
      onAddComment() {
        this.addComment(this.comment);
        this.comment = "";
      }
    },
    mounted() {
      this.$store.commit("admin/changeMode", "COMMENTS");
      this.$store.dispatch("admin/fetch");
    }
  }
</script>

<style>
  .admin-comments__control {
    margin-bottom: 0.5rem;
  }

  .admin-comments__comment-editor {
    display: flex;
    border-top: 1px solid black;
    padding-top: 0.4rem;
  }

  .admin-comments__comment-input {
    margin-right: 0.5rem;
  }
</style>