import Vue from "vue";
import router from "@/router";
import store from "@/store";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "nprogress/nprogress.css";
import "./plugins/vuetoast";

import PageContainer from "./components/PageContainer.vue"

Vue.config.productionTip = false;
Vue.component("PageContainer", PageContainer);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
