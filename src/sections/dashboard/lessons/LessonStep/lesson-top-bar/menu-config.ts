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
    title: "overview",
    subTitle: "home",
    icon: "fluent:top-speed-24-regular",
    href: STUDENT_PATH_DASHBOARD.courses.root,
  },
  {
    title: "me_me_me",
    subTitle: "profile",
    icon: "tabler:run",
    href: STUDENT_PATH_PAGE.profile,
  },

  {
    title: "get_out",
    subTitle: "log_out",
    icon: "mdi:logout",
    href: "",
  },
  {
    title: "close_editor",
    icon: "ic:round-close",
    href: "close",
  },
];
