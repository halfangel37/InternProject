import Vue from "vue";
import Vuex from "vuex";
import register from "./register/store/Register";
import * as signin from "@/signin/store/signin.js";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { register, signin },
});
