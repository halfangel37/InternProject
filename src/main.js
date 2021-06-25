import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "nprogress/nprogress.css";
import axios from "axios";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    //const userString = localStorage.getItem("user");
    //if (userString) {
    // const userData = JSON.parse(userString);
    // this.$store.commit("SET_USER_DATA", userData);
    //} else {
    this.$router.push({ path: "/auth/signin" });
    //}
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("signout");
        }
        return Promise.reject(error);
      }
    );
  },
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
