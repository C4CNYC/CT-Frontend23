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
