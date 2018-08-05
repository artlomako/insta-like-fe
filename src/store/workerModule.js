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
    status(state) {
      console.log(state)
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
    start(context) {
      if (context.state.photoUrl.length === 0) {
        messageBus.emptyPhotoUrl();
        return;
      }
      if (!context.getters.photoUrlValid) {
        messageBus.invalidPhotoUrl();
        return;
      }
      if (context.getters.mode === "LIKES") {
        context.dispatch("likes/start");
      }
      if (context.getters.mode === "COMMENTS") {
        context.dispatch("comments/start");
      }
    }
  }
};