import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AdminView from "./views/AdminView.vue";
import AdminLikesView from "./views/AdminLikesView.vue";
import StatusModal from "./components/StatusModal";
import LikesView from "./views/LikesView";
import CommentsView from "./views/CommentsView";
import AdminLoginView from "./views/AdminLoginView";
import AdminUsersView from "./views/AdminUsersView";
import AdminCommentsView from "./views/AdminCommentsView";
import store from "./store";

Vue.use(Router);

const securityCheck = async (to, from, next) => {
  const authorized = await store.dispatch("admin/authenticate");
  if (!authorized) {
    next("/admin/login");
  } else {
    next();
  }
};

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/" + store.state.worker.mode.toLowerCase(),
      component: Home,
      children: [
        {
          path: "likes",
          component: LikesView,
          children: [
            {
              path: "status",
              component: StatusModal
            }
          ]
        },
        {
          path: "comments",
          component: CommentsView,
          children: [
            {
              path: "status",
              component: StatusModal
            }
          ]
        }
      ]
    },
    {
      path: "/admin",
      redirect: "/admin/" + store.state.admin.mode.toLowerCase(),
      component: AdminView,
      children: [
        {
          path: "likes",
          component: AdminLikesView,
          beforeEnter: securityCheck
        },
        {
          path: "users",
          component: AdminUsersView,
          beforeEnter: securityCheck
        },
        {
          path: "comments",
          component: AdminCommentsView,
          beforeEnter: securityCheck
        }
      ]
    },
    {
      path: "/admin/login",
      component: AdminLoginView
    }
  ]
});

export default router;
