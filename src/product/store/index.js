import {
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
} from "@/http/products.js";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    product: {},
  },
  mutations: {
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    UPDATE_PRODUCT_IMAGE(state, data) {
      state.product.imageName = data.imageName;
    },
  },
  actions: {
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
  },
  getters: {
    selectSeletedProduct: (state) => state.product,
  },
};
