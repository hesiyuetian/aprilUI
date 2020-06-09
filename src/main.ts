// import "../packages/theme-chalk/lib/index.css"
import "../packages/theme-chalk/src/common.scss"
import "../packages/theme-chalk/src/pagination.scss"

import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
