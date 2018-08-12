import * as messageBus from "../messageBus";
import {startLikes as apiStart, fetchLikesLimits as apiFetchLimits} from "../api/worker";

export default {
  namespaced: true,
  state: {
    actionsCount: 50,
    limits: {
      minActionsCount: 0,
      maxActionsCount: 100
    }
  },
  mutations: {
    changeActionsCount(state, actionsCount) {
      state.actionsCount = actionsCount;
    },
    changeLimits(state, limits) {
      state.limits = limits;
    }
  },
  actions: {
    async fetchLimits(context) {
      const response = await apiFetchLimits();
      if (response.status === 200) {
        context.commit("changeLimits", await response.json());
      } else {
        messageBus.error();
      }
    },
    async start(context, photoUrl) {
      const response = await apiStart(photoUrl, context.state.actionsCount);
      switch (response.status) {
        case 403:
          messageBus.accessDenied();
          break;
        case 409:
          messageBus.alreadyProcessing();
          break;
        case 503:
          messageBus.apiUnavailable();
          break;
        case 202:
          messageBus.likesStarted();
          break;
        default:
          messageBus.error();
      }
    }
  }
};