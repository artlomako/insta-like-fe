const MODES = ["LIKES", "COMMENTS"];

export default {
  namespaced: true,
  state: {
    modeIdx: 0
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