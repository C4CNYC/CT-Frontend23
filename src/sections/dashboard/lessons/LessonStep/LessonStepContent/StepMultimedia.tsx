import { useContext, useState } from 'react'

import { Box } from '@mui/material'

import { ResizerUi } from '@/components'
import { BaseResponseInterface } from '@/lib/utils/baseResponse.interface'
import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'

import { MyEditor } from '../../../../../components/remirror-editor/MyEditor'

import { LessonContentContext } from './LessonContent.context'

interface Props {
  content: string
  onSubmit: (value: string) => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
}

export default function StepMultimedia({
  onSubmit,
  content,
  data,
  lessonId,
}: Props): React.ReactElement {
  const { locked } = useContext(LessonContentContext)
  const [value, setValue] = useState<string>('')

  return (
    <ResizerUi
      split='vertical'
      primary='first'
      defaultSize={800}
    >
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
      />
      <Box>
        <MyEditor
          editable={false}
          multimediaValue={value}
          data={data}
          lessonId={lessonId}
        />
      </Box>
    </ResizerUi>
  )
}
