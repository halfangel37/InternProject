import Vue from "vue";
import { create } from "@/http/employees";
import { updateStatusEmployee, getEmployees, deleteEmployee } from "@/http/employees";
import { STATUS } from "@/http/status-code";
import NProgress from "nprogress";

export const namespaced = true;

const state = {
  employees: [],
  totalPages: 0,
};

const mutations = {
  SET_EMPLOYEES(state, employees) {
    state.employees = employees;
  },

  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },

  SET_EMPLOYEE_STATE(state, { employee, status }) {
    const index = state.employees.indexOf(employee);
    state.employees[index].status = status;
  },

  DELETE_EMPLOYEE(state, employeeId) {
    state.employees = state.employees.filter(e => e.id != employeeId)
  },

};

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

  getEmployees({ commit }, { companyId, PageNumber, PageSize }) {
    NProgress.start();
    return getEmployees(companyId, PageNumber, PageSize)
      .then((response) => {
        commit(
          "SET_TOTAL_PAGES",
          parseInt(JSON.parse(response.headers["x-pagination"]).TotalPages)
        );
        commit("SET_EMPLOYEES", response.data);
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  },

  changeStatus({ commit, getters }, { companyId, employeeId, employeeStatus }) {
    const employee = getters.getEmployeeById(employeeId);
    let payload = [
      {
        value: employeeStatus,
        path: "/status/",
        op: "replace",
      },
    ];
    NProgress.start();
    return updateStatusEmployee(companyId, employeeId, payload)
      .then(() => {
        commit("SET_EMPLOYEE_STATE", {
          employee: employee,
          status: employeeStatus,
        });

        switch (employeeStatus) {
          case 1:
            Vue.$toast.success("Enable employee successfully!");
            break;
          case 0:
            Vue.$toast.success("Disable employee successfully!");
            break;
        }
        NProgress.done();
      })
      .catch(() => {
        Vue.$toast.error("Change status fail!");
        NProgress.done();
      });
  },

  deleteEmployee( {commit}, {companyId, employeeId}) {
    NProgress.start();
    return deleteEmployee(companyId, employeeId)
    .then(() => {
      commit("DELETE_EMPLOYEE", employeeId)
      Vue.$toast.open({
        message: "Delete employee successfully!",
        type: "success",
        duration: 3000,
        dismissible: true,
        position: "top-right",
      });
      NProgress.done();
    })
    .catch((err) => {
      Vue.$toast.open({
        message: err,
        type: "success",
        duration: 3000,
        dismissible: true,
        position: "top-right",
      });
    })
}
};

const getters = {
  getEmployees: (state) => state.employees,
  totalPages: (state) => state.totalPages,
  getEmployeeById: (state) => (id) => {
    return state.employees.find((employee) => employee.id === id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
