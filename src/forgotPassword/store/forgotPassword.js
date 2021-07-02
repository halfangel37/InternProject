import { forgotPassword } from "@/http/auth";

export const namespaced = true;
export const state = {
  errorMessage: "",
  isSuccess: false,
};
export const mutations = {
  SET_ERROR_MESSAGE(state, error) {
    state.errorMessage = error;
  },
  SET_IS_SUCCESS(state, isSuccess) {
    state.isSuccess = isSuccess;
  },
};
export const actions = {
  forgotPassword({ commit }, email) {
    commit("SET_IS_SUCCESS", false);
    commit("SET_ERROR_MESSAGE", "");
    return forgotPassword(email)
      .then(() => {
        commit("SET_IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_ERROR_MESSAGE", error);
      });
  },
};
export const getters = {
  errorMessageGetter: (state) => state.errorMessage,
  isSuccessGetter: (state) => state.isSuccess,
};
