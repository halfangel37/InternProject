import Vue from "vue";
import { create } from "@/http/companies";
export const namespaced = true;

const actions = {
  registerCompany({ commit }, companyInfor) {
    return create(companyInfor)
      .then(() => {
        Vue.$toast.success("Create company successfully!");
      })
      .catch((error) => {
        commit("SET_ERROR_MESSAGE", "");
        Vue.$toast.error(error.response.data.errors[0].title);
      });
  },
};

export default {
  namespaced: true,
  actions,
}