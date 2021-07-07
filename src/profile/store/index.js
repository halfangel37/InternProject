import { changeUserPassword } from "@/http/auth";
import { httpClient } from "../../http/httpClient";
import router from "../../router";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    changePasswordMessage: "",
    user: { id: "", firstName: "", lastName: "", imageName: "" },
  },
  mutations: {
    SET_PASSWORD_MESSAGE(state, errorMessage) {
      state.changePasswordMessage = errorMessage;
    },
    SET_USER_PROFILE(state, user) {
      state.user = user;
    },
    UPDATE_USER_AVATAR(state, data) {
      state.user.imageName = data.imageName;
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
    getUserProfile({ commit }) {
      return httpClient.get("/accounts").then((response) => {
        commit("SET_USER_PROFILE", response.data);
      });
    },
    updateUserProfile({ commit }, credentials) {
      return httpClient
        .put("/accounts", credentials)
        .then((response) => {
          commit("SET_USER_PROFILE", response.data);

          Vue.$toast.success("Your info have been saved.", {
            position: "top-right",
          });
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data.errors, {
            position: "top-right",
          });
        });
    },
    updateUserAvatar({ commit }, formData) {
      return httpClient
        .post("/accounts/avatar", formData)
        .then((response) => {
          commit("UPDATE_USER_AVATAR", response.data);
          Vue.$toast.success("Your avatar have been saved.", {
            position: "top-right",
          });
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data.errors, {
            position: "top-right",
          });
        });
    },
  },
  getters: {
    changePasswordMessageGetter: (state) => state.changePasswordMessage,
    userNameGetter: (state) => state.user,
  },
};
