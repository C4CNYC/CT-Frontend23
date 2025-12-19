import { useEffect, useState } from 'react'

import { useFileManager } from './useFileManager'

interface UseFileReadinessProps {
  sandbox?: boolean
}

export const useFileReadiness = ({ sandbox = false }: UseFileReadinessProps = {}) => {
  const { file, onUpdateFile, isLoading, error } = useFileManager({ sandbox })
  const [readyFile, readyFileSet] = useState(false)
  const [readyApp, readyAppSet] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    if (!readyFile || !readyApp || messageSent) return

    setMessageSent(true)
    window.document.querySelectorAll('iframe').forEach((iframe: HTMLIFrameElement) => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'load-progress', content: file?.body || '' }, '*')
      }
    })
  }, [readyFile, readyApp, file])

  useEffect(() => {
    if (file) {
      readyFileSet(true)
    }
  }, [file])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // eslint-disable-next-line no-console
      console.log(event.data)
      switch (event.data.type) {
        case 'save-progress':
          onUpdateFile(event.data.content || '')
          break
        case 'app-ready':
          readyAppSet(true)
          break
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onUpdateFile])

  return {
    file,
    onUpdateFile,
    isLoading,
    error,
    readiness: readyApp && readyFile,
  }
}
