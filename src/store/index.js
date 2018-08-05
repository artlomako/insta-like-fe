import Vue from "vue";
import Vuex from "vuex";
import settings from "./settingsModule";
import defaultComments from "./defaultCommentsModule";
import users from "./usersModule";
import service from "./serviceModule";
import worker from "./workerModule";
import admin from "./adminModule";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    admin,
    settings,
    service,
    defaultComments,
    users,
    worker
  },
  plugins: [createPersistedState()]
});