import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    editingComment: {
      id: -1,
      text: ""
    },
    shouldLike: true,
    shouldComment: true,
    comments: [],
    photoUrl: ""
  },
  mutations: {
    switchShouldLike(state) {
      state.shouldLike = !state.shouldLike;
    },
    switchShouldComment(state) {
      state.shouldComment = !state.shouldComment;
    },
    changePhotoUrl(state, newUrl) {
      state.photoUrl = newUrl;
    },
    changeEditingCommentText(state, text) {
      state.editingComment.text = text;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    deleteComment(state, id) {
      state.comments = state.comments.filter(c => c.id !== id);
    },
    resetEditingComment(state) {
      state.editingComment = { id: -1, text: "" };
    },
    setEditingComment(state, comment) {
      state.editingComment = { ...comment };
    },
    submitEditingComment(state) {
      state.comments = state.comments
        .map(
          c =>
            c.id === state.editingComment.id ? { ...state.editingComment } : c
        )
    }
  },
  actions: {
    submitComment(context) {
      if (context.state.editingComment.id == -1) {
        context.commit("addComment", {
          ...context.state.editingComment,
          id: context.state.comments.length
        });
      } else {
        context.commit("submitEditingComment");
      }
      context.commit("resetEditingComment");
    },
    selectComment(context, comment) {
      if (comment.id === context.state.editingComment.id) {
        context.commit("resetEditingComment");
      } else {
        context.commit("setEditingComment", comment);
      }
    },
    deleteComment(context, id) {
      if (context.state.editingComment.id === id) {
        context.commit("resetEditingComment");
      }
      context.commit("deleteComment", id);
    }
  }
});
