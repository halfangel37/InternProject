import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "@/http/contacts.js";
import Vue from "vue";
import NProgress from "nprogress";

const namespaced = true;

const state = {
  contacts: [],
  pagination: {
    pageNumber: 1,
    totalPages: 0,
    pageSize: 10,
  },
};

const mutations = {
  SET_CONTACTS(state, data) {
    state.contacts = data;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = {
      ...state.pagination,
      ...pagination,
    };
  },
  SET_CONTACT_STATUS(state, { contactId, contactStatus, contactTypeChange }) {
    const index = state.contacts.findIndex((c) => c.id === contactId);
    if (contactTypeChange === 0) {
      state.contacts[index].customerStatus = contactStatus;
    } else {
      state.contacts[index].supplierStatus = contactStatus;
    }
  },
  DELETE_CONTACT(state, contactId) {
    const index = state.contacts.findIndex((c) => c.id === contactId);
    state.contacts.splice(index, 1);
  },
  CLEAR_STATES(state) {
    state.contacts = [];
    state.pagination = {
      pageNumber: 1,
      totalPages: 0,
      pageSize: 10,
    };
  },
};

const actions = {
  getContacts({ commit, getters }, { id }) {
    NProgress.start();
    const { pageNumber, pageSize } = getters.selectContactsPaging;
    return getContacts({ id, pageNumber, pageSize })
      .then((response) => {
        const totalPages = parseInt(
          JSON.parse(response.headers["x-pagination"]).TotalPages
        );
        commit("SET_PAGINATION", { totalPages });
        commit("SET_CONTACTS", response.data);
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  },
  setPagination({ commit }, { pageSize, pageNumber }) {
    commit("SET_PAGINATION", { pageNumber, pageSize });
  },
  updateContactStatus(
    { commit },
    { companyId, contactId, contactStatus, contactTypeChange }
  ) {
    NProgress.start();
    const statusMessage = contactStatus == 1 ? "Disable" : "Enable";
    return updateContactStatus({
      companyId,
      contactId,
      contactStatus,
      contactTypeChange,
    })
      .then(() => {
        NProgress.done();
        commit("SET_CONTACT_STATUS", {
          contactId,
          contactStatus,
          contactTypeChange,
        });
        Vue.$toast.success(statusMessage + " contact successfully");
      })
      .catch((error) => {
        NProgress.done();
        Vue.$toast.error(error.response.data.errors[0].message);
      });
  },
  deleteContact({ commit }, { companyId, contactId }) {
    NProgress.start();
    return deleteContact({ companyId, contactId })
      .then(() => {
        NProgress.done();
        commit("DELETE_CONTACT", contactId);
        Vue.$toast.success("The contact was successfully deleted.");
      })
      .catch((error) => {
        NProgress.done();
        Vue.$toast.error(error.response.data.errors[0].message);
      });
  },
  clearStates({ commit }) {
    commit("CLEAR_STATES");
  },
};

const getters = {
  selectAllContacts: (state) => state.contacts,
  selectTotalPages: (state) => state.pagination.totalPages,
  selectContactsPaging: (state) => state.pagination,
};

export default { namespaced, state, mutations, actions, getters };
