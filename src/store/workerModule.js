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
    }
  },
  mutations: {
    nextMode(state) {
      state.modeIdx = ++state.modeIdx % MODES.length;
    }
  }
};