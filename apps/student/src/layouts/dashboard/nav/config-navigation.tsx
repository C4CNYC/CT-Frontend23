import { PATH_MAIN, PATH_PAGE } from "@routes/paths";
import {
  BsFillFileEarmarkMedicalFill,
  BsFlagFill,
  BsSpeedometer2,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import { Tb3DCubeSphere, TbPhoto } from "react-icons/tb";

export const general = {
  subheader: "GENERAL",
  items: [
    {
      title: "HOME",
      path: PATH_PAGE.home,
      icon: <BsSpeedometer2 size={20} />,
    },
    {
      title: "COURSES",
      path: PATH_PAGE.courses.root,
      icon: <BsFillFileEarmarkMedicalFill size={20} />,
    },
  ],
};
export const social = {
  subheader: "SOCIAL",
  items: [
    {
      title: "Tribes",
      path: PATH_MAIN.tribes.root,
      icon: <Tb3DCubeSphere size={20} />,
    },
    {
      title: "Friends",
      path: PATH_PAGE.friends.root,
      icon: <FaUserFriends size={20} />,
    },
    {
      title: "Gallery",
      path: PATH_MAIN.gallery.root,
      icon: <TbPhoto size={20} />,
    },
  ],
};
export const apps = {
  subheader: "APPS",
  items: [
    {
      title: "Goals",
      path: PATH_MAIN.goals,
      disabled: true,
      icon: <BsFlagFill size={20} />,
    },
  ],
};
export const socials = {
  subheader: "SOCIALS",
  items: [
    {
      title: "Invite Friends",
      path: "#",
      icon: <FaUserFriends size={20} />,
      modal: "invite",
    },
    {
      title: "Feedback",
      path: PATH_PAGE.page404,
      icon: <RiFeedbackFill size={20} />,
      modal: "feedback",
    },
  ],
};
const navConfig = [general, social, apps, socials];
export default navConfig;
