import { type FC, useContext, useState } from 'react'

import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { TbArrowBarToRight } from '@react-icons/all-files/tb/TbArrowBarToRight'
import { useDispatch, useSelector } from 'react-redux'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { toggleBrowser } from '@/redux/slices/code-panel-global'
import { type RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import BaseBlock from '../base-block'

import BrowserView, { CodeDocument } from './browser-view'
import PreviewControls from './browser-view/preview-controls'
import ConsoleBlock from './console-block'

interface IViewBlock {
  document: CodeDocument | null
  reloadBrowserView?: () => void
  integrations: IIntegration[]
}

const ViewBlock: FC<IViewBlock> = ({ document, reloadBrowserView, integrations }) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state: RootState) => state.codePanelGlobal.isBrowserHidden)
  const translate = useTranslate()

  const TITLE = translate('browser_preview')
  const codePanelContext = useContext(CodePanelContext)

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)
  const [iframeKey, setIframeKey] = useState<number>(0)

  const takeHeaderSettings = (isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }

  const reloadIframe = () => {
    setIframeKey(iframeKey + 1)
    if (reloadBrowserView) {
      reloadBrowserView()
    }
  }

  if (isBrowserHidden) {
    return null
  }
  return (
    <BaseBlock
      closeIcon={<TbArrowBarToRight size={20} />}
      title={TITLE}
      icon={icon}
      className='browserTour'
      hideTabsHandler={() => {
        dispatch(toggleBrowser(true))
      }}
      takeHeaderSettings={takeHeaderSettings}
    >
      {!codePanelContext.autoRun && <PreviewControls reloadIframe={reloadIframe} />}

      <BrowserView
        document={document}
        integrations={integrations}
        isOpenHeader={isOpenHeader}
        iframeKey={iframeKey + codePanelContext.reloadIframeKey}
      />
      <ConsoleBlock />
    </BaseBlock>
  )
}

const icon = (
  <CgBrowser
    size='20px'
    color='#43D4DD'
  />
)

export default ViewBlock
