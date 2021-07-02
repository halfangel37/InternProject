import { httpClient } from "@/http/httpClient";
import {
  REGISTER_ENDPOINT,
  AUTHENTICATE_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
  CHANGE_PASSWORD_ENDPOINT,
} from "@/http/endpoints";

const signin = ({ username, password }) =>
  httpClient.post(AUTHENTICATE_ENDPOINT, { username, password });
const register = (userInfor) => httpClient.post(REGISTER_ENDPOINT, userInfor);
const forgotPassword = ({ email }) =>
  httpClient.post(FORGOT_PASSWORD_ENDPOINT, { email });
const resetPassword = ({ newPassword, key }) =>
  httpClient.post(RESET_PASSWORD_ENDPOINT, { newPassword, key });

const changeUserPassword = ({ oldPassword, newPassword }) =>
  httpClient.put(CHANGE_PASSWORD_ENDPOINT, { oldPassword, newPassword });
export { signin, register, changeUserPassword, forgotPassword, resetPassword };
