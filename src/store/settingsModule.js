import {apiGetLimits, apiSubmitLimits} from "../api";

export default {
  namespaced: true,
  state: {
    photoUrl: "",
    adminPassword: "",
    likes: {
      number: 0,
      period: 0,
      enabled: false,
    },
    comments: {
      enabled: false,
      period: 0,
      number: 0
    },
    limits: {
      likes: 0,
      comments: 0
    }
  },
  getters: {
    photoUrlValid({photoUrl}) {
      return (
          photoUrl.trim().length === 0 ||
          /^(https?:\/\/)?(www\.)?instagram\.com\/.+/.test(
              photoUrl.trim().toLowerCase()
          )
      );
    },
  },
  mutations: {
    changePhotoUrl(state, newUrl) {
      state.photoUrl = newUrl;
    },
    switchLikes({likes}) {
      likes.enabled = !likes.enabled;
    },
    changeNumberOfLikes({likes}, likesNumber) {
      likes.number = likesNumber;
    },
    switchComments({comments}) {
      comments.enabled = !comments.enabled;
    },
    changeNumberOfComments({comments}, commentsNumber) {
      comments.number = commentsNumber;
    },
    setLimits(state, limits) {
      state.limits = limits;
    },
    changeLikesPeriod({likes}, period) {
      likes.period = period;
    },
    changeCommentsPeriod({comments}, period) {
      comments.period = period;
    },
    changeLikesLimit({limits}, likes) {
      limits.likes = likes;
    },
    changeCommentsLimit({limits}, comments) {
      limits.comments = comments;
    },
    changeAdminPassword(state, p) {
      state.adminPassword = p;
    }
  },
  actions: {
    fetchLimits({commit, state}) {
      apiGetLimits().then(r => {
        commit("setLimits", r);
        if (state.comments.number > r.comments) {
          commit("changeNumberOfComments", r.comments);
        }
        if (state.likes.number > r.likes) {
          commit("changeNumberOfLikes", r.likes);
        }
      });
    },
    submitLimits({state}) {
      apiSubmitLimits(state.adminPassword, state.limits);
    }
  }
};