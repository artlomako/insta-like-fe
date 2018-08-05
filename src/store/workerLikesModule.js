export default {
  namespaced: true,
  state: {
    actionsCount: 50
  },
  mutations: {
    changeActionsCount(state, actionsCount) {
      state.actionsCount = actionsCount;
    }
  }
};