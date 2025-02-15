import { type ReactNode } from 'react'

import { IconButton } from '@mui/material'
import { MdOutlineNoteAlt } from '@react-icons/all-files/md/MdOutlineNoteAlt'
import { FullScreenHandle } from 'react-full-screen'

import { Iconify } from '@root/src/components'
import LessonFeedback from '@root/src/sections/code-panel/components/footer/lesson-feedback/LessonFeedback'
import SettingDrawer from '@root/src/sections/code-panel/components/header/nav-bar/options/setting-drawer'
import ResetLessonConfirm from '@root/src/sections/code-panel/components/header/nav-bar/options/setting-drawer/preferences/ResetLessonConfirm'

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
            <Iconify
              icon='mage:refresh'
              color='#FBDD3F'
              width={20}
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
          <IconButton>
            <Iconify
              icon='uil:feedback'
              color='#FBDD3F'
            />
          </IconButton>
        </LessonFeedback>
      ),
      name: 'Feedback',
    },
    {
      icon: (
        <IconButton>
          <Iconify
            icon={handle.active ? 'la:compress-arrows-alt' : 'mdi:arrow-expand-all'}
            color='#FBDD3F'
          />
        </IconButton>
      ),
      name: 'Full screen',
    },
    {
      icon: (
        <MdOutlineNoteAlt
          color='#FBDD3F'
          size='20px'
        />
      ),
      name: 'Menu',
    },
  ]
}
