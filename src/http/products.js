import { httpClient } from "@/http/httpClient";
import { PRODUCTS, IMAGE, COMPANY } from "@/http/endpoints";

const createProduct = ({ companyId, product, file }) => {
  return httpClient
    .post(`${COMPANY}/${companyId}${PRODUCTS}`, product)
    .then((product) => {
      if (file) {
        return uploadProductImage({
          companyId,
          productId: product.data.id,
          file,
        });
      }
      return product;
    });
};
const uploadProductImage = ({ companyId, productId, file }) => {
  const formData = new FormData();
  formData.append("File", file);
  return httpClient.post(
    `${COMPANY}/${companyId}${PRODUCTS}/${productId}${IMAGE}`,
    formData
  );
};
const updateProduct = ({ companyId, productId, product }) => {
  return httpClient.put(
    `${COMPANY}/${companyId}${PRODUCTS}/${productId}`,
    product
  );
};
const getProducts = ({ id, pageNumber, pageSize }) => {
  return httpClient.get(`${COMPANY}/${id}${PRODUCTS}`, {
    params: { pageSize, pageNumber },
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
export {
  getProducts,
  updateStatusProduct,
  deleteProduct,
  getProductById,
  createProduct,
  uploadProductImage,
  updateProduct,
};
