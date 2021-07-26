import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import register from "@/register/store";
import profile from "@/profile/store";
import signin from "@/signin/store";
import signout from "@/signout/store";
import companies from "@/companies/store";
import employees from "@/employees/store";
import forgotPassword from "@/forgotPassword/store";
import resetPassword from "@/resetPassword/store";
import products from "@/products/store";
import contacts from "@/contacts/store";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== "production",
  state: {},
  modules: {
    register,
    signin,
    signout,
    profile,
    companies,
    employees,
    forgotPassword,
    resetPassword,
    products,
    contacts,
  },
});
