import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error): Promise<void> => {
    await Promise.reject(error.response?.data ?? "Something went wrong");
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers["x-tenant-id"] =
        localStorage.getItem("tenantName") ?? "codetribe";
    }
    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  }
);

export default axiosInstance;
