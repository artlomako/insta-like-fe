import {apiFetchDefaultComments} from "../api";


export default {
  namespaced: true,
  state: {
    photoUrl: "https://www.instagram.com/p/BPPusvlBZRh/?taken-by=purplehaze322",
    defaultComments: [],
    comments: [],
    editingComment: {
      id: undefined,
      text: ""
    },
    shouldLike: true,
    shouldComment: true
  },
  getters: {
    photoUrlValid({photoUrl}) {
      return (
          photoUrl.trim().length === 0 ||
          /^(https?:\/\/)?(www\.)?instagram\.com\/.+/.test(
              photoUrl.trim().toLowerCase()
          )
      );
    },
    isCommentEditing: state => comment => state.editingComment.id === comment.id
  },
  mutations: {
    changePhotoUrl(state, newUrl) {
      state.photoUrl = newUrl;
    },
    switchShouldLike(state) {
      state.shouldLike = !state.shouldLike;
    },
    switchShouldComment(state) {
      state.shouldComment = !state.shouldComment;
    },
    changeEditingCommentText(state, text) {
      state.editingComment.text = text;
    },
    resetEditingComment(state) {
      state.editingComment = {id: undefined, text: ""};
    },
    addComment({comments}, comment) {
      const oldComment = comments.filter(c => c.id === comment.id)[0];
      if (oldComment) {
        oldComment.text = comment.text;
      } else {
        comments.push(comment);
      }
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
    submitComment({state, commit}, newComment) {
      if (typeof newComment !== "undefined") {
        const comment = {...newComment};
        comment.id = state.comments.length;
        commit("addComment", comment);
      } else {
        const comment = {...state.editingComment};
        if (typeof comment.id === "undefined") {
          comment.id = state.comments.length;
        }
        commit("addComment", comment);
      }
      commit("resetEditingComment");
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
    },
    fetchDefaultComments(context) {
      apiFetchDefaultComments().then(response => response.json())
          .then(comments => context.commit("setDefaultComments", comments));
    }
  }
};