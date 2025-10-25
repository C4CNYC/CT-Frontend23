import { useEffect, useRef } from 'react'

import { ILessonContent } from '@root/src/redux/interfaces/content.interface'

import SkeletonViewBlock from '../code-panel/components/body/blocks/view-block/skeleton-view-box'

import { useLessonManager } from './LessonManagerContext'

export function BrowserViewTeacherBare({ slide }: { slide: ILessonContent }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { lesson } = useLessonManager()

  let integrationsScripts = (lesson?.integrations || [])
    .map((integration) => integration.scripts)
    .filter(Boolean)
    .join('\n')
  let integrationsStyles = (lesson?.integrations || [])
    .map((integration) => integration.head)
    .filter(Boolean)
    .join('\n')

  useEffect(() => {
    if (slide.body == null || !iframeRef.current) return
    let slideContent = JSON.parse(slide.body)
    // const content = slideContent.extension === 'md'
    //   ? convertMdToHtml(slideContent.content)
    //   : slideContent.content || '<h1>Hello World</h1>';
    iframeRef.current.srcdoc = `
          <html style="height:100%;box-sizing:border-box">
            <head>
              <link rel="stylesheet" href="/fonts/index.css" />
              <style>*{box-sizing:border-box}body{margin:0;padding:0;height:100%}</style>
              ${integrationsStyles}
              <script>let slideContent=${JSON.stringify(slideContent.content)}</script>
            </head>
            <body>Bosluk</body>
            ${integrationsScripts || ''} 
          </html>`
  }, [slide.body, iframeRef.current, lesson?.integrations])

  if (!slide.body) return <SkeletonViewBlock isOpenHeader={true} />
  return (
    <iframe
      className='BrowserViewTeacherView'
      ref={iframeRef}
      style={{ border: 0, width: '100%', height: '100%' }}
    />
  )
}
