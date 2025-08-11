import { IIntegration } from '@/redux/services/interfaces/integration.interface'
export interface CodeDocument {
  htmlBody?: string
  cssBody?: string
  jsBody?: string
}

export interface BrowserViewProps {
  document: CodeDocument | null
  integrations: IIntegration[]
  isOpenHeader?: boolean
  iframeKey: number
  stepBgColor?: string
  reloadIframe?: () => void
  teacherView?: boolean
}

export enum TagNames {
  Style = 'style',
  Script = 'script',
}
