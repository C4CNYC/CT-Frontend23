import { useEffect, useMemo, useRef, useState } from 'react'

import { convertMdToHtml } from '../code-panel/components/body/blocks/slider-block/utils'
import { iframeSuppliments } from '../code-panel/components/body/blocks/view-block/browser-view/iframeSuppliments'
import {
  BrowserViewTeacherProps,
  CodeDocument,
  TagNames,
} from '../code-panel/components/body/blocks/view-block/browser-view/types'
import SkeletonViewBlock from '../code-panel/components/body/blocks/view-block/skeleton-view-box'

import { CheckersCompleated } from './CheckersCompleated'
import { useLessonManager } from './LessonManagerContext'
import { useLessonLoader } from './ServiceWorkerLoader'
import { useCheckers } from './useCheckers'

const getBody = (body: string, tagName: TagNames): string => `<${tagName}>${body}</${tagName}>`

export function BrowserViewTeacher({
  document,
  isOpenHeader,
  iframeKey,
  stepBgColor,
}: BrowserViewTeacherProps & { stepBgColor?: string }) {
  const [docSrc, setDocSrc] = useState('')
  const [iframeProcess, setIframeProcess] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const iFrameRef = useRef<HTMLIFrameElement>(null)
  useCheckers()
  useLessonLoader()
  const lessonManager = useLessonManager()
  let integrations = lessonManager.lesson?.integrations || []

  let lessonEditable = lessonManager.userIsOwner
  const generateHtml = (doc: CodeDocument) => {
    if (!doc) return ''
    const { htmlBody = [], cssBody = [], jsBody = [], mdBody = [] } = doc
    let integrationsScripts = integrations
      .map((integration) => integration.scripts)
      .filter(Boolean)
      .join('\n')

    let htmls = Array.isArray(htmlBody) ? htmlBody : [htmlBody]
    let htmlPart = (doc as any).length ? doc : htmls
    let docContentForRender

    if (mdBody && mdBody.length) {
      docContentForRender = convertMdToHtml((mdBody as string) || '')
    } else if (htmlPart && Array.isArray(htmlPart)) {
      docContentForRender = htmlPart
    } else {
      docContentForRender = '<h1>Hello World</h1>'
    }

    return `
      <html style="height: 100%; box-sizing: border-box;" id="VeryEditableDivId">
        <head>
        <link rel="stylesheet" href="/fonts/index.css" />
        <style>
          * { box-sizing: border-box; } 
        body { margin: 0; padding: 0; height: 100%; max-height: ${iframeKey ? '97%' : '100%'};}
        </style>
          ${getBody(cssBody as string, TagNames.Style)}
          ${integrationsScripts}
          <script> 
            if (document.getElementById('VeryEditableDivId')) {
              let debounceTimer;
              document.getElementById('VeryEditableDivId').addEventListener('input', function() {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                  window.parent.postMessage({ 
                    type: 'contentChange', 
                    content: this.innerHTML 
                  }, '*');
                }, 300);
              });
            }

            if (!window.__iframeSupplimentsLoaded) {
              window.__iframeSupplimentsLoaded = true;
              ${lessonEditable ? `(function(){ ${iframeSuppliments()} })();` : ''}
            }
        </script>
        </head>
        ${docContentForRender}
      </html>
    `
  }

  useEffect(() => {
    if (document == null) return
    if (isEditing) return

    setIframeProcess(true)
    const newHtml = generateHtml(document)
    setDocSrc(newHtml)
    const timerId = setTimeout(() => {
      setIframeProcess(false)
    }, 100)

    return () => {
      clearTimeout(timerId)
    }
  }, [document, isEditing])

  // Handle messages from iframe (including content changes)
  useEffect(() => {
    if (!lessonEditable) return
    const handleMessage = (event: MessageEvent) => {
      // console.log(event.data)
      if (event.data.type === 'contentChange') {
        setIsEditing(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [setIsEditing, document, lessonEditable])

  const IFrame = useMemo(() => (!iframeProcess ? '' : null), [docSrc, iframeProcess])

  if (!document) return <SkeletonViewBlock isOpenHeader={isOpenHeader} />

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {lessonManager.checkersAnimation.value && <CheckersCompleated />}
      <iframe
        className='BrowserViewTeacherView'
        ref={iFrameRef}
        srcDoc={docSrc}
        style={{
          border: 0,
          width: '100%',
          height: '100%',
        }}
        key={docSrc} // Key helps React decide when to recreate iframe
      />
    </div>
  )
}
