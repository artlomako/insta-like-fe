import {fetchSettings as apiFetchSettings, submitSettings as apiSubmitSettings} from "../api/settings";
import router from "../router";

export default {
  namespaced: true,
  state: {
    synchronized: true,
    settings: {
      minActionsCount: 0,
      maxActionsCount: 50
    }
  },
  mutations: {
    changeSettings(state, payload) {
      const {fromApi, ...newSettings} = payload;
      state.settings = {...state.settings, ...newSettings};
      state.synchronized = !!fromApi;
    }
  },
  actions: {
    async fetch(context) {
      const fetchResult = await apiFetchSettings();
      if (fetchResult.status === 401) {
        error();
        router.push("/admin/login");
        return;
      }
      const data = await fetchResult.json();
      context.commit("changeSettings", {...data, fromApi: true});
    },
    async submit(context) {
      return await apiSubmitSettings({...context.state.settings});
    }
  }
}