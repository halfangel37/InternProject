import { signin } from "@/http/auth";

const mutations = {
  SET_USER_DATA(state, userData) {
    const token = userData.token;
    localStorage.setItem("token", token);
  },
};

const actions = {
  signinAccount({ commit }, credentials) {
    return signin(credentials).then(({ data }) => {
      commit("SET_USER_DATA", data);
    });
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
}