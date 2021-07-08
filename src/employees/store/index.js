import Vue from "vue";
import { create } from "@/http/employees";
import { STATUS } from "@/http/status-code";

const actions = {
  createEmployee(commit, { employee, companyId }) {
    return create(employee, companyId)
      .then(() => {
        Vue.$toast.success("Create employee successfully!");
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case STATUS.CONFLICT:
              Vue.$toast.error(error.response.data.errors[0].message);
              break;
          }
        }
      });
  },
};

export default {
  namespaced: true,
  actions,
}