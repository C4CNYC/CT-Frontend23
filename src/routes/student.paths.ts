// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}
export const STUDENT_ROOTS_MAIN = "/main";

// ----------------------------------------------------------------------

export const STUDENT_PATH_PAGE = {
  onBoarding: "/on-boarding",
  components: "/components",
  profile: "/student/profile",
  studentProfile: "/profile",
  home: "/student/class",
};

export const STUDENT_PATH_MAIN = {
  root: STUDENT_ROOTS_MAIN,
  index: "/student",
  galleryPublic: {
    root: "/gallery-public",
    project: (id: string) => path("/gallery-public/", `${id}`),
  },
};

export const STUDENT_PATH_DASHBOARD = {
  root: STUDENT_ROOTS_MAIN,
  permissionDenied: "/student/permission-denied",
  class: {
    root: "/student/class",
    createClass: "/student/class/create",
    join: "/student/class/join",
    addQuest: (id: string) => path("/student/class/add-quest/", `${id}`),
    id: (id: string) => path("/student/class/", `${id}`),
  },
  quest: {
    id: (id: string) => path("/student/quest/", `${id}`),
  },
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
  goals: "/student/goals",
  gallery: {
    root: "/student/gallery",
    publicProject: "/student/gallery/public-projects",
    privateProject: "/student/gallery/private-projects",
  },
};
