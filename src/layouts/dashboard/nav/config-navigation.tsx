import { AiOutlineSolution } from '@react-icons/all-files/ai/AiOutlineSolution'
import { BiConversation } from '@react-icons/all-files/bi/BiConversation'
import { FaRegStickyNote } from '@react-icons/all-files/fa/FaRegStickyNote'
import { FaSchool } from '@react-icons/all-files/fa/FaSchool'
import { FaTasks } from '@react-icons/all-files/fa/FaTasks'
import { FaUserFriends } from '@react-icons/all-files/fa/FaUserFriends'
import { FaUsers } from '@react-icons/all-files/fa/FaUsers'
import { FaUserShield } from '@react-icons/all-files/fa/FaUserShield'
import { FiCodesandbox } from '@react-icons/all-files/fi/FiCodesandbox'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { GiProgression } from '@react-icons/all-files/gi/GiProgression'
import { GoFileSubmodule } from '@react-icons/all-files/go/GoFileSubmodule'
import { HiOutlineLightBulb } from '@react-icons/all-files/hi2/HiOutlineLightBulb'
import { IoMdSchool } from '@react-icons/all-files/io/IoMdSchool'
import { MdAdminPanelSettings } from '@react-icons/all-files/md/MdAdminPanelSettings'
import { MdPlayLesson } from '@react-icons/all-files/md/MdPlayLesson'
import { RiOrganizationChart } from '@react-icons/all-files/ri/RiOrganizationChart'
import { Tb3DCubeSphere } from '@react-icons/all-files/tb/Tb3DCubeSphere'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'

import { Role } from '@/redux/services/enums/role.enum'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import LessonFeedback from '@/sections/code-panel/components/footer/lesson-feedback/LessonFeedback'
import InviteFriendsModal from '@/sections/invite-friends/InviteFriendsModal'
import MenuTribesList from '@/sections/main/menu-list/MenuTribesList'
import CatalogMenuItem from '@root/src/sections/menu-items-components/catalog-item'
import MarketMenuItem from '@root/src/sections/menu-items-components/market-item'
import SandboxMenuItem from '@root/src/sections/menu-items-components/sandbox-item'
import MyCreationsMenu from '@root/src/sections/my-creations-menu'

export const admin = {
  subheader: 'sidebar_menu_administration',
  items: [
    {
      title: 'sidebar_menu_members',
      path: MANAGER_PATH_DASHBOARD.organization.members,
      icon: <FaUserShield />,
    },
    {
      title: 'sidebar_menu_schools',
      path: MANAGER_PATH_DASHBOARD.organization.schools,
      icon: <RiOrganizationChart />,
    },
  ],
}

export const superAdmin = {
  subheader: 'sidebar_menu_administration',
  items: [
    {
      title: 'sidebar_menu_admin',
      path: MANAGER_PATH_DASHBOARD.administration.root,
      icon: <MdAdminPanelSettings />,
    },
  ],
}

export const managment = {
  subheader: 'sidebar_menu_management',
  items: [
    {
      title: 'sidebar_menu_school',
      path: MANAGER_PATH_DASHBOARD.school.general,
      icon: <FaSchool />,
    },
    {
      title: 'sidebar_menu_students',
      path: MANAGER_PATH_DASHBOARD.school.students,
      icon: <FaUsers />,
    },
    {
      title: 'sidebar_menu_classes',
      path: MANAGER_PATH_DASHBOARD.school.classes,
      icon: <IoMdSchool />,
    },
    {
      title: 'sidebar_menu_assignments',
      path: MANAGER_PATH_DASHBOARD.school.assignments,
      icon: <AiOutlineSolution />,
    },
    {
      title: 'sidebar_menu_progress',
      path: MANAGER_PATH_DASHBOARD.school.progress,
      icon: <GiProgression />,
    },
  ],
}

