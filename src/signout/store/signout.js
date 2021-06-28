import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export const HTTP = axios.create({
  baseURL: `http://intern-2021.southeastasia.cloudapp.azure.com:4000/api/v1`,
});

export const namespaced = true;

export const mutations = {
  CLEAR_USER_DATA() {
    localStorage.removeItem("token");
    location.reload();
  },
};

export const actions = {
  signoutAccount({ commit }) {
    commit("CLEAR_USER_DATA");
  },
};
