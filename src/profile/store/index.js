import { changeUserPassword } from "@/http/auth";
import { httpClient } from "../../http/httpClient";
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
      return changeUserPassword(credentials)
        .then(() => {
          Vue.$toast.open({
            message: "Change password successfully!",
            type: "success",
          });
          commit();
        })
        .catch((error) => {
          Vue.$toast.open({
            message: error.response.data.errors[0].message,
            type: "error",
          });
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
