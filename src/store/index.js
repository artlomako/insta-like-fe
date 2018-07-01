import Vue from "vue";
import Vuex from "vuex";
import settings from "./settingsModule";
import comments from "./commentsModule";
import defaultComments from "./defaultCommentsModule";
import users from "./usersModule";
import service from "./serviceModule";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    settings,
    comments,
    service,
    defaultComments,
    users
  },
  plugins: [createPersistedState()]
})

