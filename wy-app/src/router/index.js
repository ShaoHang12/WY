import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home"),
    meta: {
      showTab: true,
    },
  },
  {
    path: "/my",
    name: "my",
    component: () => import("@/views/My.vue"),
    meta: {
      showTab: true,
    },
  },
  {
    path: "/itemmusic",
    name: "itemmusic",
    component: () => import("@/views/Home/ItemMusic"),
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
