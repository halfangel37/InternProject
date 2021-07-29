import { httpClient } from "@/http/httpClient";
import { COMPANY_ENDPOINT } from "@/http/endpoints";
import { DELETE_COMPANY_ENDPOINT } from "@/http/endpoints";
const create = (companyInfor) =>
  httpClient.post(COMPANY_ENDPOINT, companyInfor);
export { create };
const getCompanies = (pageNumber, pageSize) => {
  return httpClient.get(`${COMPANY_ENDPOINT}`, {
    params: {
      pageNumber,
      pageSize
    },
  });
};
const getCompanyById = (companyId) => {
  return httpClient.get(`${COMPANY_ENDPOINT}/${companyId}`);
};
const deleteCompanies = (companyId) => {
  return httpClient.delete(`${DELETE_COMPANY_ENDPOINT}/${companyId}`);
}

const getCompanyId = (companyId) => {
  return httpClient.get(`${COMPANY_ENDPOINT}/${companyId}`);
};

const updateCompany = ({ companyId,company }) => {
  return httpClient.put(`${COMPANY_ENDPOINT}/${companyId}`,company);
  
};
export { getCompanies, getCompanyById, deleteCompanies, updateCompany ,getCompanyId };