import Vue from "vue";
import Vuex from "vuex";
import * as signin from "@/signin/store/signin.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { user: "" },
  mutations: {},
  actions: {},
  modules: { signin },
});
