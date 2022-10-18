import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/my",
    name: "my",
    component: () => import("@/views/My"),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.token) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/itemmusic",
    name: "itemmusic",
    component: () => import("@/views/ItemMusic"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  {
    //重定向，在项目跑起来，访问/立马定向到首页
    path: "/",
    redirect: "/home",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
