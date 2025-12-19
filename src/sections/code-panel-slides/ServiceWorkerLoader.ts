import { useEffect, useRef } from 'react'

export function useLessonLoader(): { init: () => Promise<void> } {
  const channelRef = useRef<MessageChannel | null>(null)

  async function init(): Promise<void> {
    if (!navigator.serviceWorker) {
      return Promise.reject(new Error('[Status] Service Workers not supported (error)'))
    }

    try {
      await navigator.serviceWorker.register('/assets/js/service-worker.js', {
        scope: '/student/code-panel/',
      })
      await navigator.serviceWorker.ready
    } catch (error) {
      return Promise.reject(new Error('[Status] Service Worker reg failed!'))
    }
  }

  useEffect(() => {
    init()
  }, [])

  return { init }
}
