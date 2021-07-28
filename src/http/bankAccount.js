import { httpClient } from "@/http/httpClient";
import { COMPANY, BANK_ACCOUNTS } from "@/http/endpoints";

const getBankAccounts = ({ companyId, pageNumber, pageSize }) => {
  return httpClient.get(`${COMPANY}/${companyId}${BANK_ACCOUNTS}`, {
    params: { pageSize, pageNumber },
  });
};
const updateStatusBankAccount = ({
  companyId,
  bankAccountId,
  bankAccountStatus,
}) => {
  return httpClient.patch(
    `${COMPANY}/${companyId}${BANK_ACCOUNTS}/${bankAccountId}`,
    [
      {
        value: bankAccountStatus,
        path: "/status/",
        op: "replace",
      },
    ]
  );
};

const deleteBankAccount = ({ companyId, bankAccountId }) => {
  return httpClient.delete(
    `${COMPANY}/${companyId}${BANK_ACCOUNTS}/${bankAccountId}`
  );
};
export { getBankAccounts, updateStatusBankAccount, deleteBankAccount };
