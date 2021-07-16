import Vue from "vue";
import NProgress from "nprogress";
import { create } from "@/http/companies";
export const namespaced = true;
import { getCompanies, getCompanyById, deleteCompanies } from "@/http/companies";


const state = {
  companies: [],
  selectedCompanyId: undefined,
  company: {},
  totalPages: 0,
};

const getters = {
  allCompanies: (state) => state.companies,
  selectTotalPage: (state) => state.totalPages,
  selectedCompanyId: (state) => state.selectedCompanyId,
  selectedCompany: (state) => state.companies.find((c) => c.id === state.selectedCompanyId),
  getCompanyGetter: (state) => state.company,
  getCompanyByIdGetter: state => (id) => { return state.companies.find((company) => company.id === id) },
};

const mutations = {
  GET_COMPANIES(state, companies) {
    state.companies = companies;
  },
  DELETE_COMPANIES(state, companyId) {
    let companies = state.companies.filter(c => c.id != companyId)
    state.companies = companies
  },
  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_SELECTED_COMPANY_ID(state, selectedCompanyId) {
    state.selectedCompanyId = selectedCompanyId;
  },
  SET_COMPANY(state, company) {
    state.company = {},
      state.company = company;
  },
};
const actions = {
  getCompanies({ commit }, {
    PageNumber,
    PageSize
  }) {
    NProgress.start()
    return getCompanies(
      PageNumber,
      PageSize).then((response) => {
      commit(
        "SET_TOTAL_PAGES",
        parseInt(JSON.parse(response.headers["x-pagination"]).TotalPages)
      );
      commit("GET_COMPANIES", response.data)
      NProgress.done();
      commit("SET_COMPANY", response.data[0])
      NProgress.done();
    })
  },
  deleteCompany({ commit }, companyId) {
    NProgress.start();
    return deleteCompanies(companyId).then(() => {
      NProgress.done();
      commit("DELETE_COMPANIES", companyId);
    })
  },
  changeCompany({ commit }, company) {
    commit("SET_COMPANY", company)
  },
  selectCompany({ commit }, companyId) {
    commit("SET_SELECTED_COMPANY_ID", companyId);
  },
  getCompanyById({ commit, getters }, companyId) {
    const comp = getters.getCompanyByIdGetter(companyId)
    if (comp) {
      commit('SET_COMPANY', comp)
      return comp;
    } else {
      return getCompanyById(companyId).then((response) => {
        commit('SET_COMPANY', response.data)
      })
    }
  },
  registerCompany({ commit }, companyInfor) {
    return create(companyInfor)
      .then(() => {
        Vue.$toast.success("Create company successfully!");
      })
      .catch((error) => {
        commit("SET_ERROR_MESSAGE", "");
        Vue.$toast.error(error.response.data.errors[0].title);
      });
  },
};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}