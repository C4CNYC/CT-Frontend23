import { PATH_AUTH } from "@routes/paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { UserType } from "@utils";

import MenuHugDialog from "./MenuHugDialog";

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
    title: "home",
    subTitle: "",
    icon: "ant-design:home-outlined",
    href: STUDENT_PATH_DASHBOARD.class.root,
  },
  {
    title: "take_tour",
    subTitle: "",
    icon: "ph:bus-light",
    href: ILinks.modal,
    component: (children, key) => <div key={key}>{children}</div>,
  },
  {
    title: "how_to_video",
    subTitle: "",
    icon: "ph:video",
    href: "https://www.youtube.com/@freecodecamp",
    target: "_blank",
  },
  {
    title: "gallery",
    subTitle: "",
    icon: "solar:gallery-line-duotone",
    href: STUDENT_PATH_DASHBOARD.gallery.root,
  },
  {
    title: "need_hug",
    icon: "icon-park-outline:like",
    href: ILinks.modal,
    component: (children, key) => (
      <div key={key}>
        <MenuHugDialog>{children}</MenuHugDialog>
      </div>
    ),
  },
  {
    title: "sidebar_menu_invite_friends",
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
    title: "i_brand_new",
    subTitle: "register",
    icon: "icon-park-outline:baby",
    href: PATH_AUTH.onBoardingTeacher,
  },
  {
    title: "login_been_here",
    subTitle: "login",
    icon: "mdi:human-hello",
    href: PATH_AUTH.signIn,
  },
  {
    title: "sidebar_menu_invite_friends",
    icon: "mdi:invite",
    href: "#",
  },
];

export default {
  [UserType.Authorized]: authorizedUserConfig,
  [UserType.Anonim]: anonimUserConfig,
};
