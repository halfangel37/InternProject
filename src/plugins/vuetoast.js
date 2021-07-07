import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast, {
  position: "top-right",
  duration: 3000,
  dismissible: true,
});
