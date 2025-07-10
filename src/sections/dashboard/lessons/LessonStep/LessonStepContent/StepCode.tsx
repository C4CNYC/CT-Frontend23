import React, { useContext, useEffect, useState } from 'react'

// import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { html } from '@codemirror/lang-html'
import { Box } from '@mui/system'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { EditorView } from '@uiw/react-codemirror'
import { useAtom } from 'jotai'

import { ResizerUi } from '@/components'
import { useDebounceCallback } from '@/hooks'
import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import CodeMirror from '@root/src/components/code-mirror/codemirror'
import MenuItems from '@root/src/sections/code-panel/components/editors/MenuItems'
import { SaveButton } from '@root/src/sections/code-panel/components/editors/SaveButton'
import { isJson } from '@root/src/utils/isJson'

import { lessonViewAtom } from '../lesson-atoms/lesson-view-atom'

import { LessonContentContext } from './LessonContent.context'

interface Props {
  content: string
  integrations: IIntegration[]
  onSubmit: (value: string) => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
}

/**
   @todo: this component should be removed and BrowserView '@root/src/sections/code-panel/components/body/blocks/view-block/browser-view'  be used 
**/
export default function StepCode({
  content,
  integrations,
  onSubmit,
  data,
  lessonId,
}: Props): React.ReactElement {
  const editorRef = React.useRef(null)
  const [value, setValue] = useState<string>('')
  const { lockedHandler } = useContext(LessonContentContext)
  const [staticValue, setStaticValue] = useState<string>('')
  const handleDebouncedCallback = useDebounceCallback(1500)
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom)

  handleDebouncedCallback(() => {
    setStaticValue(value)
  })

  const pageSkeleton = (userContent: string): string | undefined => {
    if (integrations) {
      return `<head>${integrations.reduce(
        (ac, cur) => ac + (cur.head.startsWith('<') ? cur.head : `<style>${cur.head}</style>`),
        ''
      )}<meta charset="utf-8"></head><main>${userContent}${integrations.reduce((ac, cur) => {
        return cur.scripts ? ac + cur.scripts : ac
      }, '')}</main>`
    }
  }
  useEffect(() => {
    let c = isJson(content) ? JSON.parse(content).content || '' : content
    lockedHandler(value != c)
  }, [value])

  useEffect(() => {
    if (content) {
      let contentParsed = JSON.parse(content)
      setValue(contentParsed.content ?? '')
    }
  }, [content])

  return (
    <ResizerUi
      split='vertical'
      defaultSize={isAllColumnsVisible ? '70%' : '100%'}
      minSize={400}
      maxSize={750}
    >
      <Box
        position='relative'
        className='lessonCreationStep3'
      >
        <MenuItems
          data={data}
          lessonId={lessonId}
          sx={{ mb: 1, mt: 1, ml: 2 }}
          editorInstance={editorRef.current}
        />
        <CodeMirror
          ref={editorRef}
          value={value}
          theme={dracula}
          height='calc(100vh - 154px)'
          extensions={[html(), EditorView.lineWrapping]}
          onChange={setValue}
        />
        <SaveButton
          onClick={() => {
            onSubmit(JSON.stringify({ content: value }))
          }}
          iconColor='#FF69B4'
          sx={{
            position: 'absolute',
            top: 65,
            right: 35,
            color: '#FF69B4',
            borderRadius: '4px',
            border: '1px solid #FF69B4',
            '&:hover': {
              background: '#FF69B43F',
            },
          }}
        />
      </Box>
      {isAllColumnsVisible && (
        <Box
          sx={{
            height: 'calc(100vh - 96px)',
          }}
          className='lessonCreationStep4'
        >
          <iframe
            style={{
              border: 0,
              width: '100%',
              height: '100%',
            }}
            src={'data:text/html,' + encodeURIComponent(pageSkeleton(staticValue) as string)}
          />
        </Box>
      )}
    </ResizerUi>
  )
}
