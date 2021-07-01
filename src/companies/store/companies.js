import Vue from "vue";
import Vuex from "vuex";
import { create } from "@/http/companies";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(Vuex);
Vue.use(VueToast);
export const namespaced = true;
export const mutations = {};

export const actions = {
  registerCompany({ commit }, companyInfor) {
    return create(companyInfor)
      .then(() => {
        Vue.$toast.open({
          message: "Create company successfully!",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        commit("");
        Vue.$toast.open({
          message: error,
          type: "error",
          duration: 3000,
          dismissible: true,
          position: "top-right",
        });
      });
  },
};
