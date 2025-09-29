import { marked } from 'marked'
import TurndownService from 'turndown'

import { ImageAttributes } from '@root/src/sections/dashboard/medias/MediaModal'

export const pasteToIframe = (content: any) => {
  let iFrame = document.querySelector('iframe.BrowserViewTeacherView') as
    | HTMLIFrameElement
    | undefined
  iFrame?.contentWindow?.postMessage({ type: 'simulatePaste', content: content }, '*')
}
export const handleEmojiSelect = (emoji: string) => pasteToIframe(emoji)

export const handleInsertImage = (image: ImageAttributes) =>
  pasteToIframe(
    `<img src="${image.src}" style="max-width: 100%; height: auto;" alt="${image.alt}"/>`
  )
export const handleInsertVideo = (url: string) => {
  pasteToIframe(url)
}

export const convertMdToHtml = (md: string) => {
  return marked(md)
}

export const convertHtmlToMd = (html: string): string => {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  })

  turndown.keep(['style'])

  turndown.addRule('keepYouTubeEmbed', {
    filter: (node: any) => {
      return node.nodeName === 'DIV' && (node as HTMLElement).classList?.contains('youtube-embed')
    },
    replacement: (content: any, node: any) => {
      return '\n' + (node as HTMLElement).outerHTML + '\n'
    },
  })

  turndown.addRule('keepImg', {
    filter: (node: any) => {
      return node.nodeName === 'IMG'
    },
    replacement: (content: any, node: any) => {
      return '\n' + (node as HTMLElement).outerHTML + '\n'
    },
  })

  return turndown.turndown(html)
}

export const stripHead = (html: string) => {
  return html.replace(/<head[\s\S]*?<\/head>/i, '')
}
