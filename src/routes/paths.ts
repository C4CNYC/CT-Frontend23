function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_MAIN = "/main";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
  submitPassword: path(ROOTS_AUTH, "/submit-password"),
  onBoardingTeacher: path(ROOTS_AUTH, "/on-boarding/teacher"),
  onBoardingStudent: path(ROOTS_AUTH, "/on-boarding/student"),
  singIn: path(ROOTS_AUTH, "/singIn"),
};

export const PATH_PAGE = {
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
  profile: "/profile",
  studentProfile: "/student/profile",
  home: "/main",
};

export const PATH_MAIN = {
  root: ROOTS_MAIN,
  index: "/",
  permissionDenied: path(ROOTS_MAIN, "/permission-denied"),
  settings: "/dashboard/settings",
  galleryPublic: {
    root: "/gallery-public",
    project: (id: string) => path("/gallery-public/", `${id}`),
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: {
    root: path(ROOTS_DASHBOARD, "/home"),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/edit/${id}`),
  },
  info: path(ROOTS_DASHBOARD, "/info"),
  main: path(ROOTS_DASHBOARD, "/main"),
  stream: path(ROOTS_DASHBOARD, "/stream"),
  permissionDenied: path(ROOTS_DASHBOARD, "/permission-denied"),
  coursesMain: {
    root: path(ROOTS_DASHBOARD, "/courses-main"),
    setting: (id: string) =>
      path(ROOTS_DASHBOARD, `/courses-main/${id}/setting`),
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
  tribes: {
    root: "/dashboard/tribes",
    tribe: (id: string) => path("/dashboard/tribes/", `${id}`),
  },
  codePanel: {
    root: "/dashboard/code-panel",
    workSpace: (id: string) => path("/dashboard/code-panel/", `${id}`),
  },
  publicCodePanel: {
    root: "/dashboard/public-code-panel",
    workSpace: (id: string) => path("/dashboard/public-code-panel/", `${id}`),
  },
  courses: {
    root: "/dashboard/courses",
    course: (id: string) => path("/dashboard/courses/", `${id}`),
  },
  publicCourses: "/dashboard/public-courses",
  friends: {
    root: "/dashboard/friends",
    friend: (id: string) => path("/dashboard/friends/", `${id}`),
  },
  goals: "/dashboard/goals",
  gallery: {
    root: "/dashboard/gallery",
    publicProject: "/dashboard/gallery/public-projects",
    privateProject: "/dashboard/gallery/private-projects",
  },
};
