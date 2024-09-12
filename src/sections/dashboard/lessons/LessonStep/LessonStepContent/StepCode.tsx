import React, { useState } from 'react'

// import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { html } from '@codemirror/lang-html'
import { Box } from '@mui/system'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { useAtom } from 'jotai'

import { ResizerUi } from '@/components'
import MenuItems from '@/components/remirror-editor/MenuItems'
import { SaveButton } from '@/components/remirror-editor/SaveButton'
import { useDebounceCallback } from '@/hooks'
import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { lessonViewAtom } from '../lesson-atoms/lesson-view-atom'

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
  const [value, setValue] = useState<string>('')
  const [staticValue, setStaticValue] = useState<string>('')
  const handleDebouncedCallback = useDebounceCallback(1500)
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom)

  handleDebouncedCallback(() => {
    setStaticValue(value)
  })

  const pageSkeleton = (userContent: string): string | undefined => {
    if (integrations) {
      return `<head>${integrations.reduce(
        (ac, cur) => ac + cur.head,
        ''
      )}</head><main>${userContent}${integrations.reduce((ac, cur) => {
        return ac + cur.scripts
      }, '')}</main>`
    }
  }

  useState(() => {
    if (content) setValue(JSON.parse(content).content)
  })
  return (
    <ResizerUi
      split='vertical'
      defaultSize={isAllColumnsVisible ? '70%' : '100%'}
      allowResize={false}
    >
      <Box position='relative'>
        <MenuItems
          data={data}
          lessonId={lessonId}
          sx={{ mb: 1, mt: 1, ml: 2 }}
        />
        <CodeMirror
          
          value={value}
          theme={dracula}
          height='calc(100vh - 96px)'
          extensions={[html(), EditorView.lineWrapping ]}
          onChange={(value) => {
            setValue(value)
          }}
        />
        <SaveButton
          onClick={() => {
            onSubmit(JSON.stringify({ content: value }))
          }}
          sx={{
            position: 'absolute',
            top: 65,
            right: 35,
            color: '#7963d2',
            border: '1px solid rgba(121, 99, 210, 0.5)',
            borderRadius: '4px',
            '&:hover': {
              border: '1px solid rgba(121, 99, 210, 0.5)',
              backgroundColor: ' rgba(121, 99, 210, 0.1)',
            },
          }}
        />
      </Box>
      {isAllColumnsVisible && (
        <Box
          sx={{
            height: 'calc(100vh - 96px)',
          }}
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
