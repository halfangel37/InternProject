import Vue from "vue";
import progress from "nprogress";

import { create, getCompanies, getCompanyById, deleteCompanies } from "@/http/companies";

const state = {
  companies: [],
  selectedCompanyId: undefined,
  pagination: {
    pageNumber: 1,
    totalPages: 0,
    pageSize: 10
  },
};

const getters = {
  selectAllCompanies: (state) => state.companies,
  selectCompanyPaging: (state) => state.pagination,
  selectSelectedCompanyId: (state) => state.selectedCompanyId,
  selectSelectedCompany: (state) => state.companies.find((c) => c.id === state.selectedCompanyId),
};

const mutations = {
  SET_ALL_COMPANIES(state, companies) {
    state.companies = companies;
    if(!state.selectedCompanyId && companies.length > 0){
      state.selectedCompanyId = companies[0].id;
    }
  },
  UPSERT_ONE_COMPANY(state, company) {
    const index = state.companies.findIndex(c => c.id === company.id);
    if(index >= 0) {
      state.companies[index] = company;
    } else {
      state.companies.push(company);
    }
  },
  REMOVE_ONE_COMPANY(state, companyId) {
    let companies = state.companies.filter(c => c.id != companyId)
    state.companies = companies;
    
    /**
     * If we delete the selected company,
     * so we should update the selected company to the first company in the list
     */
    if (companyId == state.selectedCompanyId && companies.length > 0) {
      state.selectedCompanyId = companies[0].id;
    }
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = {
      ...state.pagination,
      ...pagination
    };
  },
  SET_SELECTED_COMPANY_ID(state, selectedCompanyId) {
    state.selectedCompanyId = parseInt(selectedCompanyId)
  },
};

// TODO: handle error request
const actions = {
  getCompanies({ commit, getters }) {
    progress.start();
    const { pageNumber, pageSize } = getters.selectCompanyPaging;
    return getCompanies(pageNumber, pageSize)
    .then((response) => {
      const totalPages = parseInt(JSON.parse(response.headers["x-pagination"]).TotalPages);
      
      commit("SET_PAGINATION", {totalPages});
      commit("SET_ALL_COMPANIES", response.data);

      progress.done();
    });
  },

  deleteCompany({ commit }, companyId) {
    progress.start();
    return deleteCompanies(companyId).then(() => {
      progress.done();
      commit("REMOVE_ONE_COMPANY", companyId);
    })
  },

  selectCompany({ commit }, companyId) {
    commit("SET_SELECTED_COMPANY_ID", companyId);
  },

  getCompanyById({ commit }, companyId) {
    return getCompanyById(companyId).then((response) => {
      commit("UPSERT_ONE_COMPANY", response.data);
    });
  },

  registerCompany(_, companyInfor) {
    return create(companyInfor)
      .then(() => {
      })
      .catch((error) => {
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