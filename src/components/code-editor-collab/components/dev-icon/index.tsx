import { type FC } from "react";

import CssIcon from "react-devicons/css3/original";
import HtmlIcon from "react-devicons/html5/original";
import JsIcon from "react-devicons/javascript/original";

import { getFileExtension } from "src/utils/getFileExtension";

export enum SupportedExtensions {
  Css = "css",
  Html = "html",
  Js = "js"
}

interface DevIconProps {
  fileName: string
  sx?: Record<string, string>
}

const iconMap = {
  [SupportedExtensions.Html]: HtmlIcon,
  [SupportedExtensions.Css]: CssIcon,
  [SupportedExtensions.Js]: JsIcon
}

const DevIcon: FC<DevIconProps> = ({
  fileName,
  sx
}) => {
  const extension = getFileExtension(fileName) as SupportedExtensions | null;

  if (extension == null || iconMap[extension] == null) {
    return null;
  }

  const Component = iconMap[extension];

  return <Component style={sx} />
}

export default DevIcon;