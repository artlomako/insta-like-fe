import comments from "./workerCommentsModule";
import likes from "./workerLikesModule";
import * as messageBus from "../messageBus";

const MODES = ["LIKES", "COMMENTS"];

export default {
  namespaced: true,
  modules: {
    comments,
    likes
  },
  state: {
    photoUrl: "",
    modeIdx: 0,
  },
  getters: {
    mode(state) {
      return MODES[state.modeIdx];
    },
    photoUrlValid({photoUrl}) {
      return (
          photoUrl.trim().length === 0 ||
          /^(https?:\/\/)?(www\.)?instagram\.com\/.+/.test(
              photoUrl.trim().toLowerCase()
          )
      );
    }
  },
  mutations: {
    nextMode(state) {
      state.modeIdx = ++state.modeIdx % MODES.length;
    },
    changePhotoUrl(state, newUrl) {
      state.photoUrl = newUrl;
    }
  },
  actions: {
    async start(context) {
      const photoUrl = context.state.photoUrl;
      if (photoUrl.length === 0) {
        messageBus.emptyPhotoUrl();
        return;
      }
      if (!context.getters.photoUrlValid) {
        messageBus.invalidPhotoUrl();
        return;
      }
      const action = context.getters.mode.toLowerCase() + "/start";
      const responseCode = await context.dispatch(action, photoUrl);
      if (responseCode) {
        switch (responseCode) {
          case 403:
            messageBus.accessDenied();
            break;
          case 409:
            messageBus.alreadyProcessing();
            break;
          case 503:
            messageBus.apiUnavailable();
            break;
          default:
            messageBus.error();
        }
      }
    }
  }
};