import comments from "./workerCommentsModule";
import likes from "./workerLikesModule";

const MODES = ["LIKES", "COMMENTS"];

export default {
  namespaced: true,
  modules: {
    comments,
    likes
  },
  state: {
    modeIdx: 0,
  },
  getters: {
    mode(state) {
      return MODES[state.modeIdx];
    },
    status(state) {
      console.log(state)
    }
  },
  mutations: {
    nextMode(state) {
      state.modeIdx = ++state.modeIdx % MODES.length;
    }
  },
  actions: {
    start(context) {
      if (context.getters.mode === "LIKES") {
        context.dispatch("likes/start");
      }
      if (context.getters.mode === "COMMENTS") {
        context.dispatch("comments/start");
      }
    }
  }
};