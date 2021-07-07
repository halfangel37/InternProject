import Vue from "vue";
import { create } from "@/http/companies";
export const namespaced = true;

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
        });
      })
      .catch((error) => {
        commit("SET_ERROR_MESSAGE", "");
        Vue.$toast.open({
          message: error.response.data.errors[0].title,
          type: "error",
        });
      });
  },
};

export default {
  namespaced: true,
  actions,
}