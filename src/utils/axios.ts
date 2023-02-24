import axios from "axios";
// config
import { HOST_API_KEY } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error): Promise<void> => {
    await Promise.reject(error.response?.data ?? "Something went wrong");
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers["x-tenant-id"] = localStorage.getItem("tenantName") ?? "";
    }
    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  }
);

export default axiosInstance;
