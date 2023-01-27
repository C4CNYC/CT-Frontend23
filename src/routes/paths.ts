// ----------------------------------------------------------------------

import Customization from "../pages/dashboard/organization/customization";

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  permissionDenied: path(ROOTS_DASHBOARD, "/permission-denied"),
  blank: path(ROOTS_DASHBOARD, "/blank"),
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    analytics: path(ROOTS_DASHBOARD, "/analytics"),
  },
  organization: {
    root: path(ROOTS_DASHBOARD, "/organization"),
    general: path(ROOTS_DASHBOARD, "/organization/general"),
    account: path(ROOTS_DASHBOARD, "/organization/account"),
    members: path(ROOTS_DASHBOARD, "/organization/members/list"),
    new: path(ROOTS_DASHBOARD, "/organization/members/new"),
    edit: (name: string) =>
      path(ROOTS_DASHBOARD, `/organization/members/${name}/edit`),
    schools: path(ROOTS_DASHBOARD, "/organization/schools"),
    contacts: path(ROOTS_DASHBOARD, "/organization/contacts"),
    billing: path(ROOTS_DASHBOARD, "/organization/billing"),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, "/invoice"),
    list: path(ROOTS_DASHBOARD, "/invoice/list"),
    new: path(ROOTS_DASHBOARD, "/invoice/new"),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(
      ROOTS_DASHBOARD,
      "/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit"
    ),
    demoView: path(
      ROOTS_DASHBOARD,
      "/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5"
    ),
  },
};

export const PATH_DOCS = {
  root: "https://docs.minimals.cc",
  changelog: "https://docs.minimals.cc/changelog",
};

export const PATH_ZONE_ON_STORE =
  "https://mui.com/store/items/zone-landing-page/";

export const PATH_MINIMAL_ON_STORE =
  "https://mui.com/store/items/minimal-dashboard/";

export const PATH_FREE_VERSION =
  "https://mui.com/store/items/minimal-dashboard-free/";

export const PATH_FIGMA_PREVIEW =
  "https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1";
