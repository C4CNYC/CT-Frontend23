// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const MANAGER_ROOTS_DASHBOARD = "/manager";
const MANAGER_ROOTS_MAIN = "/main";

// ----------------------------------------------------------------------

export const MANAGER_PATH_PAGE = {
  onBoarding: "/on-boarding",
  components: "/components",
  profile: "/manager/profile",
  studentProfile: "/profile",
  home: "/manager",
};

export const MANAGER_PATH_MAIN = {
  root: MANAGER_ROOTS_MAIN,
  index: "/",
  permissionDenied: path(MANAGER_ROOTS_MAIN, "/permission-denied"),
};

export const MANAGER_PATH_DASHBOARD = {
  root: MANAGER_ROOTS_DASHBOARD,
  home: path(MANAGER_ROOTS_DASHBOARD, "/home"),
  info: path(MANAGER_ROOTS_DASHBOARD, "/info"),
  main: path(MANAGER_ROOTS_DASHBOARD, "/main"),
  stream: path(MANAGER_ROOTS_DASHBOARD, "/stream"),
  permissionDenied: path(MANAGER_ROOTS_DASHBOARD, "/permission-denied"),
  courses: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/courses-main"),
    setting: (id: string) =>
      path(MANAGER_ROOTS_DASHBOARD, `/courses-main/${id}/setting`),
  },
  modules: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/modules/list"),
    setting: (id: string) =>
      path(MANAGER_ROOTS_DASHBOARD, `/modules/${id}/setting`),
  },
  lessons: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/lessons/list"),
  },
  tasks: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/tasks/list"),
  },
  apps: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/apps"),
  },
  skills: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/skills"),
  },
  organization: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/organization"),
    general: path(MANAGER_ROOTS_DASHBOARD, "/organization/general"),
    account: path(MANAGER_ROOTS_DASHBOARD, "/organization/account"),
    members: path(MANAGER_ROOTS_DASHBOARD, "/organization/members/list"),
    new: path(MANAGER_ROOTS_DASHBOARD, "/organization/members/new"),
    edit: (name: string) =>
      path(MANAGER_ROOTS_DASHBOARD, `/organization/members/${name}/edit`),
    schools: path(MANAGER_ROOTS_DASHBOARD, "/organization/schools"),
    contacts: path(MANAGER_ROOTS_DASHBOARD, "/organization/contacts"),
    billing: path(MANAGER_ROOTS_DASHBOARD, "/organization/billing"),
  },
  school: {
    root: path(MANAGER_ROOTS_DASHBOARD, "/school"),
    general: path(MANAGER_ROOTS_DASHBOARD, "/school/general"),
    assignments: path(MANAGER_ROOTS_DASHBOARD, "/school/assignments"),
    filter: path(MANAGER_ROOTS_DASHBOARD, "/school/filter"),
    modules: path(MANAGER_ROOTS_DASHBOARD, "/school/modules/courses"),
    students: path(MANAGER_ROOTS_DASHBOARD, "/school/students/list"),
    classes: path(MANAGER_ROOTS_DASHBOARD, "/school/classes/list"),
    classes_new: path(MANAGER_ROOTS_DASHBOARD, "/school/classes/new"),
    progress: path(MANAGER_ROOTS_DASHBOARD, "/school/progress"),
    new: path(MANAGER_ROOTS_DASHBOARD, "/school/students/new"),
    setting: (id: string) =>
      path(MANAGER_ROOTS_DASHBOARD, `/school/classes/${id}/setting`),
    controller: (id: string) =>
      path(MANAGER_ROOTS_DASHBOARD, `/school/classes/${id}/controller`),
    edit: (name: string) =>
      path(MANAGER_ROOTS_DASHBOARD, `/school/students/${name}/edit`),
  },
};
