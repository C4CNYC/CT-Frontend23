import { Label, Iconify } from "@components";
import { PATH_DASHBOARD, PATH_MAIN, PATH_PAGE } from "@routes/paths";
import {
  BsFillFileEarmarkMedicalFill,
  BsFlagFill,
  BsSpeedometer2,
} from "react-icons/bs";
import { AiOutlineSolution } from "react-icons/ai";
import { FaSchool, FaTasks, FaUsers, FaUserShield, FaUserFriends } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { GoFileSubmodule } from "react-icons/go";
import { GrOrganization } from "react-icons/gr";
import { IoMdSchool } from "react-icons/io";
import { MdPlayLesson } from "react-icons/md";
import { RiOrganizationChart, RiFeedbackFill } from "react-icons/ri";
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

const navConfig = [admin, managment, general, social, apps, socials];
export default navConfig;
