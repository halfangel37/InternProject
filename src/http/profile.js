import { httpClient } from "@/http/httpClient";
import { ACCOUNT } from "@/http/endpoints";

const getUserProfile = () => {
  return httpClient.get(`${ACCOUNT}`);
};
const updateUserProfile = (userProfile) => {
  return httpClient.put(`${ACCOUNT}`, userProfile);
};
const updateUserAvatar = (userAvatar) => {
  return httpClient.post(`${ACCOUNT}/avatar`, userAvatar);
};
export { getUserProfile, updateUserProfile, updateUserAvatar };
