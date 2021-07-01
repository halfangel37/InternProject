import { httpClient } from "@/http/httpClient";
import { COMPANY_ENDPOINT } from "@/http/endpoints";
const create = (companyInfor) =>
  httpClient.post(COMPANY_ENDPOINT, companyInfor);
export { create };
