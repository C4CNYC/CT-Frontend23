import { PATH_AUTH } from "@routes/paths";
import {
  STUDENT_PATH_DASHBOARD,
  STUDENT_PATH_MAIN,
  STUDENT_PATH_PAGE,
} from "@routes/student.paths";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { UserType } from "@utils";

import MenuHugDialog from "./MenuHugDialog";

interface IMenuConfigItem {
  title: string;
  subTitle?: string;
  icon: string;
  href: string | ILinks;
  component?: (children: React.ReactElement) => React.ReactElement;
}
export enum ILinks {
  logout = "logaut",
  modal = "modal",
}

export const authorizedUserConfig: IMenuConfigItem[] = [
  {
    title: "What's poppin'?",
    subTitle: "Courses Page",
    icon: "uil:meeting-board",
    href: STUDENT_PATH_DASHBOARD.courses.root,
  },
  {
    title: "Overview",
    subTitle: "Home",
    icon: "fluent:top-speed-24-regular",
    href: STUDENT_PATH_MAIN.index,
  },
  {
    title: "Me, me, me",
    subTitle: "Profile",
    icon: "tabler:run",
    href: STUDENT_PATH_PAGE.profile,
  },
  {
    title: "Fun stuff",
    subTitle: "Gallery",
    icon: "maki:art-gallery",
    href: STUDENT_PATH_DASHBOARD.gallery.root,
  },
  {
    title: "Get me out of here",
    subTitle: "Log out",
    icon: "mdi:logout",
    href: ILinks.logout,
  },
  {
    title: "Need a hug",
    icon: "icon-park-outline:like",
    href: ILinks.modal,
    component: (children: React.ReactElement) => (
      <MenuHugDialog>{children}</MenuHugDialog>
    ),
  },
  {
    title: "Invite Friends",
    icon: "ph:mask-happy",
    href: ILinks.modal,
    component: (children: React.ReactElement) => (
      <InviteFriendsModal>{children}</InviteFriendsModal>
    ),
  },
];

export const anonimUserConfig: IMenuConfigItem[] = [
  {
    title: "I'm brand new",
    subTitle: "Register",
    icon: "icon-park-outline:baby",
    href: PATH_AUTH.register,
  },
  {
    title: "I've been here before",
    subTitle: "Login",
    icon: "mdi:human-hello",
    href: PATH_AUTH.login,
  },
  {
    title: "Invite Friends",
    icon: "mdi:invite",
    href: "#",
  },
];

export default {
  [UserType.Authorized]: authorizedUserConfig,
  [UserType.Anonim]: anonimUserConfig,
};
