import { httpClient } from "../../http/httpClient";
import Vue from "vue";
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    createProduct(_, { product, companyId }) {
      return httpClient
        .post(`/companies/${companyId}/products`, product)
        .then(() => {
          Vue.$toast.success("Product have been created.");
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data.errors);
        });
    },
  },
};
