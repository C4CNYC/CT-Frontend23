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

/** Student View for HTML based lessons */
export function BrowserViewHTML({
  isOpenHeader,
  iframeKey,
  stepBgColor,
  reloadIframe,
}: BrowserViewProps) {
  const { files, activeFile } = useFileManager()
  const { lesson } = useLessonManager()
  const { autoRun } = useCodePanel()
  const iFrameRef = useRef<HTMLIFrameElement>(null)
  const integrations = lesson?.integrations || []
  const debounceCallback = useDebounceCallback(500)
  const [previousIframeKey, setPreviousIframeKey] = useState<string | number | undefined>(iframeKey)

  const IFRAME_STYLE = {
    border: 0,
    width: '100%',
    height: iframeKey ? 'calc(100% - 42px)' : '100%',
    background: '#F8F8FF',
  }

  let document = useMemo(() => {
    if (files.length === 0) return

    let tests = files
      .filter((f) => f.extension === 'test')
      .map((f) => f.body)
      .join('\n')
    tests += `;
    function validateChecker(t,v){window.parent.postMessage({type: 'checker-validation',checkerId: t,valid: v},'*')}`
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
      // When autoRun is disabled, only update when iframeKey actually changes
      iFrameRef.current.srcdoc = generateHtml(document)
      setPreviousIframeKey(iframeKey)
    }
  }, [document, autoRun, iframeKey, previousIframeKey])

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
      style={IFRAME_STYLE}
    />
  )
}
