import Vue from "vue";
import { create } from "@/http/employees";
import { STATUS } from "@/http/status-code";

export const namespaced = true;

export const mutations = {};

export const actions = {
  createEmployee(commit, { employee, companyId }) {
    return create(employee, companyId)
      .then(() => {
        Vue.$toast.open({
          message: "Create employee successfully!",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case STATUS.CONFLICT:
              Vue.$toast.open({
                message: error.response.data.errors[0].message,
                type: "error",
                duration: 3000,
                dismissible: true,
                position: "top-right",
              });
              break;
          }
        }
      });
  },
};
