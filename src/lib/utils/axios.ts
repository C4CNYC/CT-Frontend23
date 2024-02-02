import axiosImport from "axios";

// config

// ----------------------------------------------------------------------const

export const axios = axiosImport.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.response.use(
  (response) => response,
  async (error): Promise<void> => {
    await Promise.reject(error.response?.data ?? "Something went wrong");
  }
);

axios.interceptors.request.use(
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
