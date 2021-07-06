import { httpClient } from "@/http/httpClient";
import { COMPANY, EMPLOYEE } from "@/http/endpoints";

const create = (employee, companyId) =>
  httpClient.post(`${COMPANY}/${companyId}${EMPLOYEE}`, employee);

export { create };
