import * as messageBus from "../messageBus";
import {startLikes as apiStart, fetchLikesLimits as apiFetchLimits} from "../api/worker";

export default {
  namespaced: true,
  state: {
    actionsCount: 0,
    hoursCount: 0,
    limits: {
      minActionsCount: 0,
      maxActionsCount: 9999,
      maxHoursCount: 24
    }
  },
  getters: {
    maxHoursCount(state) {
      return Math.min(state.limits.maxHoursCount, Math.floor(state.actionsCount / 50));
    }
  },
  mutations: {
    changeActionsCount(state, actionsCount) {
      state.actionsCount = actionsCount;
    },
    changeLimits(state, limits) {
      state.limits = limits;
    },
    changeHoursCount(state, hoursCount) {
      state.hoursCount = hoursCount;
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
      const response = await apiStart(photoUrl, context.state.actionsCount, context.state.hoursCount);
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
    }
  }
};