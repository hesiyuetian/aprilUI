// import "../packages/theme-chalk/lib/index.css"
import "../packages/theme-chalk/lib/index.css"
// import "../packages/theme-chalk/src/form-item.scss"
// import "../packages/theme-chalk/src/input.scss"

import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
