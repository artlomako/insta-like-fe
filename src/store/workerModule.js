import comments from "./workerCommentsModule";
import likes from "./workerLikesModule";
import * as messageBus from "../messageBus";

export default {
  namespaced: true,
  modules: {
    comments,
    likes
  },
  state: {
    fetching: false,
    photoUrl: "",
    modeIdx: 0,
    mode: "LIKES"
  },
  getters: {
    photoUrlValid({ photoUrl }) {
      return (
        photoUrl.trim().length === 0 ||
        /^(https?:\/\/)?(www\.)?instagram\.com\/.+/.test(
          photoUrl.trim().toLowerCase()
        )
      );
    }
  },
  mutations: {
    changeMode(state, mode) {
      state.mode = mode;
    },
    changePhotoUrl(state, newUrl) {
      state.photoUrl = newUrl;
    },
    setFetching(state, fetching) {
      state.fetching = fetching;
    }
  },
  actions: {
    async start(context) {
      if (context.state.fetching) {
        return;
      }
      const photoUrl = context.state.photoUrl;
      if (photoUrl.length === 0) {
        messageBus.emptyPhotoUrl();
        return;
      }
      if (!context.getters.photoUrlValid) {
        messageBus.invalidPhotoUrl();
        return;
      }
      const action = context.state.mode.toLowerCase() + "/start";
      context.commit("setFetching", true);
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
        context.commit("setFetching", false);
      }
    }
  }
};
