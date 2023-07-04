// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_MAIN = "/main";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  registerOrganization: path(ROOTS_AUTH, "/register-organization"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
  submitPassword: path(ROOTS_AUTH, "/submit-password"),
};

export const PATH_PAGE = {
  onBoarding: "/on-boarding",
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
  profile: "/profile",
  home: "/main",
  projects: "/student/projects",

  tribes: {
    root: "/student/tribes",
    tribe: (id: string) => path("/student/tribes/", `${id}`),
  },
  codePanel: {
    root: "/student/code-panel",
    workSpace: (id: string) => path("/student/code-panel/", `${id}`),
  },
  publicCodePanel: {
    root: "/student/public-code-panel",
    workSpace: (id: string) => path("/student/public-code-panel/", `${id}`),
  },
  courses: {
    root: "/student/courses",
    course: (id: string) => path("/student/courses/", `${id}`),
  },
  publicCourses: "/student/public-courses",
  friends: {
    root: "/student/friends",
    friend: (id: string) => path("/student/friends/", `${id}`),
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

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, "/home"),
  stream: path(ROOTS_DASHBOARD, "/stream"),
  permissionDenied: path(ROOTS_DASHBOARD, "/permission-denied"),
  courses: {
    root: path(ROOTS_DASHBOARD, "/courses"),
    setting: (id: string) => path(ROOTS_DASHBOARD, `/courses/${id}/setting`),
  },
  modules: {
    root: path(ROOTS_DASHBOARD, "/modules/list"),
    setting: (id: string) => path(ROOTS_DASHBOARD, `/modules/${id}/setting`),
  },
  lessons: {
    root: path(ROOTS_DASHBOARD, "/lessons/list"),
  },
  tasks: {
    root: path(ROOTS_DASHBOARD, "/tasks/list"),
  },
  apps: {
    root: path(ROOTS_DASHBOARD, "/apps"),
  },
  skills: {
    root: path(ROOTS_DASHBOARD, "/skills"),
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
  school: {
    root: path(ROOTS_DASHBOARD, "/school"),
    general: path(ROOTS_DASHBOARD, "/school/general"),
    assignments: path(ROOTS_DASHBOARD, "/school/assignments"),
    filter: path(ROOTS_DASHBOARD, "/school/filter"),
    modules: path(ROOTS_DASHBOARD, "/school/modules/courses"),
    students: path(ROOTS_DASHBOARD, "/school/students/list"),
    classes: path(ROOTS_DASHBOARD, "/school/classes/list"),
    classes_new: path(ROOTS_DASHBOARD, "/school/classes/new"),
    progress: path(ROOTS_DASHBOARD, "/school/progress"),
    new: path(ROOTS_DASHBOARD, "/school/students/new"),
    setting: (id: string) =>
      path(ROOTS_DASHBOARD, `/school/classes/${id}/setting`),
    controller: (id: string) =>
      path(ROOTS_DASHBOARD, `/school/classes/${id}/controller`),
    edit: (name: string) =>
      path(ROOTS_DASHBOARD, `/school/students/${name}/edit`),
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
