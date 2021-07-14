import Vue from "vue";
import router from "@/router";
import store from "@/store";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "nprogress/nprogress.css";
import "./plugins/vuetoast";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
