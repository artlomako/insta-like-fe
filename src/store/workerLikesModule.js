import * as messageBus from "../messageBus";
import {startLikes as apiStart, fetchLikesLimits as apiFetchLimits} from "../api/worker";

export default {
  namespaced: true,
  state: {
    actionsCount: 0,
    timeInterval: 0,
    limits: {
      minActionsCount: 0,
      maxActionsCount: 9999,
      minTimeInterval: 0,
      maxTimeInterval: 9999
    }
  },
  mutations: {
    changeActionsCount(state, actionsCount) {
      state.actionsCount = actionsCount;
    },
    changeLimits(state, limits) {
      state.limits = limits;
    },
    changeTimeInterval(state, timeInterval) {
      state.timeInterval = timeInterval;
    }
  },
  actions: {
    async fetchLimits(context) {
      const response = await apiFetchLimits();
      if (response.status === 200) {
        const data = await response.json();
        context.commit("changeLimits", data);
        context.dispatch("applyLimits");
      } else {
        messageBus.error();
      }
    },
    async start(context, photoUrl) {
      const response = await apiStart(photoUrl, context.state.actionsCount, context.state.timeInterval);
      if (response.status === 202) {
        messageBus.likesStarted();
      } else {
        return response.status;
      }
    },
    applyLimits(context) {
      const limits = context.state.limits;
      if (context.state.actionsCount < limits.minActionsCount) {
        context.commit("changeActionsCount", limits.minActionsCount);
      } else if (context.state.actionsCount > limits.maxActionsCount) {
        context.commit("changeActionsCount", limits.maxActionsCount);
      }

      if (context.state.timeInterval < limits.minTimeInterval) {
        context.commit("changeTimeInterval", limits.minTimeInterval);
      } else if (context.state.timeInterval > limits.maxTimeInterval) {
        context.commit("changeTimeInterval", limits.maxTimeInterval);
      }
    }
  }
};