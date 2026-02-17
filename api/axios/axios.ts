import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const adminUrl = `http://localhost:3000`;
export const baseURL = adminUrl;
const cookie = new Cookies();
const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const token = cookie.get("token");
    console.log(token, "token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;