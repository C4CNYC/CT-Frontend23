import { useState } from 'react'

import { Button, SxProps } from '@mui/material'
import { LuCheckCircle } from '@react-icons/all-files/lu/LuCheckCircle'
import { LuRemoveFormatting } from '@react-icons/all-files/lu/LuRemoveFormatting'
import { EditorView, ReactCodeMirrorRef } from '@uiw/react-codemirror'

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
  editorInstance?: ReactCodeMirrorRef | null
}

const MenuItems = ({ data, lessonId, sx = {}, editorInstance }: IMenuItems) => {
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const handleOpenChallengeMenu = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpen(event.currentTarget)
  }
  const handleEscapeHtml = (event: React.MouseEvent<HTMLElement>): void => {
    if (!editorInstance || !editorInstance.view) return
    let editorState = (editorInstance.view as EditorView).state
    event.stopPropagation()
    event.preventDefault()
    let selection = editorState.selection.main
    if (!selection) return 
    const selectedText = editorState.sliceDoc(selection.from, selection.to)
    const escapedText = selectedText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
    editorInstance.view.dispatch({
      changes: {
        from: selection.from,
        to: selection.to,
        insert: escapedText,
      },
    })
  }

  const handleCloseChallengeManu = (): void => {
    setOpen(null)
  }
  if (!data) return null

  return (
    <>
      <div style={{ display: 'flex' }}>
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
        <Button
          onClick={handleEscapeHtml}
          title='Escapes HTML in the selection'
        >
          <LuRemoveFormatting size={20} />
          Escape HTML
        </Button>{' '}
      </div>
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
