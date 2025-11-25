import { useEffect, useMemo, useRef, useState } from 'react'

import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'

import { useDebounceCallback } from '@root/src/hooks/useDebounceCallback'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import { FileExtensions } from '@root/src/types/lessons'

import { useCodePanel } from '../../lib/CodePanelContext'
import { useFileManager } from '../body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import { BrowserViewProps, CodeDocument } from '../body/blocks/view-block/browser-view/types'
import SkeletonViewBlock from '../body/blocks/view-block/skeleton-view-box'

const emptyDoc = { htmlBody: '', cssBody: '', jsBody: '' } as CodeDocument

// Initialize markdown-it with attrs plugin
const md = new MarkdownIt()
md.use(markdownItAttrs)

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
      `
     //Validations
     console.logOld('Running Validations...');
      let checkCodeCheckers = []
      ` +
      validations
        .filter((v) => v.type === 'execute')
        .map(
          (v) => `
          // validator: ${v.name}
        checkCodeCheckers.push(()=>{
          let output = false;
          try{ output = eval(\`(()=>{${v.regex}})()\`); }catch(e){console.logOld(e);  output = false }
          validateChecker(\`${v.name}\`,  output )
        })  
        checkCodeCheckers.forEach(c=>c())
      `
        )
        .join('\n')
    //output, error,code ,

    let acc = files.reduce(
      (acc, file) => {
        switch (file.extension.toLowerCase()) {
          case FileExtensions.HTML:
            acc.htmlBody.push(file.body)
            break
          case FileExtensions.MD:
            acc.htmlBody.push('<div class="markdown-body">' + md.render(file.body || '') + '</div>')
            break
          case FileExtensions.CSS:
            file.body ? acc.cssBody.push(file.body) : null
            break
          case FileExtensions.JS:
            file.body ? acc.jsBody.push(`<script>${file.body}</script>`) : null
            break
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
        ${cssBody}
        </style>
          ${integrationsScripts}
          <script>
            console.logOld = console.log;
            let logsOutput = [];
            let logsError = [];
            consolelog = (type)=>function() {
              switch(type){
                case 'error': logsError.push([...arguments]); break;
                case 'log':
                case 'output': logsOutput.push([...arguments]); break;
                }
              window.parent.postMessage({ type: 'ConsoleLog', message: JSON.stringify(arguments) }, '*');
            };
            console.log = consolelog('log');
            console.warn = consolelog('warn');
            console.error = consolelog('error');
            console.debug = consolelog('debug');              
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
        height: '100%',
        background: '#F8F8FF',
      }}
    />
  )
}
