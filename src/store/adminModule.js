import likes from "./adminLikesModule";
import users from "./adminUsersModule";
import comments from "./adminCommentsModule";
import router from "../router";
import {authorizationError} from "../messageBus";
import {authenticateAdmin as apiAuthenticate} from "../api/settings";

export default {
  namespaced: true,
  modules: {
    likes,
    users,
    comments
  },
  state: {
    authentication: {
      authorized: false,
      password: ""
    },
    mode: "LIKES"
  },
  getters: {
    currentModule(state) {
      return state.mode.toLowerCase();
    },
    synchronized(state, getters) {
      return state[getters.currentModule].synchronized;
    }
  },
  mutations: {
    setAuthentication(state, authentication) {
      state.authentication = authentication;
    },
    changeMode(state, mode) {
      state.mode = mode;
    }
  },
  actions: {
    async submit(context) {
      const currentModule = context.getters.currentModule;
      const response = await context.dispatch(currentModule + "/submit");
      if (response.status === 401) {
        authorizationError();
        router.push("/admin/login");
        return;
      }
      if (response.status === 200) {
        context.dispatch("fetch");
      }
    },
    fetch(context) {
      const currentModule = context.getters.currentModule;
      context.dispatch(currentModule + "/fetch");
    },
    authenticate(context, password) {
      if (!password) {
        password = context.state.authentication.password;
      }
      return apiAuthenticate(password).then(r => {
        if (r.status === 200) {
          context.commit("setAuthentication", {
            password,
            authorized: true
          });
          return true;
        } else {
          context.commit("setAuthentication", {
            password: "",
            authorized: false
          });
          return false;
        }
      });
    },
  }
};