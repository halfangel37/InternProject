import Vue from "vue";
import { create } from "@/http/companies";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast);

const actions = {
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
        commit("SET_ERROR_MESSAGE", "");
        Vue.$toast.open({
          message: error.response.data.errors[0].title,
          type: "error",
          duration: 3000,
          dismissible: true,
          position: "top-right",
        });
      });
  },
};

export default {
  namespaced: true,
  actions,
}