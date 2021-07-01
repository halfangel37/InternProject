import { httpClient } from "@/http/httpClient";
import {
  REGISTER_ENDPOINT,
  AUTHENTICATE_ENDPOINT,
  CHANGE_PASSWORD_ENDPOINT,
} from "@/http/endpoints";

const signin = ({ username, password }) =>
  httpClient.post(AUTHENTICATE_ENDPOINT, { username, password });

const register = (userInfor) => httpClient.post(REGISTER_ENDPOINT, userInfor);

const changeUserPassword = ({ oldPassword, newPassword }) =>
  httpClient.put(CHANGE_PASSWORD_ENDPOINT, { oldPassword, newPassword });
export { signin, register, changeUserPassword };
