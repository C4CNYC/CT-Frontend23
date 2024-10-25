import { useContext, useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { useAtom } from 'jotai'

import { ResizerUi } from '@/components'
import { MyEditor } from '@/components/remirror-editor/MyEditor'
import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { isJson } from '@root/src/utils/isJson'

import { lessonViewAtom } from '../lesson-atoms/lesson-view-atom'

import { LessonContentContext } from './LessonContent.context'
import { StepPreview } from './StepPreview'

interface Props {
  content: string
  onSubmit: (value: string) => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  integrations: IIntegration[]
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

export default function StepMultimedia({
  onSubmit,
  content,
  data,
  lessonId,
  integrations,
  bgColor,
  setBgColor,
}: Props): React.ReactElement {
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom)
  const [value, setValue] = useState<string>('')

  const { locked, lockedHandler } = useContext(LessonContentContext)

  useEffect(() => {
    let c = isJson(content)
      ? JSON.parse(content)?.doc ?? JSON.parse(content)?.content ?? ''
      : content
    lockedHandler(value != c)
  }, [value])

  return (
    <ResizerUi
      split='vertical'
      primary='first'
      defaultSize={isAllColumnsVisible ? '100%' : 800}
    >
      <Box sx={{ bgcolor: bgColor, height: '100%' }}>
        <MyEditor
          onSubmit={() => {
            onSubmit(JSON.stringify({ doc: value }))
          }}
          integrations={integrations}
          multimediaValue={content}
          setMultimediaValue={setValue}
          editable={true}
          locked={false}
          data={data}
          lessonId={lessonId}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
      </Box>
      <StepPreview
        integrations={integrations}
        staticValue={value}
        bgColor={bgColor}
      />
    </ResizerUi>
  )
}
