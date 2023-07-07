import { Iconify, Label } from "@components";
import { PATH_DASHBOARD, PATH_MAIN, PATH_PAGE } from "@routes/paths";
import FeedbackDialog from "@sections/feedback/FeedbackDialog";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { AiOutlineSolution } from "react-icons/ai";
import {
  BsFillFileEarmarkMedicalFill,
  BsFlagFill,
  BsSpeedometer2,
} from "react-icons/bs";
import {
  FaSchool,
  FaTasks,
  FaUserFriends,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { GoFileSubmodule } from "react-icons/go";
import { GrOrganization } from "react-icons/gr";
import { IoMdSchool } from "react-icons/io";
import { MdPlayLesson } from "react-icons/md";
import { RiFeedbackFill, RiOrganizationChart } from "react-icons/ri";
import { Tb3DCubeSphere, TbPhoto } from "react-icons/tb";

export const admin = {
  subheader: "administration",
  items: [
    // organizations
    {
      title: "organization",
      path: PATH_DASHBOARD.organization.general,
      icon: <GrOrganization />,
    },
    {
      title: "Members",
      path: PATH_DASHBOARD.organization.members,
      icon: <FaUserShield />,
    },
    {
      title: "Schools",
      path: PATH_DASHBOARD.organization.schools,
      icon: <RiOrganizationChart />,
    },
  ],
};

export const managment = {
  subheader: "managment",
  items: [
    // organizations
    {
      title: "school",
      path: PATH_DASHBOARD.school.general,
      icon: <FaSchool />,
    },
    {
      title: "students",
      path: PATH_DASHBOARD.school.students,
      icon: <FaUsers />,
    },
    {
      title: "classes",
      path: PATH_DASHBOARD.school.classes,
      icon: <IoMdSchool />,
    },
    {
      title: "assignments",
      path: PATH_DASHBOARD.school.assignments,
      icon: <AiOutlineSolution />,
    },
    {
      title: "progress",
      path: PATH_DASHBOARD.school.progress,
      icon: <GiProgression />,
    },
  ],
};

export const content = {
  subheader: "content",
  items: [
    {
      title: "courses",
      path: PATH_DASHBOARD.coursesMain.root,
      icon: <MdPlayLesson />,
    },
    {
      title: "modules",
      path: PATH_DASHBOARD.modules.root,
      icon: <GoFileSubmodule />,
    },
    {
      title: "lessons",
      path: PATH_DASHBOARD.lessons.root,
      icon: <MdPlayLesson />,
    },
    {
      title: "tasks",
      path: " ",
      icon: <FaTasks />,
      info: <Label color="success">Coming soon</Label>,
    },
    {
      title: "integrations",
      path: PATH_DASHBOARD.apps.root,
      icon: <FiSettings />,
    },
    {
      title: "skills",
      path: PATH_DASHBOARD.skills.root,
      icon: <Iconify icon="ion:bulb" />,
    },
  ],
};

export const general = {
  subheader: "GENERAL",
  items: [
    {
      title: "Catalog",
      path: PATH_DASHBOARD.courses.root,
      icon: <BsFillFileEarmarkMedicalFill size={20} />,
    },
  ],
};
export const home = {
  subheader: "",
  items: [
    {
      title: "Home",
      path: PATH_DASHBOARD.home,
      icon: <BsSpeedometer2 size={20} />,
    },
  ],
};
export const social = {
  subheader: "SOCIAL",
  items: [
    {
      title: "Tribes",
      path: PATH_DASHBOARD.tribes.root,
      icon: <Tb3DCubeSphere size={20} />,
    },
    {
      title: "Friends",
      path: PATH_DASHBOARD.friends.root,
      icon: <FaUserFriends size={20} />,
    },
    {
      title: "Gallery",
      path: PATH_DASHBOARD.gallery.root,
      icon: <TbPhoto size={20} />,
    },
  ],
};
export const apps = {
  subheader: "APPS",
  items: [
    {
      title: "Goals",
      path: PATH_DASHBOARD.goals,
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
      component: (children: React.ReactElement) => (
        <InviteFriendsModal>{children}</InviteFriendsModal>
      ),
    },
    {
      title: "Feedback",
      path: "#",
      icon: <RiFeedbackFill size={20} />,
      component: (children: React.ReactElement) => (
        <FeedbackDialog>{children}</FeedbackDialog>
      ),
    },
  ],
};

const navConfig = [admin, managment, general, social, apps, socials, home];
export default navConfig;
