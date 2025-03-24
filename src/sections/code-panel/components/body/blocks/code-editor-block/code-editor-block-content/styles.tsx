import { useEffect, useState } from 'react'

import { UPDATE_COLORS } from '@root/src/sections/code-panel/lib/events/update-colors.event'
import { UPDATE_FONT_SIZE } from '@root/src/sections/code-panel/lib/events/update-font-size.event'

const MOBILE_HEIGHT = 80
const DESKTOP_HEIGHT = 120

export const CodeEditorStyles = ({ isDesktop }: { isDesktop: boolean }) => {
  const [color, setColor] = useState()
  const [bgColor, setBgcolor] = useState()
  const [fontSize, setFontSize] = useState()

  const colorListener = (data: any) => {
    setBgcolor(data?.detail?.background)
    setColor(data?.detail?.text)
  }

  const fontListener = (data: any) => {
    setFontSize(data?.detail?.size)
  }

  const subscribeSettings = (eventName: string, listener: (data: any) => void) => {
    window.addEventListener(eventName, listener)
  }

  const unsebscribeSettings = (eventName: string, listener: (data: any) => void) => {
    window.removeEventListener(eventName, listener)
  }

  useEffect(() => {
    subscribeSettings(UPDATE_COLORS, colorListener)
    subscribeSettings(UPDATE_FONT_SIZE, fontListener)
    return () => {
      unsebscribeSettings(UPDATE_COLORS, colorListener)
      unsebscribeSettings(UPDATE_FONT_SIZE, fontListener)
    }
  })

  return (
    <style>
      {`
        .cm-editor{
          height: calc(100vh - ${isDesktop ? DESKTOP_HEIGHT : MOBILE_HEIGHT}px)!important;
          background-color: ${bgColor};
        }
        .cm-gutter{
          background-color: ${bgColor};
          color: ${color};
        }
        .cm-gutterElement.cm-activeLineGutter{
          background-color: ${bgColor};
        }
        .cm-scroller::-webkit-scrollbar{
          width: 0px;
        }
        .cm-content{
          color: ${color};
          font-size: ${fontSize}px;
        }
      `}
    </style>
  )
}
