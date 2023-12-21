import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import MenuHugDialog from "./MenuHugDialog";

import { PATH_AUTH } from "@routes/paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { UserType } from "@utils";

interface IMenuConfigItem {
  title: string;
  subTitle?: string;
  icon: string;
  href: string | ILinks;
  component?: (
    children: React.ReactElement,
    key: string | number
  ) => React.ReactElement;
  target?: "_self" | "_blank";
}
export enum ILinks {
  logout = "logaut",
  modal = "modal",
}

export const authorizedUserConfig: IMenuConfigItem[] = [
  {
    title: "Home",
    subTitle: "",
    icon: "ant-design:home-outlined",
    href: STUDENT_PATH_DASHBOARD.class.root,
  },
  {
    title: "Take the Tour",
    subTitle: "",
    icon: "ph:bus-light",
    href: ILinks.modal,
    component: (children, key) => <div key={key}>{children}</div>,
  },
  {
    title: "How-to Video",
    subTitle: "",
    icon: "ph:video",
    href: "https://www.youtube.com/@freecodecamp",
    target: "_blank",
  },
  {
    title: "Gallery",
    subTitle: "",
    icon: "solar:gallery-line-duotone",
    href: STUDENT_PATH_DASHBOARD.gallery.root,
  },
  {
    title: "Need a hug",
    icon: "icon-park-outline:like",
    href: ILinks.modal,
    component: (children, key) => (
      <div key={key}>
        <MenuHugDialog>{children}</MenuHugDialog>
      </div>
    ),
  },
  {
    title: "Invite Friends",
    icon: "ph:mask-happy",
    href: ILinks.modal,
    component: (children, key) => (
      <div key={key}>
        <InviteFriendsModal>{children}</InviteFriendsModal>
      </div>
    ),
  },
];

export const anonimUserConfig: IMenuConfigItem[] = [
  {
    title: "I'm brand new",
    subTitle: "Register",
    icon: "icon-park-outline:baby",
    href: PATH_AUTH.onBoardingTeacher,
  },
  {
    title: "I've been here before",
    subTitle: "Login",
    icon: "mdi:human-hello",
    href: PATH_AUTH.signIn,
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
