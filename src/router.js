import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import DefaultCommentsAdmin from "./views/DefaultCommentsAdmin.vue";
import UsersAdmin from "./views/UsersAdmin.vue";
import LimitsAdmin from "./views/LimitsAdmin.vue";
import StatusModal from "./components/StatusModal";
import LikesView from "./views/LikesView";
import NewComments from "./components/NewComments";

Vue.use(Router);

const router = new Router({

  routes: [
    {
      path: "/",
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
          component: NewComments,
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
      path: "/admin/comments",
      component: DefaultCommentsAdmin,
    },
    {
      path: "/admin/users",
      component: UsersAdmin,
    },
    {
      path: "/admin/limits",
      component: LimitsAdmin,
    }
  ]
});

router.afterEach((to, from) => {
  sessionStorage.setItem("lastVisitedRoute", from.path);
});

export default router;
