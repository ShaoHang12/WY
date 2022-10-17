import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 1. 引入你需要的组件
import { Search, Swipe, SwipeItem,Popup  } from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";
Vue.config.productionTip = false;
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup)
new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
