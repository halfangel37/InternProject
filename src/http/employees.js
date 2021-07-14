import { httpClient } from "@/http/httpClient";
import { COMPANY, EMPLOYEE } from "@/http/endpoints";

const create = (employee, companyId) =>
  httpClient.post(`${COMPANY}/${companyId}${EMPLOYEE}`, employee);

const getEmployees = (companyId, pageNumber, pageSize) => 
  httpClient.get(`${COMPANY}/${companyId}${EMPLOYEE}`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize
    }
  })

const patchUpdateEmployee = (companyId, employeeId, payload) => 
  httpClient.patch(`${COMPANY}/${companyId}${EMPLOYEE}/${employeeId}`, payload);

export { create, getEmployees, patchUpdateEmployee }