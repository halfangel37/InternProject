import { changeUserPassword } from "@/http/auth";
import router from "../../router";
export default {
  namespaced: true,
  state: {
    changePasswordMessage: "",
  },
  mutations: {
    SET_PASSWORD_MESSAGE(state, errorMessage) {
      state.changePasswordMessage = errorMessage;
    },
  },
  actions: {
    changePassword({ commit }, credentials) {
      commit("SET_PASSWORD_MESSAGE", "");
      return changeUserPassword(credentials)
        .then(() => {
          commit("SET_PASSWORD_MESSAGE", null);
          setTimeout(() => router.push({ path: "/dashboard" }), 1700);
        })
        .catch((error) => {
          const message = error.response.data.errors[0]
            ? error.response.data.errors[0].message
            : error.response.data.errors.NewPassword[0];

          commit("SET_PASSWORD_MESSAGE", message);
        });
    },
  },
  getters: {
    changePasswordMessageGetter: (state) => state.changePasswordMessage,
  },
};
