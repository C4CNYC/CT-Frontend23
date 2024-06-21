import { useState } from 'react'

import { Button, SxProps } from '@mui/material'
import { LuCheckCircle } from '@react-icons/all-files/lu/LuCheckCircle'

import Preferences from '@/sections/dashboard/lessons/LessonStep/Modals/Preferences'
import Validation from '@/sections/dashboard/lessons/LessonStep/Modals/Validation'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { ILessonContent } from '../../redux/services/interfaces/courseUnits.interface'
import { MenuPopover } from '../menu-popover'

import { ChallengeBtn, PreCodeBtn, SolutionBtn, TipsBtn } from './controls-btn'

interface IMenuItems {
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  sx?: SxProps
}

const MenuItems = ({ data, lessonId, sx = {} }: IMenuItems) => {
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const handleOpenChallengeMenu = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpen(event.currentTarget)
  }

  const handleCloseChallengeManu = (): void => {
    setOpen(null)
  }

  return (
    <>
      <Button
        onClick={handleOpenChallengeMenu}
        sx={{
          display: 'flex',
          gap: 1,
          width: 140,
          fontSize: '1.1rem',
          color: '#364954',
          fontWeight: 400,
          ...sx,
        }}
      >
        <LuCheckCircle size={20} />
        Challenge
      </Button>

      <MenuPopover
        open={open}
        onClose={handleCloseChallengeManu}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
        sx={{ p: 0, width: 140, bgcolor: '#D9F6F8' }}
      >
        <Validation
          stepId={data.id}
          stepTitle={data.title}
          setHasValidation={() => {}}
        >
          <ChallengeBtn />
        </Validation>
        <Preferences
          defaultValues={{ ...data }}
          contentId={data.id}
          lessonId={lessonId}
          defaultTab={3}
        >
          <TipsBtn />
        </Preferences>
        <Preferences
          defaultValues={{ ...data }}
          contentId={data.id}
          lessonId={lessonId}
          defaultTab={1}
        >
          <SolutionBtn />
        </Preferences>
        <Preferences
          defaultValues={{ ...data }}
          contentId={data.id}
          lessonId={lessonId}
          defaultTab={2}
        >
          <PreCodeBtn />
        </Preferences>
      </MenuPopover>
    </>
  )
}

export default MenuItems
