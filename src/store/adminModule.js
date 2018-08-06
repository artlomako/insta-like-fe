import {invalidPassword} from "../messageBus";

export default {
  namespaced: true,
  state: {
    authentication: {
      authorized: false,
      password: ""
    },
    mode: "COMMENTS"
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
    authenticate(context, password) {
      return fetch("http://localhost:3000/api/authenticate", {
        method: "POST", headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password})
      }).then(r => {
        if (r.status === 200) {
          context.commit("setAuthentication", {
            password,
            authorized: true
          });
          return true;
        } else {
          context.commit("setAuthentication", {
            password: undefined,
            authorized: false
          });
          invalidPassword();
          return false;
        }
      });
    }
  }
};