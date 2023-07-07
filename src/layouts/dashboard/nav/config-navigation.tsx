import { Iconify, Label } from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import FeedbackDialog from "@sections/feedback/FeedbackDialog";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import MenuTribesList from "@sections/main/menu-list/MenuTribesList";
import { AiOutlineSolution } from "react-icons/ai";
import {
  BsFillFileEarmarkMedicalFill,
  BsFlagFill,
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
      path: MANAGER_PATH_DASHBOARD.organization.general,
      icon: <GrOrganization />,
    },
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
    // organizations
    {
      path: "",
      title: "",
      icon: <FaUserFriends size={20} />,
      component: () => (
        <MenuTribesList />
      ),
    },
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
      path: MANAGER_PATH_DASHBOARD.coursesMain.root,
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

export const general = {
  subheader: "GENERAL",
  items: [
    {
      title: "Catalog",
      path: STUDENT_PATH_DASHBOARD.courses.root,
      icon: <BsFillFileEarmarkMedicalFill size={20} />,
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
  ],
};
export const apps = {
  subheader: "APPS",
  items: [
    {
      title: "Goals",
      path: STUDENT_PATH_DASHBOARD.goals,
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

const navConfig = [admin, managment, general, social, apps, socials];
export default navConfig;
