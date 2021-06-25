import axios from "axios";

export const HTTP = axios.create({
  baseURL: `http://intern-2021.southeastasia.cloudapp.azure.com:4000/api/v1`,
  headers: {
    Authorization: "Bearer {token}",
  },
});
