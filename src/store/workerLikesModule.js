import * as messageBus from "../messageBus";

export default {
  namespaced: true,
  state: {
    actionsCount: 50
  },
  mutations: {
    changeActionsCount(state, actionsCount) {
      state.actionsCount = actionsCount;
    }
  },
  actions: {
    start() {
      messageBus.likesStarted();
    }
  }
};