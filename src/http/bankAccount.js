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

const getBankAccountById = ({ companyId, bankAccountId }) => {
  return httpClient.get(
    `${COMPANY}/${companyId}${BANK_ACCOUNTS}/${bankAccountId}`
  );
};

const createBankAccount = ({ companyId, bankAccount }) => {
  return httpClient.post(
    `${COMPANY}/${companyId}${BANK_ACCOUNTS}`,
    bankAccount
  );
};

const updateBankAccount = ({ companyId, bankAccount, bankAccountId }) => {
  return httpClient.put(
    `${COMPANY}/${companyId}${BANK_ACCOUNTS}/${bankAccountId}`,
    bankAccount
  );
};

export {
  getBankAccounts,
  updateStatusBankAccount,
  deleteBankAccount,
  createBankAccount,
  getBankAccountById,
  updateBankAccount,
};
