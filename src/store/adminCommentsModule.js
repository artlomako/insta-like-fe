import {fetchComments as apiFetch, submitComments as apiSubmit} from "../api/settings";
import router from "../router";

export default {
  namespaced: true,
  state: {
    synchronized: true,
    settings: {
      minActionsCount: 0,
      maxActionsCount: 50,
      serviceId: 777,
      defaultComments: []
    },
    nextCommentId: 0
  },
  mutations: {
    changeSettings(state, payload) {
      const {fromApi, ...data} = payload;
      if (data.defaultComments) {
        data.defaultComments = data.defaultComments.map((v, i) => ({text: v, id: i}));
      }
      state.settings = {...state.settings, ...data};
      state.synchronized = !!fromApi;
    },
    addComment(state, newComment) {
      state.settings.defaultComments.push({text: newComment, id: state.nextCommentId++});
      state.synchronized = false;
    },
    deleteComment(state, comment) {
      state.settings.defaultComments = state.settings.defaultComments.filter(c => c.id !== comment.id);
      state.synchronized = false;
    },
    changeServiceId(state, serviceId) {
      state.settings.serviceId = parseInt(serviceId);
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
      context.commit("changeSettings", {...data, fromApi: true});
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