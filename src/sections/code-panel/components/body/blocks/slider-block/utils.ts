import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItContainer from 'markdown-it-container'
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
  const mdConverter = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
  mdConverter.use(markdownItAttrs)

  mdConverter.use(markdownItContainer, '', {
    validate: () => true,
    render(tokens: any, idx: number) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        return `<div class="${token.info.trim()}">\n`
      } else {
        return `</div>\n`
      }
    },
  })

  return mdConverter.render(md)
}

export const convertHtmlToMd = (html: string): string => {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  })

  turndown.addRule('wrapDivAsMdContainer', {
    filter: (node: any) =>
      node.nodeName === 'DIV' && (node as HTMLElement).classList?.contains('bg-welcome'),
    replacement: (content: any, node: any) => {
      const classList = Array.from((node as HTMLElement).classList).join(' ')
      return `\n::: ${classList}\n${content}\n:::\n`
    },
  })

  turndown.addRule('appendClassAsAttr', {
    filter: (node: any) =>
      ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'IMG'].includes(node.nodeName) &&
      (node as HTMLElement).classList?.length > 0,
    replacement: (content: any, node: any) => {
      const classList = Array.from((node as HTMLElement).classList).join('.')

      return `${content} {.${classList}}`
    },
  })

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

export const extractBodyContent = (html: string): string => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  return doc.body.innerHTML
}
