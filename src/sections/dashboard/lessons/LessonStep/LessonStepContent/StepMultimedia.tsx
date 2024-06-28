import { useContext, useState } from 'react'

import { Box } from '@mui/material'

import { ResizerUi } from '@/components'
import { MyEditor } from '@/components/remirror-editor/MyEditor'
import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { LessonContentContext } from './LessonContent.context'

interface Props {
  content: string
  onSubmit: (value: string) => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

export default function StepMultimedia({
  onSubmit,
  content,
  data,
  lessonId,
  bgColor,
  setBgColor,
}: Props): React.ReactElement {
  const { locked } = useContext(LessonContentContext)
  const [value, setValue] = useState<string>('')

  return (
    <ResizerUi
      vertical
      defaultSizes={[800]}
    >
      <Box sx={{ bgcolor: bgColor, height: '100%' }}>
        <MyEditor
          onSubmit={() => {
            onSubmit(JSON.stringify(value))
          }}
          multimediaValue={content}
          setMultimediaValue={setValue}
          editable={!locked}
          locked={locked}
          data={data}
          lessonId={lessonId}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
      </Box>
      <Box sx={{ bgcolor: bgColor, height: '100%' }}>
        <MyEditor
          editable={false}
          multimediaValue={value}
          data={data}
          lessonId={lessonId}
          bgColor={bgColor}
        />
      </Box>
    </ResizerUi>
  )
}
