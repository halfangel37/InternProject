import {
  getProducts,
  updateStatusProduct,
  deleteProduct,
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
} from "@/http/products.js";
import Vue from "vue";
import NProgress from "nprogress";
const namespaced = true;
const state = {
  product: undefined,
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
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  UPDATE_PRODUCT_IMAGE(state, data) {
    state.product.imageName = data.imageName;
  },
  CLEAR_STATES(state) {
    state.product = undefined;
    state.products = [];
    state.totalPages = 0;
  },
};
const actions = {
  getProducts({ commit }, { id, pageNumber, pageSize }) {
    NProgress.start();
    return getProducts({ id, pageNumber, pageSize })
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
    const statusMessage = productStatus == 1 ? "Disable" : "Enable";
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
  createProduct(_, { companyId, product, file }) {
    return createProduct({ companyId, product, file })
      .then(() => {
        Vue.$toast.success("Product have been created.");
      })
      .catch((error) => {
        error.response.data.errors.File[0]
          ? Vue.$toast.success("Product have been created.") &&
            Vue.$toast.error(error.response.data.errors.File[0])
          : Vue.$toast.error(error.response.data.errors);
      });
  },
  updateProductImage({ commit }, { companyId, productId, file }) {
    return uploadProductImage({ companyId, productId, file })
      .then((response) => {
        commit("UPDATE_PRODUCT_IMAGE", response.data);
        Vue.$toast.success("Product Image have been saved.");
      })
      .catch((error) => {
        Vue.$toast.error(error.response.data.errors.File[0]);
      });
  },
  getProductById({ commit }, { companyId, productId }) {
    return getProductById({ companyId, productId }).then((response) => {
      commit("SET_PRODUCT", response.data);
    });
  },
  updateProduct({ commit }, { companyId, productId, product }) {
    return updateProduct({ companyId, productId, product })
      .then((response) => {
        commit("SET_PRODUCT", response.data);
        Vue.$toast.success("Product info have been saved.");
      })
      .catch((error) => {
        Vue.$toast.error(error.response.data.errors);
      });
  },
  clearStates({ commit }) {
    commit("CLEAR_STATES");
  },
};
const getters = {
  selectAllProducts: (state) => state.products,
  selectTotalPage: (state) => state.totalPages,
  selectSeletedProduct: (state) => state.product,
};
export default { namespaced, state, mutations, actions, getters };
