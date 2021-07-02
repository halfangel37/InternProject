import Vue from "vue";
import Vuex from "vuex";
import register from "./register/store/Register";
import profile from "@/profile/store";
import * as signin from "@/signin/store/signin.js";
import * as signout from "@/signout/store/signout.js";
import * as forgotPassword from "@/forgotPassword/store/forgotPassword.js";
import * as resetPassword from "@/resetPassword/store/resetPassword.js";
import * as companies from "@/companies/store/companies.js";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    register,
    signin,
    signout,
    profile,
    companies,
    forgotPassword,
    resetPassword,
  },
});
