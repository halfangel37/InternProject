import {
  getProducts,
  updateStatusProduct,
  deleteProduct,
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
  importFileProduct,
  exportFileProduct
} from "@/http/products.js";
import Vue from "vue";
import NProgress from "nprogress";
const namespaced = true;
const state = {
  product: undefined,
  products: [],
  pagination: {
    pageNumber: 1,
    totalPages: 0,
    pageSize: 10,
  },
};
const mutations = {
  SET_PAGINATION(state, pagination) {
    state.pagination = {
      ...state.pagination,
      ...pagination,
    };
  },
  SET_PRODUCTS(state, data) {
    state.products = data;
  },
  SET_IMPORT_PRODUCTS(state, fileProducts) {
    state.products = [...state.products, ...fileProducts]
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
  getProducts({ commit, getters }, { id }) {
    NProgress.start();
    const { pageNumber, pageSize } = getters.selectProductsPaging;
    return getProducts({ id, pageNumber, pageSize })
      .then((response) => {
        const totalPages = parseInt(
          JSON.parse(response.headers["x-pagination"]).TotalPages
        );
        commit("SET_PAGINATION", { totalPages });
        commit("SET_PRODUCTS", response.data);
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  },

  setPagination({ commit }, { pageSize, pageNumber }) {
    commit("SET_PAGINATION", { pageNumber, pageSize });
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
  importFileProduct({dispatch}, { companyId, fileProducts }) {
    NProgress.start();
    return importFileProduct({ companyId, fileProducts })
      .then(() => {
        Vue.$toast.success("Import file products successfully!");
        NProgress.done();
        dispatch("getProducts", {
          id: companyId,
        });
      })
      .catch((err) => {
        Vue.$toast.error(err.response.data.errors);
        NProgress.done();
      })
  },
  exportFileProduct(commit, {companyId}) {
    return exportFileProduct(companyId)
    .then(() => {
      Vue.$toast.open({
        message: "Products file has been sent to your email!",
        type: "success",
        duration: 8000,
        dismissible: true,
        position: "top-right",
      });
    })
    .catch((err) => {
      Vue.$toast.error(err.response.data.errors);
    })
  }
};
const getters = {
  selectAllProducts: (state) => state.products,
  selectTotalPages: (state) => state.pagination.totalPages,
  selectSeletedProduct: (state) => state.product,
  selectProductsPaging: (state) => state.pagination,
};
export default { namespaced, state, mutations, actions, getters };
