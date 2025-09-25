import React, { useContext, useEffect, useState } from 'react'

import { Box } from '@mui/system'
import { useAtom } from 'jotai'

import { ResizerUi } from '@root/src/components'
import MenuItems from '@root/src/sections/code-panel/components/editors/MenuItems'
import { SaveButton } from '@root/src/sections/code-panel/components/editors/SaveButton'

import { lessonViewAtom } from '../lesson-atoms/lesson-view-atom'

import { EditorSelectorProps } from './EditorSelector'
import { LessonContentContext } from './LessonContent.context'
import { StepPreview } from './StepPreview'

export function StepMd(props: EditorSelectorProps): React.ReactElement {
  const { lockedHandler } = useContext(LessonContentContext)
  const [value, setValue] = useState<string>('')
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom)

  const initialValue = (() => {
    if (props.content?.length) {
      try {
        const parsed = JSON.parse(props.content)
        return parsed?.content ?? ''
      } catch {
        return props.content
      }
    }
    return ''
  })()

  useEffect(() => {
    if (props.content?.length) {
      try {
        const parsed = JSON.parse(props.content)
        setValue(parsed?.content ?? '')
      } catch {
        setValue(props.content)
      }
    } else {
      setValue('')
    }
  }, [props.content])

  useEffect(() => {
    lockedHandler(value != initialValue)
  }, [value])

  const onSave = (): void => {
    props.onSubmit(JSON.stringify({ content: value }))
  }

  return (
    <>
      <ResizerUi
        split='vertical'
        defaultSize={isAllColumnsVisible ? '70%' : '100%'}
        minSize={400}
        maxSize={750}
      >
        <Box
          className='lessonCreationStep3'
          sx={{ position: 'relative' }}
        >
          <MenuItems
            data={props.data}
            lessonId={props.lessonId}
            sx={{ mb: 1, mt: 1, ml: 2 }}
            editorInstance={null}
          />
          <Box sx={{ px: 2, pb: 2 }}>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Write Markdown here...'
              style={{
                width: '100%',
                height: 'calc(100vh - 154px)',
                resize: 'none',
                border: '1px solid #e0e0e0',
                outline: 'none',
                padding: '12px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '14px',
                lineHeight: 1.5,
                background: '#0B0C10',
                color: '#E5E7EB',
                borderRadius: 4,
              }}
            />
          </Box>
          <SaveButton
            onClick={onSave}
            iconColor='#22C55E'
            sx={{
              position: 'absolute',
              top: 65,
              right: 35,
              color: '#22C55E',
              borderRadius: '4px',
              border: '1px solid #22C55E',
              '&:hover': {
                background: '#22C55E3F',
              },
            }}
          />
        </Box>
        <Box
          className='lessonCreationStep4'
          sx={{ height: 'calc(100vh - 96px)' }}
        >
          <StepPreview
            integrations={props.integrations}
            // For now, preview raw markdown. Rendering engine can be added later.
            staticValue={`<pre style=\"white-space:pre-wrap;word-wrap:break-word;background:${props.bgColor}\">${value.replace(/</g, '&lt;')}</pre>`}
            key={value}
            bgColor={props.bgColor}
          />
        </Box>
      </ResizerUi>
    </>
  )
}
