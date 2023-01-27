import axios from "axios";
// config
import { HOST_API_KEY } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers["x-tenant-id"] = localStorage.getItem("tenantName") || "";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
