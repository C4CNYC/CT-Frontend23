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
  let [autoRunString] = useProperties({
    entityType: 'lesson',
    entityId: lessonId,
    propertyName: 'autoRun',
  })
  // @ts-ignore
  const autoRun = autoRunString === 'true' || autoRunString === 1 || autoRunString === true
  const { Provider } = CodePanelContext

  const reloadIframe = () => {
    setIframeKey((key) => key + 1)
  }

  const debouncedReload = useDebounceCallback(500)

  function studentCodeChange(code: string) {
    setStudentCode(code)
    if (autoRun) {
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
