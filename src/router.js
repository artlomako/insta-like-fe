import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import DefaultCommentsAdmin from "./views/DefaultCommentsAdmin.vue";
import UsersAdmin from "./views/UsersAdmin.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin/comments",
      name: "admin-comments",
      component: DefaultCommentsAdmin,
    },
    {
      path: "/admin/users",
      name: "admin-users",
      component: UsersAdmin,
    }
  ]
});
