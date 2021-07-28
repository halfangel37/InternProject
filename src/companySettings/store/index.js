import {
  getBankAccounts,
  updateStatusBankAccount,
  deleteBankAccount,
} from "@/http/bankAccount.js";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
import NProgress from "nprogress";
import Vue from "vue";

const namespaced = true;
const state = {
  bankAccounts: [],
  totalPages: 0,
};

const mutations = {
  SET_BANK_ACCOUNTS(state, data) {
    state.bankAccounts = data;
  },
  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  CHANGE_BANK_ACCOUNT_STATUS(state, { bankAccountId, status }) {
    const index = state.bankAccounts.findIndex((b) => b.id === bankAccountId);
    state.bankAccounts[index].status = status;
  },
  DELETE_BANK_ACCOUNTS(state, bankAccountId) {
    const index = state.bankAccounts.findIndex((b) => b.id === bankAccountId);
    state.bankAccounts.splice(index, 1);
  },
};

const actions = {
  getBankAccounts({ commit }, { companyId, pageNumber, pageSize }) {
    NProgress.start();
    return getBankAccounts({ companyId, pageNumber, pageSize })
      .then((response) => {
        commit(
          "SET_TOTAL_PAGES",
          parseInt(JSON.parse(response.headers["x-pagination"]).TotalPages)
        );
        commit("SET_BANK_ACCOUNTS", response.data);
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  },
  updateStatusBankAccount(
    { commit },
    { companyId, bankAccountId, bankAccountStatus }
  ) {
    NProgress.start();
    const statusMessage = bankAccountStatus == 1 ? "Disable" : "Enable";
    return updateStatusBankAccount({
      companyId,
      bankAccountId,
      bankAccountStatus,
    })
      .then(() => {
        NProgress.done();
        commit("CHANGE_BANK_ACCOUNT_STATUS", {
          bankAccountId,
          status: bankAccountStatus,
        });
        Vue.$toast.success(statusMessage + " account successfully");
      })
      .catch((error) => {
        NProgress.done();
        const resetStatus =
          bankAccountStatus === 1 ? ENABLE_STATUS : DISABLE_STATUS;
        commit("CHANGE_BANK_ACCOUNT_STATUS", {
          bankAccountId,
          status: resetStatus,
        });
        Vue.$toast.error(error.response.data.errors[0].message);
      });
  },
  deleteBankAccount({ commit }, { companyId, bankAccountId }) {
    NProgress.start();
    return deleteBankAccount({ companyId, bankAccountId })
      .then(() => {
        NProgress.done();
        commit("DELETE_BANK_ACCOUNTS", bankAccountId);
        Vue.$toast.success("The account was successfully deleted.");
      })
      .catch((error) => {
        NProgress.done();
        Vue.$toast.error(error.response.data.errors[0].message);
      });
  },
};

const getters = {
  selectAllBankAccounts: (state) => state.bankAccounts,
  selectTotalPage: (state) => state.totalPages,
  selectSeletedBankAccount: (state) => state.bankAccount,
};

export default { namespaced, state, mutations, actions, getters };
