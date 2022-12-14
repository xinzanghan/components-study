import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入elementUi
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// iconfont
import "./styles/icon/iconfont.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
