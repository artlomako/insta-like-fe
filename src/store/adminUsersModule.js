import {fetchUsers as apiFetch, submitUsers as apiSubmit} from "../api/settings";
import router from "../router";

export default {
  namespaced: true,
  state: {
    synchronized: true,
    users: [],
    nextUserId: 0
  },
  mutations: {
    changeUsers(state, data) {
      const {fromApi, ...newUsers} = data;
      state.users = Object.values(newUsers).map((v, i) => ({text: v, id: i}));
      state.nextUserId = state.users.length;
      state.synchronized = !!fromApi;
    },
    addUser(state, username) {
      state.users.push({text: username, id: state.nextUserId++});
      state.synchronized = false;
    },
    deleteUser(state, user) {
      state.users = state.users.filter(u => u.id !== user.id);
      state.synchronized = false;
    }
  },
  actions: {
    async fetch(context) {
      const fetchResult = await apiFetch();
      if (fetchResult.status === 401) {
        error();
        router.push("/admin/login");
        return;
      }
      const data = await fetchResult.json();
      context.commit("changeUsers", {...data, fromApi: true});
    },
    async submit(context) {
      return await apiSubmit(context.state.users.map(u => u.text));
    }
  }
}