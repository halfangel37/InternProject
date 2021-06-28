import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export const HTTP = axios.create({
  baseURL: `http://intern-2021.southeastasia.cloudapp.azure.com:4000/api/v1`,
});

export const namespaced = true;

export const mutations = {
  SET_USER_DATA(state, userData) {
    const token = userData.token;
    localStorage.setItem("user", token);
  },
};

export const actions = {
  signinAccount({ commit }, credentials) {
    return HTTP.post("/auth/authenticate", credentials).then(({ data }) => {
      commit("SET_USER_DATA", data);
    });
  },
};
