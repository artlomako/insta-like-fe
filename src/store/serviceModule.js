import Vue from "vue";
import Vuex from "vuex";
import {apiStart} from "../api";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    status: {
      value: "STOP",
      lastUpdated: Date.now()
    },
  },
  getters: {
    status: state => {
      return state.value;
    }
  },
  mutations: {
    setStatus(state, newStatus) {
      state.status = {value: newStatus, lastUpdated: Date.now()};
    }
  },
  actions: {
    start(context) {
      const settings = context.rootState.settings;
      const commit = context.commit;
      if (settings.photoUrl.length === 0 || !context.rootGetters["settings/photoUrlValid"]) {
        commit("setStatus", "INVALID_PHOTO_URL");
        return;
      }
      apiStart(settings.photoUrl, settings.shouldLike, context.rootState.comments.comments.map(c => c.text))
          .then(r => {
            switch (r.status) {
              case 200:
                commit("setStatus", "RUNNING");
                break;
              case 403:
                commit("setStatus", "UNAUTHORIZED");
                break;
              case 503:
                commit("setStatus", "API_UNAVAILABLE");
                break;
              default:
                commit("setStatus", "ERROR");
            }
          });
    }
  }
}

