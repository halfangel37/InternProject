import { changeUserPassword } from "@/http/auth";
import {
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
} from "@/http/profile";

import Vue from "vue";
export default {
  namespaced: true,
  state: {
    user: { id: "", firstName: "", lastName: "", imageName: "" },
  },
  mutations: {
    SET_USER_PROFILE(state, user) {
      state.user = user;
    },
    UPDATE_USER_AVATAR(state, data) {
      state.user.imageName = data.imageName;
    },
  },
  actions: {
    changePassword(_, credentials) {
      return changeUserPassword(credentials)
        .then(() => {
          Vue.$toast.success("Change password successfully!");
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data.errors[0].message);
        });
    },
    getUserProfile({ commit }) {
      return getUserProfile().then((response) => {
        commit("SET_USER_PROFILE", response.data);
      });
    },
    updateUserProfile({ commit }, credentials) {
      return updateUserProfile(credentials)
        .then((response) => {
          commit("SET_USER_PROFILE", response.data);
          Vue.$toast.success("Your info have been saved.");
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data.errors);
        });
    },
    updateUserAvatar({ commit }, formData) {
      return updateUserAvatar(formData)
        .then((response) => {
          commit("UPDATE_USER_AVATAR", response.data);
          Vue.$toast.success("Your avatar have been saved.");
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data.errors.File[0]);
        });
    },
  },
  getters: {
    changePasswordMessageGetter: (state) => state.changePasswordMessage,
    userGetter: (state) => ({...state.user}),
  },
};
