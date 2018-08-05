import {apiFetchDefaultComments} from "../api";
import {invalidPassword} from "../messageBus";
export default {
  namespaced: true,
  state: {
    authentication: {
      authorized: false,
      password: ""
    },
    mode: "COMMENTS",
    comments: [],
    users: [],
  },
  getters: {
    isCommentEditing: ({editingComment}) => (commentToCheck) => editingComment.id === commentToCheck.id,
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
    },
    setAuthentication(state, authentication) {
      state.authentication = authentication;
    },
    changeMode(state, mode) {
      state.mode = mode;
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
    },
    authenticate(context, password) {
      return fetch("http://localhost:3000/api/authenticate", {
        method: "POST", headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password})
      }).then(r => {
        if (r.status === 200) {
          context.commit("setAuthentication", {
            password,
            authorized: true
          });
          return true;
        } else {
          context.commit("setAuthentication", {
            password: undefined,
            authorized: false
          });
          invalidPassword();
          return false;
        }
      });
    }
  }
};