import { useEffect, useState } from 'react'

import { useFileManager } from './useFileManager'

interface UseFileReadinessProps {
  sandbox?: boolean
}

/**
 * Hook to manage file state and iframe readiness synchronization.
 * Tracks when both the file and iframe are ready, then sends the file content to all iframes.
 *
 * Readiness flags (bitwise):
 * - 1: iframe app-ready
 * - 2: file loaded
 * - 3: both ready (1 | 2)
 */
export const useFileReadiness = ({ sandbox = false }: UseFileReadinessProps = {}) => {
  const { file, onUpdateFile, isLoading, error } = useFileManager({ sandbox })
  const [readiness, setReadiness] = useState(0)
  const [messageSent, setMessageSent] = useState(false)

  const readinessSet = (value: number) => {
    setReadiness((currentReadiness) => {
      const newReadiness = currentReadiness | value

      // When both iframe and file are ready (readiness === 3)
      if (newReadiness === 3 && file && !messageSent) {
        setMessageSent(true)
        window.document.querySelectorAll('iframe').forEach((iframe: HTMLIFrameElement) => {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              { type: 'load-progress', content: file.body || '' },
              '*'
            )
          }
        })
      }

      return newReadiness
    })
  }

  // Set file readiness flag when file is loaded
  useEffect(() => {
    if (file) {
      readinessSet(2)
    }
  }, [file])

  // Handle iframe messages for save-progress and app-ready
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // eslint-disable-next-line no-console
      console.log(event.data)
      switch (event.data.type) {
        case 'save-progress':
          onUpdateFile(event.data.content || '')
          break
        case 'app-ready':
          readinessSet(1)
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
    readiness,
    readinessSet,
  }
}
