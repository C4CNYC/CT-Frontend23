import { PATH_DASHBOARD } from "@routes/paths";
import { AiOutlineSolution } from "react-icons/ai";
import { FaSchool, FaTasks, FaUsers, FaUserShield } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { GoFileSubmodule } from "react-icons/go";
import { GrOrganization } from "react-icons/gr";
import { IoMdSchool } from "react-icons/io";
import { MdPlayLesson } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";

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
      path: PATH_DASHBOARD.courses.root,
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
      path: PATH_DASHBOARD.tasks.root,
      icon: <FaTasks />,
    },
    {
      title: "apps",
      path: PATH_DASHBOARD.apps.root,
      icon: <FiSettings />,
    },
  ],
};

const navConfig = [admin, managment];
export default navConfig;
