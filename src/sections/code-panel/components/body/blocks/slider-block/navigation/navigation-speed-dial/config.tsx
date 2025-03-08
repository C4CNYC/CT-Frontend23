import { type ReactNode } from 'react'

import { IconButton } from '@mui/material'
import { HiArrowsPointingIn } from '@react-icons/all-files/hi2/HiArrowsPointingIn'
import { HiArrowsPointingOut } from '@react-icons/all-files/hi2/HiArrowsPointingOut'
import { IoRefreshOutline } from '@react-icons/all-files/io5/IoRefreshOutline'
import { FullScreenHandle } from 'react-full-screen'

import LessonFeedback from '@root/src/sections/code-panel/components/footer/lesson-feedback/LessonFeedback'
import SettingDrawer from '@root/src/sections/code-panel/components/header/nav-bar/options/setting-drawer'
import ResetLessonConfirm from '@root/src/sections/code-panel/components/header/nav-bar/options/setting-drawer/preferences/ResetLessonConfirm'
import LessonManager from '@root/src/sections/code-panel/components/lesson-manager'
import FeedbackIcon from '@root/src/assets/icons/FeedbackIcon'

interface Action {
  icon: ReactNode
  name: string
}

interface IGetActions {
  lessonName: string
  handle: FullScreenHandle
}

export const getActions = ({ lessonName, handle }: IGetActions): Action[] => {
  return [
    {
      icon: (
        <ResetLessonConfirm>
          <IconButton>
            <IoRefreshOutline
              color='#FBDD3F'
              size={20}
            />
          </IconButton>
        </ResetLessonConfirm>
      ),
      name: 'Reset',
    },
    {
      icon: <SettingDrawer iconColor='#FBDD3F' />,
      name: 'Info',
    },
    {
      icon: (
        <LessonFeedback lessonName={lessonName}>
          <IconButton sx={{ pt: 1.5 }}>
            <FeedbackIcon color='#FBDD3F' />
          </IconButton>
        </LessonFeedback>
      ),
      name: 'Feedback',
    },
    {
      icon: (
        <IconButton
          onClick={async () => {
            try {
              if (handle.active) {
                await handle.exit()
              } else {
                await handle.enter()
              }
            } catch (error) {}
          }}
        >
          {handle.active ? (
            <HiArrowsPointingIn color='#FBDD3F' />
          ) : (
            <HiArrowsPointingOut color='#FBDD3F' />
          )}
        </IconButton>
      ),
      name: 'Full screen',
    },
    {
      icon: <LessonManager iconColor={'#FBDD3F'} />,
      name: 'Menu',
    },
  ]
}
