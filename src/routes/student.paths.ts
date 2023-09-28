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
  page404: "/student/404",
  class: {
    root: "/student/class",
    createClass: "/student/class/create",
    join: "/student/class/join",
    editStudent: (studentId: string) =>
      path("/student/class/edit-student/", `${studentId}`),

    addQuest: (id: string, query?: Record<string, string>) =>
      path("/student/class/add-quest/", `${id}`) +
      (query ? `?${new URLSearchParams(query)}` : ""),

    id: (id: string, query?: Record<string, string>) =>
      path("/student/class/", `${id}`) +
      (query ? `?${new URLSearchParams(query)}` : ""),

    invite: (code: string) => path("/student/class/", `${code}`),
  },
  quest: {
    id: (id: string, query?: Record<string, string>) =>
      path("/student/quest/", `${id}`) +
      `?${query ? new URLSearchParams(query) : ""}`,
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
    workSpace: (id: string, query?: Record<string, string>) =>
      path("/student/public-code-panel/", `${id}`) +
      `?${query ? new URLSearchParams(query) : ""}`,
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
  myNotes: "/student/my-notes",
  gallery: {
    root: "/student/gallery",
    publicProject: "/student/gallery/public-projects",
    privateProject: "/student/gallery/private-projects",
  },
  joinTribe: {
    root: "/student/join-tribe",
    id: (id: string) => path("/student/join-tribe/", `${id}`),
  },
};
