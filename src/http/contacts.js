import { httpClient } from "@/http/httpClient";
import { CONTACTS, COMPANY } from "@/http/endpoints";

const getContacts = ({ id, pageNumber, pageSize }) => {
  return httpClient.get(`${COMPANY}/${id}${CONTACTS}`, {
    params: { pageSize, pageNumber },
  });
};

const updateContactStatus = ({
  companyId,
  contactId,
  contactStatus,
  contactTypeChange,
}) => {
  const contactTypePath =
    contactTypeChange === 0 ? "/customerStatus" : "/supplierStatus";
  return httpClient.patch(`${COMPANY}/${companyId}${CONTACTS}/${contactId}`, [
    {
      value: contactStatus,
      path: `${contactTypePath}`,
      op: "replace",
    },
  ]);
};

const deleteContact = ({ companyId, contactId }) => {
  return httpClient.delete(`${COMPANY}/${companyId}${CONTACTS}/${contactId}`);
};

const getContactById = ({ companyId, contactId }) => {
  return httpClient.get(`${COMPANY}/${companyId}${CONTACTS}/${contactId}`);
};

const createContact = ({ companyId, contact }) =>
  httpClient.post(`${COMPANY}/${companyId}${CONTACTS}`, contact);

export {
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactById,
  createContact,
};
