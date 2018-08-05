import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AdminView from "./views/AdminView.vue";
import AdminCommentsView from "./views/AdminCommentsView.vue";
import AdminLikesView from "./views/AdminLikesView.vue";
import AdminUsersView from "./views/AdminUsersView.vue";
import StatusModal from "./components/StatusModal";
import LikesView from "./views/LikesView";
import CommentsView from "./views/CommentsView";
import AdminLoginView from "./views/AdminLoginView";
import store from "./store";

Vue.use(Router);

const checkAuthentication = (to, from, next) => {
  const authorized = store.state.admin.authentication.authorized;
  if (authorized) {
    next();
  } else {
    next("/admin/login")
  }
};

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/likes",
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
          path: "login",
          component: AdminLoginView
        },
        {
          path: "comments",
          component: AdminCommentsView,
          beforeEnter: checkAuthentication
        },
        {
          path: "likes",
          component: AdminLikesView,
          beforeEnter: checkAuthentication
        },
        {
          path: "users",
          component: AdminUsersView,
          beforeEnter: checkAuthentication
        }
      ]
    }
  ]
});

export default router;
