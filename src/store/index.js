import Vue from "vue";
import Vuex from "vuex";
import settings from "./settingsModule";
import {apiStart} from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    settings: settings
  },
  state: {
    status: "STOP",
  },
  mutations: {

    setStatus(state, status) {
      state.status = status;
    }
  },
  actions: {
    start({getters, state, commit}) {
      if (state.settings.photoUrl.length > 0 && getters["settings/photoUrlValid"]) {
        apiStart(state.settings.photoUrl, state.settings.shouldLike, state.settings.comments.map(c => c.text))
            .then(r => {
              switch (r.status) {
                case 200:
                  commit("setStatus", "RUNNING");
                  break;
                case 403:
                  commit("setStatus", "UNAUTHORIZED");
                  break;
                default:
                  commit("setStatus", "ERROR");
              }
            });
      }
    }

  }
})

