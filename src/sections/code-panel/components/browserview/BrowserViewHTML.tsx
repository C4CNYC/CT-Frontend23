import { useEffect, useMemo, useRef, useState } from 'react'

import { useDebounceCallback } from '@root/src/hooks/useDebounceCallback'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'

import { useCodePanel } from '../../lib/CodePanelContext'
import { useFileManager } from '../body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import {
  BrowserViewProps,
  CodeDocument,
  TagNames,
} from '../body/blocks/view-block/browser-view/types'
import SkeletonViewBlock from '../body/blocks/view-block/skeleton-view-box'

const getBody = (body: string, tagName: TagNames): string => `<${tagName}>${body}</${tagName}>`
const emptyDoc = { htmlBody: '', cssBody: '', jsBody: '' } as CodeDocument

/** Student View for HTML based lessons */
export function BrowserViewHTML({
  isOpenHeader,
  iframeKey,
  stepBgColor,
  reloadIframe,
}: BrowserViewProps) {
  const { files } = useFileManager()
  const { lesson, lessonContent, currentSlideId } = useLessonManager()
  const { autoRun } = useCodePanel()
  const iFrameRef = useRef<HTMLIFrameElement>(null)
  const integrations = lesson?.integrations || []
  const debounceCallback = useDebounceCallback(500)
  const [previousIframeKey, setPreviousIframeKey] = useState<string | number | undefined>(iframeKey)
  let validations = lessonContent?.find((lc) => lc.id == currentSlideId)?.validations || []

  let document = useMemo(() => {
    if (files.length === 0) return emptyDoc

    let tests = `;
    function validateChecker(t,v,type='checker-validation'){
      window.parent.postMessage({type,checkerId: t,valid: v},'*')
    }`
    tests +=
      `\n //Test Files \n ` +
      files
        .filter((f) => f.extension === 'test')
        .map((f) => f.body)
        .join('\n')
    tests +=
      '\n //Validations \n ' +
      validations
        .filter((v) => v.type === 'code')
        .map(
          (v) => `
      validateChecker(\`${v.name}\`, ${v.regex} )
      `
        )
        .join('\n')
    //output, error,code ,

    let acc = files.reduce(
      (acc, file) => {
        if (file.extension === 'html') {
          acc.htmlBody.push(file.body)
        } else if (file.extension === 'css') {
          file.body ? acc.cssBody.push(`<style>${file.body}</style>`) : null
        } else if (file.extension === 'js') {
          file.body ? acc.jsBody.push(`<script>${file.body}</script>`) : null
        }
        return acc
      },
      { htmlBody: [] as string[], cssBody: [] as string[], jsBody: [] as string[] }
    )
    acc.jsBody.push(`<script>${tests}</script>`)
    return {
      htmlBody: acc.htmlBody.join('\n'),
      cssBody: acc.cssBody.join('\n'),
      jsBody: acc.jsBody.join('\n'),
    }
  }, [files])

  useEffect(() => {
    if (!iFrameRef.current) return
    if (!document) return

    if (autoRun) {
      debounceCallback(() => {
        iFrameRef.current!.srcdoc = generateHtml(document)
      })
    } else if (iframeKey !== previousIframeKey) {
      // if autoRun is disabled
      iFrameRef.current.srcdoc = generateHtml(document)
      setPreviousIframeKey(iframeKey)
    }
  }, [document, autoRun, iframeKey, previousIframeKey])

  const generateHtml = (doc: CodeDocument) => {
    const {
      htmlBody = [],
      cssBody = [],
      jsBody = [],
    } = doc || { htmlBody: '', cssBody: '', jsBody: '' }
    let integrationsScripts = integrations
      .map((integration) => integration.scripts)
      .filter(Boolean)
      .join('\n')

    let htmls = Array.isArray(htmlBody) ? htmlBody : [htmlBody]
    let htmlPart = (doc as any).length ? doc : htmls

    return `
      <html 
      style="height: 100%; box-sizing: border-box;" >
        <head>
        <link rel="stylesheet" href="/fonts/index.css" />
        <style>
          * { box-sizing: border-box; } 
        body { margin: 0; padding: 0; height: 100%; max-height: ${iframeKey ? '97%' : '100%'}; }
        </style>
          ${getBody(cssBody as string, TagNames.Style)}
          ${integrationsScripts}
          <script>
            console.logOld = console.log;
            consolelog = function() {
              window.parent.postMessage({ type: 'ConsoleLog', message: JSON.stringify(arguments) }, '*');
            };
            console.log = consolelog;
            console.warn = consolelog;
            console.error = consolelog;
            console.debug = consolelog;              
          </script>
        </head>
        ${htmlPart}
        ${jsBody}
      </html>
    `
  }

  if (!document) return <SkeletonViewBlock isOpenHeader={isOpenHeader} />

  return (
    <iframe
      className='BrowserView'
      ref={iFrameRef}
      style={{
        border: 0,
        width: '100%',
        height: iframeKey ? 'calc(100% - 42px)' : '100%',
        background: '#F8F8FF',
      }}
    />
  )
}
