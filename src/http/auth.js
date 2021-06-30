import { httpClient } from "@/http/httpClient";
import { REGISTER_ENDPOINT, AUTHENTICATE_ENDPOINT } from "@/http/endpoints";

const signin = ({ username, password }) =>
  httpClient.post(AUTHENTICATE_ENDPOINT, { username, password });

const register = (userInfor) => httpClient.post(REGISTER_ENDPOINT, userInfor);
export { signin, register };
