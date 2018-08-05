export default {
  namespaced: true,
  state: {
    items: [],
    nextCommentId: 0,
    editingComment: {
      id: undefined,
      text: ""
    }
  },
  getters: {
    items(state) {
      return state.items.map(c => (
          {...c, selected: c.id === state.editingComment.id}
      ));
    }
  },
  mutations: {
    addComment(state, comment) {
      const newComment = {
        ...comment,
        id: state.nextCommentId++
      };
      state.items.unshift(newComment);
    },
    updateComment(state, comment) {
      state.items.find(c => comment.id === c.id).text = comment.text;
    },
    changeEditingCommentText(state, text) {
      state.editingComment.text = text;
    },
    clearEditingComment(state) {
      state.editingComment = {id: undefined, text: ""}
    },
    changeEditingComment(state, comment) {
      state.editingComment = {...comment};
    },
    deleteComment(state, comment) {
      const index = state.items.findIndex(c => c.id === comment.id);
      state.items.splice(index, 1);
    }
  },
  actions: {
    selectComment(context, comment) {
      if (comment.id === context.state.editingComment.id) {
        context.commit("clearEditingComment");
      } else {
        context.commit("changeEditingComment", comment);
      }
    },
    submitComment(context) {
      const editingComment = context.state.editingComment;
      if (editingComment.text.length === 0) {
        return;
      }
      const mutation = typeof editingComment.id === "undefined" ? "addComment" : "updateComment";
      context.commit(mutation, editingComment);
      context.commit("clearEditingComment");
    },
    deleteComment(context, comment) {
      if (comment.id === context.state.editingComment.id) {
        context.commit("clearEditingComment");
      }
      context.commit("deleteComment", comment);
    }
  }
};