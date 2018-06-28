import Vue from "vue";
import Vuex from "vuex";
import {apiStart} from "../api";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    status: {
      value: "WAITING",
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
      const setStatus = (status) => commit("setStatus", status);
      const settings = context.rootState.settings;
      const commit = context.commit;
      if (settings.photoUrl.length === 0 || !context.rootGetters["settings/photoUrlValid"]) {
        setStatus("INVALID_PHOTO_URL");
        return;
      }
      if (!settings.likes.enabled && !settings.comments.enabled) {
        setStatus("NO_OPTION_CHOSEN");
        return;
      }
      const body = {
        photoUrl: settings.photoUrl
      };
      if (settings.likes.enabled) {
        body.likes = settings.likes.number;
      }
      if (settings.comments.enabled) {
        body.comments = {
          number: settings.comments.number,
          items: context.rootState.comments.comments.map(c => c.text)
        };
      }

      apiStart(body)
          .then(r => {
            switch (r.status) {
              case 202:
                setStatus("OK");
                break;
              case 403:
                setStatus("UNAUTHORIZED");
                break;
              case 409:
                setStatus("ALREADY_PROCESSING");
                break;
              case 422:
                setStatus("INVALID_PHOTO_URL");
                break;
              case 503:
                setStatus("API_UNAVAILABLE");
                break;
              default:
                setStatus("ERROR");
            }
          });
    }
  }
}

