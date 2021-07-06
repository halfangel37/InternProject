import { forgotPassword } from "@/http/auth";

const state = {
  errorMessage: "",
  isSuccess: false,
};

const mutations = {
  SET_ERROR_MESSAGE(state, error) {
    state.errorMessage = error;
  },
  SET_IS_SUCCESS(state, isSuccess) {
    state.isSuccess = isSuccess;
  },
};

const actions = {
  forgotPassword({ commit }, email) {
    commit("SET_IS_SUCCESS", false);
    commit("SET_ERROR_MESSAGE", "");
    return forgotPassword(email)
      .then(() => {
        commit("SET_IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_ERROR_MESSAGE", error.response.data.errors[0].message);
      });
  },
};

const getters = {
  errorMessageGetter: (state) => state.errorMessage,
  isSuccessGetter: (state) => state.isSuccess,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}