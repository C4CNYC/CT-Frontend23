import type { FC } from 'react'

import { FaFileCode } from '@react-icons/all-files/fa6/FaFileCode'
import CssIcon from 'react-devicons/css3/original'
import GoOriginalIcon from 'react-devicons/go/original'
import HtmlIcon from 'react-devicons/html5/original'
import JavaOriginalIcon from 'react-devicons/java/original'
import JsIcon from 'react-devicons/javascript/original'
import PythonOriginalIcon from 'react-devicons/python/original'

import { getFileExtension } from '@/utils/getFileExtension'

export enum SupportedExtensions {
  Css = 'css',
  Html = 'html',
  Js = 'js',
  Json = 'json',
  Py = 'py',
  Java = 'java',
  Go = 'go',
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
  [SupportedExtensions.Py]: PythonOriginalIcon,
  [SupportedExtensions.Java]: JavaOriginalIcon,
  [SupportedExtensions.Go]: GoOriginalIcon,
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
