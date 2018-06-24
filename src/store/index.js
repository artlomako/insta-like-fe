import Vue from "vue";
import Vuex from "vuex";
import settings from "./settingsModule";
import comments from "./commentsModule";
import service from "./serviceModule";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    settings,
    comments,
    service
  }
})

