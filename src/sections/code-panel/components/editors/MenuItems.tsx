import { useRef, useState } from 'react'

import { Button, SxProps } from '@mui/material'
import { LuCheckCircle } from '@react-icons/all-files/lu/LuCheckCircle'
import { LuRemoveFormatting } from '@react-icons/all-files/lu/LuRemoveFormatting'
import { LuScrollText } from '@react-icons/all-files/lu/LuScrollText'
import { LuWrench } from '@react-icons/all-files/lu/LuWrench'
import { TbIroning1 } from '@react-icons/all-files/tb/TbIroning1'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'
import { EditorView, ReactCodeMirrorRef } from '@uiw/react-codemirror'

import Preferences from '@/sections/dashboard/lessons/LessonStep/Modals/Preferences'
import Validation from '@/sections/dashboard/lessons/LessonStep/Modals/Validation'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { ILessonContent } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { MediaModal } from '@root/src/sections/dashboard/medias/MediaModal'
import { useTranslate } from '@root/src/utils/translateHelper'

import { BUTTONS_STYLES, ChallengeBtn, PreCodeBtn, SolutionBtn, TipsBtn } from './controls-btn'
import { MenuPopover } from './MenuPopover'

interface IMenuItems {
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  sx?: SxProps
  editorInstance?: ReactCodeMirrorRef | null
}

const MenuItems = ({ data, lessonId, sx = {}, editorInstance }: IMenuItems) => {
  const translate = useTranslate()

  const [open, setOpen] = useState<HTMLElement | null>(null)
  const {
    value: formatMenuState,
    onTrue: formatMenuOpen,
    onFalse: formatMenuClose,
  } = useBoolean(false)
  const formatMenuButton = useRef<HTMLButtonElement | null>(null)

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
  const formatHTML = (htmlString: string) => {
    let formatted = ''
    let pad = 0

    // Split the HTML content based on tags and filter out empty elements
    htmlString.split(/>\s*</).forEach((element, index, array) => {
      if (element.match(/^\/\w/)) pad-- // Decrease indent if it's a closing tag

      // Add the '<' at the beginning of the first element and '>' at the end of the last element
      if (index === 0) {
        formatted += '' + element + '>\n'
      } else if (index === array.length - 1) {
        formatted += '  '.repeat(pad) + '<' + element + '\n'
      } else {
        formatted += '  '.repeat(pad) + '<' + element + '>\n'
      }

      if (element.match(/^<?\w[^>]*[^/]$/)) pad++ // Increase indent for opening tags
    })

    return formatted.trim()
  }

  const handleAutoFormat = () => {
    const editorView = editorInstance?.view
    if (!editorView) return

    const { state, dispatch } = editorView

    let fullText = state.doc.toString()
    let formattedText = formatHTML(fullText)
    dispatch({
      changes: { from: 0, to: state.doc.length, insert: formattedText },
    })
  }

  const handleCloseChallengeManu = (): void => {
    setOpen(null)
  }
  if (!data) return null
  sx = {
    display: 'flex',
    fontSize: '1rem',
    gap: 0.5,
    color: '#364954',
    fontWeight: 400,
    ...sx,
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button
          onClick={handleOpenChallengeMenu}
          sx={sx}
        >
          <LuCheckCircle size={18} />
          {translate('remirror_toolbar_challenge_btn')}
        </Button>
        {editorInstance && (
          <>
            <Button
              onClick={formatMenuOpen}
              sx={sx}
              ref={formatMenuButton}
            >
              <LuWrench size={18} />
              {translate('remirror_toolbar_tools_btn')}
            </Button>
            <MediaModal insertImage={insertImage}>
              <Button sx={sx}>
                <TbPhoto size={18} />
                {translate('insert_media_btn')}
              </Button>
            </MediaModal>
          </>
        )}
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
          stepId={data?.id}
          stepTitle={data?.title}
          setHasValidation={() => {}}
        >
          <ChallengeBtn />
        </Validation>
        <Preferences
          defaultValues={{ ...data }}
          contentId={data?.id}
          lessonId={lessonId}
          defaultTab={3}
        >
          <TipsBtn />
        </Preferences>
        <Preferences
          defaultValues={{ ...data }}
          contentId={data?.id}
          lessonId={lessonId}
          defaultTab={1}
        >
          <SolutionBtn />
        </Preferences>
        <Preferences
          defaultValues={{ ...data }}
          contentId={data?.id}
          lessonId={lessonId}
          defaultTab={2}
        >
          <PreCodeBtn />
        </Preferences>
      </MenuPopover>
      <MenuPopover
        open={formatMenuState ? formatMenuButton.current : null}
        onClose={formatMenuClose}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
        sx={{ p: 0, width: 150, bgcolor: '#D9F6F8' }}
      >
        {' '}
        {editorInstance && (
          <>
            <Button
              onClick={capeHtml('Escape')}
              title={translate('remirror_toolbar_escape_html_btn_title')}
              sx={BUTTONS_STYLES}
            >
              <LuRemoveFormatting size={18} />
              {translate('remirror_toolbar_escape_html_btn')}
            </Button>
            <Button
              onClick={capeHtml('Unescape')}
              title={translate('remirror_toolbar_cape_html_btn_title')}
              sx={BUTTONS_STYLES}
            >
              <LuScrollText size={18} />
              {translate('remirror_toolbar_cape_html_btn')}
            </Button>
            <Button
              sx={BUTTONS_STYLES}
              onClick={handleAutoFormat}
              title={translate('remirror_toolbar_format_btn_title')}
            >
              <TbIroning1 size={18} />
              {translate('remirror_toolbar_format_btn')}
            </Button>
          </>
        )}
      </MenuPopover>
    </>
  )
}

export default MenuItems
