// ----------------------------------------------------------------------
import { MANAGER_PATH_PAGE } from "@routes/manager.paths";
import { STUDENT_PATH_PAGE } from "@routes/student.paths";

export const HOST_API_KEY = process.env.NEXT_PUBLIC_API_URL ?? "";

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const STUDENT_PATH_AFTER_LOGIN = STUDENT_PATH_PAGE.home; // as '/dashboard/app'
export const MANAGER_PATH_AFTER_LOGIN = MANAGER_PATH_PAGE.home;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
