import Vue from "vue";
import Vuex from "vuex";
import worker from "./workerModule";
import admin from "./adminModule";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    admin,
    worker
  },
  plugins: [createPersistedState()]
});