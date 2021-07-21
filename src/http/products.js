import { httpClient } from "@/http/httpClient";
import { PRODUCTS, COMPANY } from "@/http/endpoints";

const getProducts = ({ id, pageNumber, pageSize }) => {
  return httpClient.get(`${COMPANY}/${id}${PRODUCTS}`, {
    params: { pageSize,pageNumber },
  });
};
const updateStatusProduct = ({ companyId, productId, productStatus }) => {
  return httpClient.patch(`${COMPANY}/${companyId}${PRODUCTS}/${productId}`, [
    {
      value: productStatus,
      path: "/status/",
      op: "replace",
    },
  ]);
};
const getProductById = ({ companyId, productId }) => {
  return httpClient.get(`${COMPANY}/${companyId}${PRODUCTS}/${productId}`);
};
const deleteProduct = ({ companyId, productId }) => {
  return httpClient.delete(`${COMPANY}/${companyId}${PRODUCTS}/${productId}`);
};
export { getProducts, updateStatusProduct, deleteProduct, getProductById };
