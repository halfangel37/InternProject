import { signin } from "@/http/auth";

export const namespaced = true;

export const mutations = {
  SET_USER_DATA(state, userData) {
    const token = userData.token;
    localStorage.setItem("token", token);
  },
};

export const actions = {
  signinAccount({ commit }, credentials) {
    return signin(credentials).then(({ data }) => {
      commit("SET_USER_DATA", data);
    });
  },
};
