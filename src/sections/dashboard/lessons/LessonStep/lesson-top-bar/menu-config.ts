import { PATH_DASHBOARD, PATH_PAGE } from "@routes/paths";

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
    href: PATH_DASHBOARD.home,
  },
  {
    title: "Me, me, me",
    subTitle: "Profile",
    icon: "tabler:run",
    href: PATH_PAGE.profile,
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
