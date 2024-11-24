import { useEffect } from 'react'

import { CloneSlideDialogsProps } from './CreateSlideTypes'
import { HTMLTemplate } from './HTMLTemplate'
import { WithAIDialog } from './WithAIDialog'

const CloneSlideDialogs = (props: CloneSlideDialogsProps) => {
  useEffect(() => {}, [props.dialogType])

  switch (props.dialogType) {
    case 'Empty Slide':
      props.changeDialogType('')
      props.createEmptySlide()
      return <div>Empty Slide</div>
    case 'HTML Template':
    case 'Normal Template':
      return (
        <HTMLTemplate
          open={true}
          onClose={() => props.changeDialogType('')}
          lessonId={props.lessonId}
          lessonName={''}
        />
      )
    case 'With AI':
      return (
        <WithAIDialog
          open={true}
          onClose={() => props.changeDialogType('')}
          lessonId={props.lessonId}
          lessonName={''}
        />
      )
    default:
      return null
  }
}
export default CloneSlideDialogs
