import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 1. 引入你需要的组件
import { Tabbar, TabbarItem } from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";
Vue.config.productionTip = false;
Vue.use(Tabbar, TabbarItem);
new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
