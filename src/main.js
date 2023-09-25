import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

// 按需引入 引入 ECharts 主模块
import echarts from "echarts";
//将echarts添加到vue的原型上
Vue.prototype.$echarts = echarts;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

// 导入GlobalLoading组件
import GlobalLoading from "./components/loading/loading-1";
import LyricView from "./components/music/lyric-view";

// 全局注册GlobalLoading组件
Vue.component("GlobalLoading", GlobalLoading);
Vue.component("LyricView", LyricView);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