export const content = {
  subheader: 'sidebar_menu_content',
  items: [
    {
      title: 'sidebar_menu_courses',
      path: MANAGER_PATH_DASHBOARD.courses.root,
      icon: <MdPlayLesson />,
    },
    {
      title: 'sidebar_menu_modules',
      path: MANAGER_PATH_DASHBOARD.modules.root,
      icon: <GoFileSubmodule />,
    },
    {
      title: 'sidebar_menu_lessons',
      path: MANAGER_PATH_DASHBOARD.lessons.root,
      icon: <MdPlayLesson />,
    },
    {
      title: 'sidebar_menu_tasks',
      path: ' ',
      icon: <FaTasks />,
      info: 'coming_soon',
      disabled: true,
    },
    {
      title: 'sidebar_menu_properties',
      path: MANAGER_PATH_DASHBOARD.properties,
      icon: <FiCodesandbox />,
    },
    {
      title: 'sidebar_menu_integrations',
      path: MANAGER_PATH_DASHBOARD.apps.root,
      icon: <FiSettings />,
    },
    {
      title: 'sidebar_menu_skills',
      path: MANAGER_PATH_DASHBOARD.skills.root,
      icon: <HiOutlineLightBulb />,
    },
  ],
}

export const courses = {
  subheader: '',
  items: [
    {
      path: STUDENT_PATH_DASHBOARD.courses.root,
      title: 'sidebar_menu_catalog',
      icon: <FaUserFriends size={20} />,
      component: () => <CatalogMenuItem />,
    },
    {
      path: '',
      title: 'sidebar_menu_my_sandbox',
      icon: <FaUserFriends size={20} />,
      component: () => <SandboxMenuItem />,
    },
  ],
}
export const market_sandbox = {
  subheader: '',
  items: [
    {
      path: '',
      title: 'sidebar_menu_market',
      icon: <FaUserFriends size={20} />,
      component: () => <MarketMenuItem />,
    },
  ],
}

export const general = {
  subheader: '',
  items: [
    {
      path: '',
      title: '',
      icon: <FaUserFriends size={20} />,
      component: () => <MenuTribesList />,
    },
  ],
}

export const social = {
  subheader: 'sidebar_menu_socials',
  items: [
    {
      title: 'Tribes',
      path: STUDENT_PATH_DASHBOARD.tribes.root,
      icon: <Tb3DCubeSphere size={20} />,
    },
    {
      title: 'Friends',
      path: STUDENT_PATH_DASHBOARD.friends.root,
      icon: <FaUserFriends size={20} />,
    },

    {
      title: 'Invite Friends',
      path: '#',
      icon: <FaUserFriends size={20} />,
      component: (children: React.ReactElement) => (
        <InviteFriendsModal>{children}</InviteFriendsModal>
      ),
    },
  ],
}
export const apps = {
  subheader: 'sidebar_menu_apps',
  items: [
    {
      path: '',
      title: 'sidebar_menu_my_creations',
      icon: <FaUserFriends size={20} />,
      component: () => <MyCreationsMenu />,
    },
    {
      title: 'sidebar_menu_gallery',
      path: STUDENT_PATH_DASHBOARD.gallery.root,
      icon: <TbPhoto size={20} />,
    },
    {
      title: 'sidebar_menu_my_notes',
      path: STUDENT_PATH_DASHBOARD.myNotes,
      icon: <FaRegStickyNote size={20} />,
    },
    {
      title: 'sidebar_menu_feedback',
      path: '#',
      icon: <BiConversation size={20} />,
      component: (children: React.ReactElement) => (
        <LessonFeedback sidebar={true}>{children}</LessonFeedback>
      ),
    },
  ],
}
export const socials = {
  subheader: 'SOCIALS',
  items: [],
}

export const menuConfig = (currentRole: Role) =>
  currentRole == Role.Admin || currentRole == Role.SuperAdmin
    ? {
        [Role.SuperAdmin]: [superAdmin, admin, managment, content],
        [Role.Owner]: [admin, managment, content],
        [Role.Admin]: [admin, managment, content, market_sandbox],
        [Role.Student]: [courses, general, apps],
        [Role.Anonymous]: [courses, general, apps],
        [Role.Manager]: [managment, content],
        [Role.Editor]: [content],
      }
    : {
        [Role.SuperAdmin]: [superAdmin, admin, managment, content],
        [Role.Owner]: [admin, managment, content],
        [Role.Admin]: [admin, managment, content, market_sandbox],
        [Role.Student]: [courses, general, apps],
        [Role.Anonymous]: [courses, general, apps],
        [Role.Manager]: [managment, content],
        [Role.Editor]: [content],
      }
