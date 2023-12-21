import {
  STUDENT_PATH_DASHBOARD,
  STUDENT_PATH_PAGE,
} from "@routes/student.paths";

interface IMenuConfigItem {
  title: string;
  subTitle?: string;
  icon: string;
  href: string;
}

export const menuConfig: IMenuConfigItem[] = [
  {
    title: "Overview",
    subTitle: "Home",
    icon: "fluent:top-speed-24-regular",
    href: STUDENT_PATH_DASHBOARD.courses.root,
  },
  {
    title: "Me, me, me",
    subTitle: "Profile",
    icon: "tabler:run",
    href: STUDENT_PATH_PAGE.profile,
  },

  {
    title: "Get me out of here",
    subTitle: "Log out",
    icon: "mdi:logout",
    href: "",
  },
  {
    title: "Close editor",
    icon: "ic:round-close",
    href: "close",
  },
];
