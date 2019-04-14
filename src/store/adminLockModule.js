import {
  fetchLock as apiFetchLock,
  submitLock as apiSubmitLock
} from "../api/settings";
import router from "../router";

export default {
  namespaced: true,
  state: {
    synchronized: true,
    settings: {
      serviceLocked: false,
      message: ""
    }
  },
  mutations: {
    setServiceLocked(state, serviceLocked) {
      state.settings.serviceLocked = serviceLocked;
      state.synchronized = false;
    },
    setMessage(state, message) {
      state.settings.message = message;
      state.synchronized = false;
    },
    setSettings(state, settings) {
      state.settings = settings;
      state.synchronized = true;
    }
  },
  actions: {
    async fetch(context) {
      const fetchResult = await apiFetchLock();
      if (fetchResult.status === 401) {
        router.push("/admin/login");
        return;
      }
      const result = await fetchResult.json();
      context.commit("setSettings", result);
    },
    async submit(context) {
      return await apiSubmitLock(context.state.settings);
    }
  }
};
