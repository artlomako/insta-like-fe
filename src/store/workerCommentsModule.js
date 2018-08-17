import * as messageBus from "../messageBus";
import {fetchCommentsLimits as apiFetchLimits, startComments as apiStart} from "../api/worker";

export default {
  namespaced: true,
  state: {
    items: [],
    nextCommentId: 0,
    editingComment: {
      id: undefined,
      text: ""
    },
    timeInterval: 0,
    actionsCount: 0,
    limits: {
      minActionsCount: 0,
      maxActionsCount: 9999,
      minTimeInterval: 0,
      maxTimeInterval: 9999
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
    },
    changeActionsCount(state, actionsCount) {
      state.actionsCount = actionsCount;
    },
    changeTimeInterval(state, timeInterval) {
      state.timeInterval = timeInterval;
    },
    changeLimits(state, limits) {
      state.limits = limits;
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
    },
    async start(context, photoUrl) {
      if (context.state.items.length === 0) {
        messageBus.noComments();
      } else {
        const {items, actionsCount, timeInterval} = context.state;
        const response = await apiStart({photoUrl, comments: items.map(c => c.text), actionsCount, timeInterval});
        if (response.status === 202) {
          messageBus.commentsStarted();
        } else {
          return response.status;
        }
      }
    },
    async fetchLimits(context) {
      const response = await apiFetchLimits();
      if (response.status === 200) {
        const data = await response.json();
        context.commit("changeLimits", data);
        context.dispatch("applyLimits");
      } else {
        messageBus.error();
      }
    },
    applyLimits(context) {
      const limits = context.state.limits;
      if (context.state.actionsCount < limits.minActionsCount) {
        context.commit("changeActionsCount", limits.minActionsCount);
      } else if (context.state.actionsCount > limits.maxActionsCount) {
        context.commit("changeActionsCount", limits.maxActionsCount);
      }

      if (context.state.timeInterval < limits.minTimeInterval) {
        context.commit("changeTimeInterval", limits.minTimeInterval);
      } else if (context.state.timeInterval > limits.maxTimeInterval) {
        context.commit("changeTimeInterval", limits.maxTimeInterval);
      }
    }
  }
};