import axios from "axios";
import {
  responseInterceptor,
  authInterceptor,
  errorInterceptor,
} from "./interceptor";

export const httpClient = axios.create({
  baseURL: `http://intern-2021.southeastasia.cloudapp.azure.com:4000/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);
httpClient.interceptors.request.use(authInterceptor);