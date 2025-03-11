import { type FC, useEffect, useMemo, useState } from 'react'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'

import SkeletonViewBlock from '../skeleton-view-box'

export interface CodeDocument {
  htmlBody?: string
  cssBody?: string
  jsBody?: string
}

interface BrowserViewProps {
  document: CodeDocument | null
  integrations: IIntegration[]
  isOpenHeader?: boolean
  iframeKey?: number
  stepBgColor?: string
  reloadIframe?: () => void
}

enum TagNames {
  Style = 'style',
  Script = 'script',
}

const getBody = (body: string, tagName: TagNames): string =>
  `
    <${tagName}>
      ${body}
    </${tagName}>
  `

const BrowserView: FC<BrowserViewProps> = ({
  document,
  isOpenHeader,
  iframeKey,
  stepBgColor,
  integrations,
  reloadIframe,
}) => {
  const [docSrc, setDocSrc] = useState('')
  const [iframeProcess, setIframeProcess] = useState(false)

  const IFRAME_STYLE = {
    border: 0,
    width: '100%',
    height: iframeKey ? 'calc(100% - 32px)' : '100%',
    background: '#fff',
  }

  useEffect(() => {
    if (document == null) {
      return
    }

    setIframeProcess(true)

    const fontPath = '/fonts/index.css'
    const fontCssLink = `<link rel="stylesheet" href="${fontPath}">
    <style>* {   box-sizing: border-box; } body { margin: 0; padding: 0; 
  height: 100%; 
  max-height: ${iframeKey ? '97%' : '100%'}; }</style>`
    const { htmlBody = [], cssBody = [], jsBody = [] } = document
    let integrationsScripts = integrations
      .map((integration) => integration.scripts)
      .filter(Boolean)
      .join('\n')
    let htmls = Array.isArray(htmlBody) ? htmlBody : [htmlBody]
    htmls = htmls //.map((b) => b.replace(/<body\s/g, '<div ').replace(/<\/body>/g, '</div>'))
    let htmlPart = false ? (
      <body
        style={{ height: '100vh', margin: 0, padding: 0 }}
        id='pageLesson'
      >
        <div
          className='lesson-page '
          style={{ backgroundColor: stepBgColor ? stepBgColor : '' }}
        >
          {(document as any).length ? (document as any) : htmls}
        </div>
      </body>
    ) : (document as any).length ? (
      document
    ) : (
      htmls
    )

    setDocSrc(`
      <html style="height: 100%; box-sizing: border-box;">
        <head>
          ${fontCssLink}
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
      </html>
    `)

    setTimeout(() => {
      setIframeProcess(false)
    }, 100)
  }, [document])

  const IFrame = useMemo(
    () =>
      !iframeProcess ? (
        <iframe
          srcDoc={docSrc}
          style={IFRAME_STYLE}
        />
      ) : null,
    [docSrc, iframeProcess]
  )

  return document ? IFrame : <SkeletonViewBlock isOpenHeader={isOpenHeader} />
}

export default BrowserView
