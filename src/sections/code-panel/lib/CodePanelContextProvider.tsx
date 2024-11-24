import { useState } from 'react'

import { useProperties } from '@root/src/hooks/useProperties'

import { CodePanelContext } from './CodePanelContext'

type Props = {
  children: React.ReactNode
  lessonId: string
  studentCode: string
}

export function CodePanelContextProvider({ children, ...props }: Props): JSX.Element {
  const [lessonId, setLessonId] = useState<string>(props.lessonId)
  const [studentCode, setStudentCode] = useState<string>('')
  const [iframeKey, setIframeKey] = useState<number>(0)
  const [autoRun] = useProperties({
    entityType: 'lesson',
    entityId: props.lessonId,
    propertyName: 'autoRun',
  })

  const { Provider } = CodePanelContext

  const reloadIframe = () => {
    setIframeKey((key) => key + 1)
  }
  function studentCodeChange(code: string) {
    setStudentCode(code)
    if (autoRun) {
      reloadIframe()
    }
  }

  return (
    <Provider
      value={{
        lessonId,
        studentCode,
        autoRun: autoRun ? true : false,
        reloadIframe,
        reloadIframeKey: iframeKey,
        studentCodeChange,
      }}
    >
      {children}
    </Provider>
  )
}
