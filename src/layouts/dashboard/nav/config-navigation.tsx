import Iconify from "@components/iconify/Iconify";
import Label from "@components/label/Label";
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
      path: " ",
      icon: <AiOutlineSolution />,
      info: (
        <Label
          color="success"
          sx={{
            mr: "-4px",
          }}
        >
          Coming soon
        </Label>
      ),
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

const navConfig = [admin, managment];
export default navConfig;
