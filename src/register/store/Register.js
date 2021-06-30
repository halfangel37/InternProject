import { register } from "@/http/auth";

export default {
  namespaced: true,
  state: {
    errorMessage: "",
    successMessage: "",
  },
  mutations: {
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message;
    },
  },
  actions: {
    registerAccount({ commit }, credentials) {
      commit("SET_ERROR_MESSAGE", "");
      commit("SET_SUCCESS_MESSAGE", "");
      return register(credentials)
        .then(() => {
          commit("SET_SUCCESS_MESSAGE", "success");
        })
        .catch((error) => {
          commit("SET_ERROR_MESSAGE", error.response.data.errors[0].message);
        });
    },
  },
  getters: {
    errorMessageGetter: (state) => state.errorMessage,
    successMessageGetter: (state) => state.successMessage,
  },
};
