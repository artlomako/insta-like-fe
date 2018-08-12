import {fetchComments as apiFetch, submitComments as apiSubmit} from "../api/settings";
import router from "../router";

export default {
  namespaced: true,
  state: {
    synchronized: true,
    settings: {
      limits: {
        minActionsCount: 0,
        maxActionsCount: 50,
      },
      defaultComments: []
    },
    nextCommentId: 0
  },
  mutations: {
    changeLimits(state, limits) {
      state.settings.limits = {...state.settings.limits, ...limits};
      state.synchronized = false;
    },
    changeSettings(state, settings) {
      settings.defaultComments = settings.defaultComments.map((v, i) => ({text: v, id: i}));
      state.nextCommentId = settings.defaultComments.length;
      state.settings = settings;
      state.synchronized = true;
    },
    addComment(state, newComment) {
      state.settings.defaultComments.push({text: newComment, id: state.nextCommentId++});
      state.synchronized = false;
    },
    deleteComment(state, comment) {
      state.settings.defaultComments = state.settings.defaultComments.filter(c => c.id !== comment.id);
      state.synchronized = false;
    }
  },
  actions: {
    async fetch(context) {
      const fetchResult = await apiFetch();
      if (fetchResult.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await fetchResult.json();
      context.commit("changeSettings", data);
    },
    async submit(context) {
      const settings = context.state.settings;
      const data = {
        ...settings,
        defaultComments: settings.defaultComments.map(c => c.text)
      };
      return await apiSubmit(data);
    }
  }
}