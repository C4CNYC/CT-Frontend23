import { useFileManager } from '../body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import { BrowserViewProps } from '../body/blocks/view-block/browser-view/types'

import { BrowserViewEx } from './BroswerViewEx'
import { BrowserViewHTML } from './BrowserViewHTML'

export function BrowserView({
  document,
  isOpenHeader,
  iframeKey,
  stepBgColor,
  integrations,
  reloadIframe,
  teacherView = false,
}: BrowserViewProps) {
  const { files } = useFileManager()

  let fileExtensions = files.map((file) => file.extension.toLowerCase())
  if (fileExtensions.includes('py') || fileExtensions.includes('java'))
    return (
      <BrowserViewEx
        document={document}
        iframeKey={iframeKey}
      />
    )
  return (
    <BrowserViewHTML
      document={document}
      integrations={integrations}
      isOpenHeader={isOpenHeader}
      iframeKey={iframeKey}
    />
  )
}
