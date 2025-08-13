export interface CodeDocument {
  htmlBody?: string
  cssBody?: string
  jsBody?: string
}

export interface BrowserViewProps {
  isOpenHeader?: boolean
  iframeKey: number
  stepBgColor?: string
  reloadIframe?: () => void
}

export interface BrowserViewTeacherProps extends BrowserViewProps {
  document: CodeDocument
  teacherView?: boolean
}
export enum TagNames {
  Style = 'style',
  Script = 'script',
}
