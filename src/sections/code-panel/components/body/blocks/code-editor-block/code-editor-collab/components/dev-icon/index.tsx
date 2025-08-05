import type { FC } from 'react'

import { FaFileCode } from '@react-icons/all-files/fa6/FaFileCode'
import CssIcon from 'react-devicons/css3/original'
import HtmlIcon from 'react-devicons/html5/original'
import JsIcon from 'react-devicons/javascript/original'

import { getFileExtension } from '@/utils/getFileExtension'

export enum SupportedExtensions {
  Css = 'css',
  Html = 'html',
  Js = 'js',
  Json = 'json',
}

interface DevIconProps {
  fileName: string
  sx?: Record<string, string>
}

const iconMap = {
  [SupportedExtensions.Html]: HtmlIcon,
  [SupportedExtensions.Css]: CssIcon,
  [SupportedExtensions.Js]: JsIcon,
  [SupportedExtensions.Json]: FaFileCode,
}

const DevIcon: FC<DevIconProps> = ({ fileName, sx }) => {
  const extension = getFileExtension(fileName) as SupportedExtensions | null

  if (extension == null || iconMap[extension] == null) {
    return null
  }

  const Component = iconMap[extension]

  return <Component style={sx} />
}

export default DevIcon
