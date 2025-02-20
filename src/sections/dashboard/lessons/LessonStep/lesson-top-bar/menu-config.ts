import { IconType } from '@react-icons/all-files'
import { FaRunning } from '@react-icons/all-files/fa/FaRunning'
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut'
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'
import { SlSpeedometer } from '@react-icons/all-files/sl/SlSpeedometer'

import { STUDENT_PATH_DASHBOARD, STUDENT_PATH_PAGE } from '@/routes/student.paths'
interface IMenuConfigItem {
  title: string
  subTitle?: string
  icon: IconType
  href: string
}

export const menuConfig: IMenuConfigItem[] = [
  {
    title: 'overview',
    subTitle: 'home',
    icon: SlSpeedometer,
    href: STUDENT_PATH_DASHBOARD.courses.root,
  },
  {
    title: 'me_me_me',
    subTitle: 'profile',
    icon: FaRunning,
    href: STUDENT_PATH_PAGE.profile,
  },

  {
    title: 'get_out',
    subTitle: 'log_out',
    icon: IoIosLogOut,
    href: '',
  },
  {
    title: 'close_editor',
    icon: IoCloseOutline,
    href: 'close',
  },
]
