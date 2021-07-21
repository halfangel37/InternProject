import {
  getProducts,
  updateStatusProduct,
  deleteProduct,
} from "@/http/products.js";
import Vue from "vue";
import NProgress from "nprogress";
const namespaced = true;
const state = {
  products: [],
  totalPages: 0,
};
const mutations = {
  SET_PRODUCTS(state, data) {
    state.products = data;
  },
  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  CHANGE_PRODUCT_STATUS(state, { productId, status }) {
    const index = state.products.findIndex((p) => p.id === productId);
    state.products[index].status = status;
  },
  DELETE_PRODUCTS(state, productId) {
    const index = state.products.findIndex((p) => p.id === productId);
    state.products.splice(index, 1);
  },
};
const actions = {
  getProducts({ commit }, { id, pageNumber, pageSize }) {
    NProgress.start();
    return getProducts({ id, pageNumber, pageSize})
      .then((response) => {
        commit(
          "SET_TOTAL_PAGES",
          parseInt(JSON.parse(response.headers["x-pagination"]).TotalPages)
        );
        commit("SET_PRODUCTS", response.data);
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  },
  updateStatusProduct({ commit }, { companyId, productId, productStatus }) {
    NProgress.start();
    const statusMessage = productStatus == 0 ? "Disable" : "Enable";
    return updateStatusProduct({ companyId, productId, productStatus })
      .then(() => {
        NProgress.done();
        commit("CHANGE_PRODUCT_STATUS", { productId, status: productStatus });
        Vue.$toast.success(statusMessage + " product successfully");
      })
      .catch((error) => {
        NProgress.done();
        const resetStatus = productStatus === 1 ? 0 : 1;
        commit("CHANGE_PRODUCT_STATUS", { productId, status: resetStatus });
        Vue.$toast.error(error.response.data.errors[0].message);
      });
  },
  deleteProduct({ commit }, { companyId, productId }) {
    NProgress.start();
    return deleteProduct({ companyId, productId })
      .then(() => {
        NProgress.done();
        commit("DELETE_PRODUCTS", productId);
        Vue.$toast.success("The product was successfully deleted.");
      })
      .catch((error) => {
        NProgress.done();
        Vue.$toast.error(error.response.data.errors[0].message);
      });
  },
};
const getters = {
  selectAllProducts: (state) => state.products,
  selectTotalPage: (state) => state.totalPages,
  selectProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
};
export default { namespaced, state, mutations, actions, getters };
