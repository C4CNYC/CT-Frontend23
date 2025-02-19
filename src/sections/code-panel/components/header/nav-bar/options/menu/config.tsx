import { ReactNode } from 'react'

import { FaBus } from '@react-icons/all-files/fa/FaBus'
import { FaChildReaching } from '@react-icons/all-files/fa6/FaChildReaching'
import { FaRegHeart } from '@react-icons/all-files/fa6/FaRegHeart'
import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline'
import { LuBaby } from '@react-icons/all-files/lu/LuBaby'
import { MdConnectWithoutContact } from '@react-icons/all-files/md/MdConnectWithoutContact'
import { PiMaskHappyLight } from '@react-icons/all-files/pi/PiMaskHappyLight'
import { PiVideoBold } from '@react-icons/all-files/pi/PiVideoBold'
import { RiGalleryLine } from '@react-icons/all-files/ri/RiGalleryLine'

import { PATH_AUTH } from '@/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import InviteFriendsModal from '@/sections/invite-friends/InviteFriendsModal'
import { UserType } from '@/utils'

import MenuHugDialog from './MenuHugDialog'

interface IMenuConfigItem {
  title: string
  subTitle?: string
  icon: ReactNode
  href: string | ILinks
  component?: (children: React.ReactElement, key: string | number) => React.ReactElement
  target?: '_self' | '_blank'
}
export enum ILinks {
  logout = 'logaut',
  modal = 'modal',
}

export const authorizedUserConfig: IMenuConfigItem[] = [
  {
    title: 'home',
    subTitle: '',
    icon: <IoHomeOutline />,
    href: STUDENT_PATH_DASHBOARD.class.root,
  },
  {
    title: 'take_tour',
    subTitle: '',
    icon: <FaBus />,
    href: ILinks.modal,
    component: (children, key) => <div key={key}>{children}</div>,
  },
  {
    title: 'how_to_video',
    subTitle: '',
    icon: <PiVideoBold />,
    href: 'https://www.youtube.com/@freecodecamp',
    target: '_blank',
  },
  {
    title: 'gallery',
    subTitle: '',
    icon: <RiGalleryLine />,
    href: STUDENT_PATH_DASHBOARD.gallery.root,
  },
  {
    title: 'need_hug',
    icon: <FaRegHeart />,
    href: ILinks.modal,
    component: (children, key) => (
      <div key={key}>
        <MenuHugDialog>{children}</MenuHugDialog>
      </div>
    ),
  },
  {
    title: 'sidebar_menu_invite_friends',
    icon: <PiMaskHappyLight />,
    href: ILinks.modal,
    component: (children, key) => (
      <div key={key}>
        <InviteFriendsModal>{children}</InviteFriendsModal>
      </div>
    ),
  },
]

export const anonimUserConfig: IMenuConfigItem[] = [
  {
    title: 'i_brand_new',
    subTitle: 'register',
    icon: <LuBaby />,
    href: PATH_AUTH.onBoardingStudent,
  },
  {
    title: 'login_been_here',
    subTitle: 'login',
    icon: <FaChildReaching />,
    href: PATH_AUTH.signIn,
  },
  {
    title: 'sidebar_menu_invite_friends',
    icon: <MdConnectWithoutContact />,
    href: '#',
  },
]

const config = {
  [UserType.Authorized]: authorizedUserConfig,
  [UserType.Anonim]: anonimUserConfig,
}
export default config
