import { useState } from 'react'

import { useDebounceCallback } from '@root/src/hooks/useDebounceCallback'
import { useProperties } from '@root/src/hooks/useProperties'
import { useSelector } from '@root/src/redux/store'

import { CodePanelContext } from './CodePanelContext'

type Props = {
  children: React.ReactNode
}

export function CodePanelContextProvider({ children }: Props): JSX.Element {
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const [studentCode, setStudentCode] = useState<string>('')
  const [iframeKey, setIframeKey] = useState<number>(0)
  const [autoRun] = useProperties({
    entityType: 'lesson',
    entityId: lessonId,
    propertyName: 'autoRun',
  })

  const { Provider } = CodePanelContext

  const reloadIframe = () => {
    setIframeKey((key) => key + 1)
  }

  // Create debounced reload function with 500ms delay
  const debouncedReload = useDebounceCallback(500)

  function studentCodeChange(code: string) {
    setStudentCode(code)
    if (autoRun) {
      // Use debounced reload instead of immediate reload
      debouncedReload(reloadIframe)
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
