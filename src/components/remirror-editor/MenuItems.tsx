import { useState } from 'react'

import { Button, SxProps } from '@mui/material'
import { LuCheckCircle } from '@react-icons/all-files/lu/LuCheckCircle'
import { LuRemoveFormatting } from '@react-icons/all-files/lu/LuRemoveFormatting'
import { LuScrollText } from '@react-icons/all-files/lu/LuScrollText'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'
import { EditorView, ReactCodeMirrorRef } from '@uiw/react-codemirror'

import Preferences from '@/sections/dashboard/lessons/LessonStep/Modals/Preferences'
import Validation from '@/sections/dashboard/lessons/LessonStep/Modals/Validation'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { MediaModal } from '@root/src/sections/dashboard/medias/MediaModal'

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

  const capeHtml =
    (direction: 'Escape' | 'Unescape') =>
    (event: React.MouseEvent<HTMLElement>): void => {
      if (!editorInstance || !editorInstance.view) return
      let editorState = (editorInstance.view as EditorView).state
      event.stopPropagation()
      event.preventDefault()
      let selection = editorState.selection.main
      if (!selection) return
      const selectedText = editorState.sliceDoc(selection.from, selection.to)
      let capedText = ''
      switch (direction) {
        case 'Unescape':
          capedText = selectedText
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
          break
        case 'Escape':
          capedText = selectedText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
          break
      }
      editorInstance.view.dispatch({
        changes: {
          from: selection.from,
          to: selection.to,
          insert: capedText,
        },
      })
    }
  const insertImage = (imageAttributes: any) => {
    if (!editorInstance || !editorInstance.view) return
    let selection = (editorInstance.view as EditorView).state.selection.main
    if (!selection) return
    editorInstance.view.dispatch({
      changes: {
        from: selection.from,
        insert: `\n<img src="${imageAttributes.src}"  style="width:100%" />\n`,
      },
    })
  }
  const handleCloseChallengeManu = (): void => {
    setOpen(null)
  }
  if (!data) return null
  sx = {
    display: 'flex',
    gap: 1,
    width: 140,
    fontSize: '1.1rem',
    color: '#364954',
    fontWeight: 400,
    ...sx,
  }
  let sxSmall = {
    ...sx,
    fontSize: '.9rem',
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button
          onClick={handleOpenChallengeMenu}
          sx={sx}
        >
          <LuCheckCircle size={20} />
          Challenge
        </Button>
        {editorInstance ? (
          <>
            <Button
              onClick={capeHtml('Escape')}
              title='Escapes HTML in the selection'
              sx={sxSmall}
            >
              <LuRemoveFormatting size={20} />
              Escape HTML
            </Button>
            <Button
              onClick={capeHtml('Unescape')}
              title='Tangle this code'
              sx={sxSmall}
            >
              <LuScrollText size={20} />
              Cape HTML
            </Button>

            <MediaModal insertImage={insertImage}>
              <Button sx={sxSmall}>
                <TbPhoto size={20} />
              </Button>
            </MediaModal>
          </>
        ) : null}
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
