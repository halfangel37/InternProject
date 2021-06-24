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
    state.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    HTTP.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  },
};

export const actions = {
  signinAccount({ commit }, credentials) {
    return HTTP.post("/auth/authenticate", credentials).then(({ data }) => {
      commit("SET_USER_DATA", data);
    });
  },
};
