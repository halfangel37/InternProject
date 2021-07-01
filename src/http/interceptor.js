import { STATUS } from "@/http/status-code";

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
  if (!config.url.includes("/auth")) {
    config.headers.common["Authorization"] = `Bearer ${getAuthToken()}`;
  }
  return config;
};
export { authInterceptor, errorInterceptor, responseInterceptor };
