import { type FC, useEffect, useMemo, useRef, useState } from 'react'

import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'

import SkeletonViewBlock from '../skeleton-view-box'

import { iframeSuppliments } from './iframeSuppliments'
import { BrowserViewProps, CodeDocument, TagNames } from './types'

const getBody = (body: string, tagName: TagNames): string => `<${tagName}>${body}</${tagName}>`

const BrowserView: FC<BrowserViewProps> = ({
  document,
  isOpenHeader,
  iframeKey,
  stepBgColor,
  integrations,
  reloadIframe,
  teacherView = false,
}) => {
  const [docSrc, setDocSrc] = useState('')
  const [iframeProcess, setIframeProcess] = useState(false)
  const [isEditing, setIsEditing] = useState(false) // Track if user is editing
  const lessonManager = useLessonManager()
  const iFrameRef = useRef<HTMLIFrameElement>(null)

  const IFRAME_STYLE = {
    border: 0,
    width: '100%',
    height: iframeKey ? 'calc(100% - 42px)' : '100%',
    background: 'rgb(234 234 235 / 79%)',
  }
  let lessonEditable = lessonManager.userIsOwner && teacherView

  // Generate the initial HTML content
  const generateHtml = (doc: CodeDocument) => {
    if (!doc) return ''

    const { htmlBody = [], cssBody = [], jsBody = [] } = doc
    let integrationsScripts = integrations
      .map((integration) => integration.scripts)
      .filter(Boolean)
      .join('\n')

    let htmls = Array.isArray(htmlBody) ? htmlBody : [htmlBody]
    let htmlPart = (doc as any).length ? doc : htmls

    return `
      <html style="height: 100%; box-sizing: border-box;" ${
        lessonEditable ? 'contentEditable id="VeryEditableDivId"' : ''
      }>
        <head>
        <link rel="stylesheet" href="/fonts/index.css" />
        <style>
          * { box-sizing: border-box; } 
        body { margin: 0; padding: 0; height: 100%; max-height: ${iframeKey ? '97%' : '100%'}; }
        </style>
          ${getBody(cssBody as string, TagNames.Style)}
          ${integrationsScripts}
          <script>
            ${
              teacherView
                ? ``
                : `
            console.logOld = console.log;
            consolelog = function() {
              window.parent.postMessage({ type: 'ConsoleLog', message: JSON.stringify(arguments) }, '*');
            };
            console.log = consolelog;
            console.warn = consolelog;
            console.error = consolelog;
            console.debug = consolelog;
            `
            }

            // Only add event listener if contentEditable
            if (document.getElementById('VeryEditableDivId')) {
              let debounceTimer;
              let dbT= new Date().getTime();
              document.getElementById('VeryEditableDivId').addEventListener('input', function() {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                  window.parent.postMessage({ 
                    type: 'contentChange', 
                    content: this.innerHTML 
                  }, '*');
                }, 300); // Debounce to avoid excessive updates
              });
            }
            if (!window.__iframeSupplimentsLoaded) {
              window.__iframeSupplimentsLoaded = true;
              ${lessonEditable ? iframeSuppliments() : null}
            }
          </script>
        </head>
        ${htmlPart}
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
      if (event.data.type === 'contentChange') {
        setIsEditing(true)
        // Here you would typically update your state/store with the new content
        // For now, we just prevent the iframe from re-rendering
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [setIsEditing, document, lessonEditable])

  const IFrame = useMemo(
    () =>
      !iframeProcess ? (
        <iframe
          className={teacherView ? 'BrowserViewTeacherView' : 'BrowserView'}
          ref={iFrameRef}
          srcDoc={docSrc}
          style={IFRAME_STYLE}
          key={docSrc} // Key helps React decide when to recreate iframe
        />
      ) : null,
    [docSrc, iframeProcess]
  )

  if (!document) return <SkeletonViewBlock isOpenHeader={isOpenHeader} />

  return IFrame
}

export default BrowserView
