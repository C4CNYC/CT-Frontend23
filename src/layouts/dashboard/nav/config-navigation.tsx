// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";
import { RiOrganizationChart } from "react-icons/ri";
import { GrOrganization } from "react-icons/gr";
import { FaUserShield } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { VscSymbolClass } from "react-icons/vsc";
import { GiProgression } from "react-icons/gi";
import { AiOutlineSolution } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  invoice: icon("ic_invoice"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

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
      icon: <VscSymbolClass />,
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
      title: "assignments",
      path: PATH_DASHBOARD.school.assignments,
      icon: <AiOutlineSolution />,
    },
  ],
};

const navConfig = [admin, managment];
export default navConfig;
