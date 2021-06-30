import { STATUS } from "@/http/status-code";
import { REGISTER_ENDPOINT, AUTHENTICATE_ENDPOINT } from "@/http/endpoints";

const responseInterceptor = (response) => response;
const errorInterceptor = (error) => {
  if (error.status === STATUS.UNAUTHORIZED) {
    localStorage.removeItem("token");
    this.$store.dispatch("signout/signoutAccount");
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

const getAuthToken = () => localStorage.getItem("token");

const authInterceptor = (config) => {
  if (
    config.url !== AUTHENTICATE_ENDPOINT ||
    config.url !== REGISTER_ENDPOINT
  ) {
    config.headers.common["Authorization"] = `Bearer ${getAuthToken()}`;
  }
  return config;
};
export { authInterceptor, errorInterceptor, responseInterceptor };
