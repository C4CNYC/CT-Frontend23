// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_MAIN = "/main";

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
  submitPassword: path(ROOTS_AUTH, "/submit-password"),
};

export const PATH_PAGE = {
  home: "/main",
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
  projects: "/projects",

  tribes: {
    root: "/tribes",
    tribe: (id: string) => path("/tribes/", `${id}`),
  },
  codePanel: {
    root: "/code-panel",
    workSpace: (id: string) => path("/code-panel/", `${id}`),
  },
  publicCodePanel: {
    root: "/public-code-panel",
    workSpace: (id: string) => path("/public-code-panel/", `${id}`),
  },
  courses: {
    root: "/courses",
    course: (id: string) => path("/courses/", `${id}`),
  },
  publicCourses: "/public-courses",
  friends: {
    root: "/friends",
    friend: (id: string) => path("/friends/", `${id}`),
  },
};

export const PATH_MAIN = {
  root: ROOTS_MAIN,
  index: "/",
  permissionDenied: path(ROOTS_MAIN, "/permission-denied"),
  pinned: "/pinned",
  recources: "/recources",
  onlineBooks: "/online-books",
  settings: "/settings",
  tribes: {
    root: "/tribes",
    tribe: (id: string) => path("/tribes/", `${id}`),
  },
  goals: "/goals",
  gallery: {
    root: "/gallery",
    publicProject: "/gallery/public-projects",
    privateProject: "/gallery/private-projects",
  },
  galleryPublic: {
    root: "/gallery-public",
    project: (id: string) => path("/gallery-public/", `${id}`),
  },
  profile: "/profile",
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
