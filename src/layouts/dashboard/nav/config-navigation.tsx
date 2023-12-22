import { AiOutlineSolution } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import {
  FaRegStickyNote,
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
import { RiOrganizationChart } from "react-icons/ri";
import { Tb3DCubeSphere, TbPhoto } from "react-icons/tb";

import { Iconify, Label } from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import FeedbackDialog from "@sections/feedback/FeedbackDialog";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import MenuTribesList from "@sections/main/menu-list/MenuTribesList";
import { Role } from "src/redux/services/enums/role.enum";

export const admin = {
  subheader: "sidebar_menu_administration",
  items: [
    {
      title: "sidebar_menu_members",
      path: MANAGER_PATH_DASHBOARD.organization.members,
      icon: <FaUserShield />,
    },
    {
      title: "sidebar_menu_schools",
      path: MANAGER_PATH_DASHBOARD.organization.schools,
      icon: <RiOrganizationChart />,
    },
  ],
};

export const managment = {
  subheader: "sidebar_menu_management",
  items: [
    {
      title: "sidebar_menu_school",
      path: MANAGER_PATH_DASHBOARD.school.general,
      icon: <FaSchool />,
    },
    {
      title: "sidebar_menu_students",
      path: MANAGER_PATH_DASHBOARD.school.students,
      icon: <FaUsers />,
    },
    {
      title: "sidebar_menu_classes",
      path: MANAGER_PATH_DASHBOARD.school.classes,
      icon: <IoMdSchool />,
    },
    {
      title: "sidebar_menu_assignments",
      path: MANAGER_PATH_DASHBOARD.school.assignments,
      icon: <AiOutlineSolution />,
    },
    {
      title: "sidebar_menu_progress",
      path: MANAGER_PATH_DASHBOARD.school.progress,
      icon: <GiProgression />,
    },
  ],
};

export const content = {
  subheader: "sidebar_menu_content",
  items: [
    {
      title: "sidebar_menu_courses",
      path: MANAGER_PATH_DASHBOARD.courses.root,
      icon: <MdPlayLesson />,
    },
    {
      title: "sidebar_menu_modules",
      path: MANAGER_PATH_DASHBOARD.modules.root,
      icon: <GoFileSubmodule />,
    },
    {
      title: "sidebar_menu_lessons",
      path: MANAGER_PATH_DASHBOARD.lessons.root,
      icon: <MdPlayLesson />,
    },
    {
      title: "sidebar_menu_tasks",
      path: " ",
      icon: <FaTasks />,
      info: <Label color="success">Coming soon</Label>,
    },
    {
      title: "sidebar_menu_integrations",
      path: MANAGER_PATH_DASHBOARD.apps.root,
      icon: <FiSettings />,
    },
    {
      title: "sidebar_menu_skills",
      path: MANAGER_PATH_DASHBOARD.skills.root,
      icon: <Iconify icon="ion:bulb" />,
    },
  ],
};

export const courses = {
  subheader: "",
  items: [
    {
      title: "sidebar_menu_catalog",
      path: STUDENT_PATH_DASHBOARD.courses.root,
      icon: <BsFileEarmarkTextFill size={20} />,
    },
  ],
};

export const general = {
  subheader: "sidebar_menu_tribes",
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
  subheader: "sidebar_menu_socials",
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
      title: "sidebar_menu_gallery",
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
  subheader: "sidebar_menu_apps",
  items: [
    {
      title: "sidebar_menu_my_notes",
      path: STUDENT_PATH_DASHBOARD.myNotes,
      icon: <FaRegStickyNote size={20} />,
    },
    {
      title: "sidebar_menu_feedback",
      path: "#",
      icon: <BiConversation size={20} />,
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
