import { AiOutlineSolution } from "react-icons/ai";
import { BsFileEarmarkTextFill, BsFlagFill } from "react-icons/bs";
import {
  FaSchool,
  FaTasks,
  FaUserFriends,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdSchool } from "react-icons/io";
import { MdPlayLesson } from "react-icons/md";
import { RiFeedbackFill, RiOrganizationChart } from "react-icons/ri";
import { Tb3DCubeSphere, TbPhoto } from "react-icons/tb";

import { Iconify, Label } from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import FeedbackDialog from "@sections/feedback/FeedbackDialog";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import MenuTribesList from "@sections/main/menu-list/MenuTribesList";
import { Role } from "src/redux/services/enums/role.enum";

export const admin = {
  subheader: "administration",
  items: [
    {
      title: "Members",
      path: MANAGER_PATH_DASHBOARD.organization.members,
      icon: <FaUserShield />,
    },
    {
      title: "Schools",
      path: MANAGER_PATH_DASHBOARD.organization.schools,
      icon: <RiOrganizationChart />,
    },
  ],
};

export const managment = {
  subheader: "managment",
  items: [
    {
      title: "school",
      path: MANAGER_PATH_DASHBOARD.school.general,
      icon: <FaSchool />,
    },
    {
      title: "students",
      path: MANAGER_PATH_DASHBOARD.school.students,
      icon: <FaUsers />,
    },
    {
      title: "classes",
      path: MANAGER_PATH_DASHBOARD.school.classes,
      icon: <IoMdSchool />,
    },
    {
      title: "assignments",
      path: MANAGER_PATH_DASHBOARD.school.assignments,
      icon: <AiOutlineSolution />,
    },
    {
      title: "progress",
      path: MANAGER_PATH_DASHBOARD.school.progress,
      icon: <GiProgression />,
    },
  ],
};

export const content = {
  subheader: "content",
  items: [
    {
      title: "courses",
      path: MANAGER_PATH_DASHBOARD.courses.root,
      icon: <MdPlayLesson />,
    },
    {
      title: "modules",
      path: MANAGER_PATH_DASHBOARD.modules.root,
      icon: <GoFileSubmodule />,
    },
    {
      title: "lessons",
      path: MANAGER_PATH_DASHBOARD.lessons.root,
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
      path: MANAGER_PATH_DASHBOARD.apps.root,
      icon: <FiSettings />,
    },
    {
      title: "skills",
      path: MANAGER_PATH_DASHBOARD.skills.root,
      icon: <Iconify icon="ion:bulb" />,
    },
  ],
};

export const courses = {
  subheader: "",
  items: [
    {
      title: "Catalog",
      path: STUDENT_PATH_DASHBOARD.courses.root,
      icon: <BsFileEarmarkTextFill size={20} />,
    },
  ],
};

export const general = {
  subheader: "Tribes",
  items: [
    {
      path: "",
      title: "",
      icon: <FaUserFriends size={20} />,
      component: () => <MenuTribesList />,
    },
  ],
};

export const social = {
  subheader: "SOCIAL",
  items: [
    {
      title: "Tribes",
      path: STUDENT_PATH_DASHBOARD.tribes.root,
      icon: <Tb3DCubeSphere size={20} />,
    },
    {
      title: "Friends",
      path: STUDENT_PATH_DASHBOARD.friends.root,
      icon: <FaUserFriends size={20} />,
    },
    {
      title: "Gallery",
      path: STUDENT_PATH_DASHBOARD.gallery.root,
      icon: <TbPhoto size={20} />,
    },
    {
      title: "Invite Friends",
      path: "#",
      icon: <FaUserFriends size={20} />,
      component: (children: React.ReactElement) => (
        <InviteFriendsModal>{children}</InviteFriendsModal>
      ),
    },
  ],
};
export const apps = {
  subheader: "APPS",
  items: [
    {
      title: "My Notes",
      path: STUDENT_PATH_DASHBOARD.myNotes,
      icon: <BsFlagFill size={20} />,
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
export const socials = {
  subheader: "SOCIALS",
  items: [],
};

export const menuConfig = {
  [Role.Owner]: [admin, managment, content],
  [Role.Admin]: [admin, managment, content],
  [Role.Student]: [courses, general, apps],
  [Role.Manager]: [managment, content],
  [Role.Editor]: [content],
};
