import { createContext, useContext } from 'react'

interface CodePanelContextType {
  lessonId: string | undefined
  studentCode: string
  autoRun: boolean
  reloadIframe: () => void
  studentCodeChange: (code: string) => void
  reloadIframeKey: number
}

export const CodePanelContext = createContext<CodePanelContextType>({
  lessonId: '',
  studentCode: '',
  autoRun: true,
  reloadIframe: () => {},
  reloadIframeKey: 0,
  studentCodeChange: (code: string) => {},
})

export const useCodePanel = () => {
  const context = useContext(CodePanelContext)
  if (!context) {
    throw new Error('useCodePanel must be used within a CodePanelContextProvider')
  }
  return context
}
