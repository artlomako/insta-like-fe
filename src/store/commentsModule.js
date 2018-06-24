import {apiFetchDefaultComments} from "../api";

export default {
  namespaced: true,
  state: {
    defaultComments: [],
    comments: [],
    editingComment: {
      id: undefined,
      text: ""
    },
    nextCommentId: 0
  },
  getters: {
    isCommentEditing: ({editingComment}) => (commentToCheck) => editingComment.id === commentToCheck.id
  },
  mutations: {
    changeEditingCommentText(state, text) {
      state.editingComment.text = text;
    },
    resetEditingComment(state) {
      state.editingComment = {id: undefined, text: ""};
    },
    addComment(state, comment) {
      const newComment = {...comment, id: state.nextCommentId++};
      state.comments.push(newComment);
    },
    updateComment({comments}, comment) {
      const oldComment = comments.filter(c => c.id === comment.id)[0];
      oldComment.text = comment.text;
    },
    deleteComment(state, commentToDelete) {
      state.comments = state.comments.filter(comment => comment.id !== commentToDelete.id);
    },
    setEditingComment(state, comment) {
      state.editingComment = {...comment};
    },
    setDefaultComments(state, comments) {
      state.defaultComments = comments.map((comm, idx) => ({id: idx, text: comm}));
    }
  },
  actions: {
    submitComment({state, commit}, comment) {
      commit("addComment", comment);
      commit("resetEditingComment");
    },
    submitEditingComment({state, commit}) {
      const editingComment = state.editingComment;
      const mutation = typeof editingComment.id === "undefined" ? "addComment" : "updateComment";
      commit(mutation, editingComment);
      commit("resetEditingComment");
    },
    selectComment(context, comment) {
      if (comment.id === context.state.editingComment.id) {
        context.commit("resetEditingComment");
      } else {
        context.commit("setEditingComment", comment);
      }
    },
    deleteComment({state, commit}, comment) {
      if (state.editingComment.id === comment.id) {
        commit("resetEditingComment");
      }
      commit("deleteComment", comment);
    },
    fetchDefaultComments({commit}) {
      apiFetchDefaultComments().then(response => response.json())
          .then(comments => commit("setDefaultComments", comments));
    }
  }
};