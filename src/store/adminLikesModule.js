import {fetchSettings as apiFetchSettings, submitSettings as apiSubmitSettings} from "../api/settings";
import router from "../router";

export default {
  namespaced: true,
  state: {
    synchronized: true,
    settings: {
      limits: {
        minActionsCount: 0,
        maxActionsCount: 50,
        maxHoursCount: 50,
        dailyLimit: 50
      },
      serviceId: ""
    }
  },
  mutations: {
    changeLimits(state, limits) {
      state.settings.limits = {...state.settings.limits, ...limits};
      state.synchronized = false;
    },
    changeSettings(state, settings) {
      state.settings = settings;
      state.synchronized = true;
    },
    changeServiceId(state, serviceId) {
      state.settings.serviceId = serviceId;
      state.synchronized = false;
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
      const result = await fetchResult.json();
      context.commit("changeSettings", result);
    },
    async submit(context) {
      return await apiSubmitSettings(context.state.settings);
    }
  }
}