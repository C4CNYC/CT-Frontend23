// routes
// utils
import { axios } from "@utils";

import { PATH_AUTH } from "../routes/paths";

// ----------------------------------------------------------------------

function jwtDecode(token: string): Record<string, string> {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return Number(decoded.exp) > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number): void => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert("Token expired");

    localStorage.removeItem("accessToken");

    window.location.href = PATH_AUTH.singIn;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (
  accessToken: string | null,
  tenantName: string | null
): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.common["x-tenant-id"] = tenantName;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(Number(exp));
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tenantName");

    delete axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common["x-tenant-id"];
  }
};
