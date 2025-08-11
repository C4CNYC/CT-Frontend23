import { useContext, useState, useEffect } from 'react'

import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { TbArrowBarToRight } from '@react-icons/all-files/tb/TbArrowBarToRight'
import { useDispatch, useSelector } from 'react-redux'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { toggleBrowser } from '@/redux/slices/code-panel-global'
import { type RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import BaseBlock from '../body/blocks/base-block'
import PreviewControls from '../body/blocks/view-block/browser-view/preview-controls'
import { CodeDocument } from '../body/blocks/view-block/browser-view/types'
import ConsoleBlock from '../body/blocks/view-block/console-block'

interface IViewBlock {
  children?: React.ReactNode
  document: CodeDocument | null
  reloadBrowserView?: () => void
  integrations: IIntegration[]
}

export function ViewBlock({ children, document, reloadBrowserView, integrations }: IViewBlock) {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state: RootState) => state.codePanelGlobal.isBrowserHidden)
  const translate = useTranslate()

  const codePanelContext = useContext(CodePanelContext)

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)
  const [iframeKey, setIframeKey] = useState<number>(0)

  const takeHeaderSettings = (isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }

  const reloadIframe = () => {
    setIframeKey((prevIframeKey) => prevIframeKey + 1)
    if (reloadBrowserView) {
      reloadBrowserView()
    }
  }

  useEffect(() => {
    if (document) {
      reloadIframe()
    }
  }, [document?.htmlBody])

  if (isBrowserHidden) {
    return null
  }
  return (
    <BaseBlock
      closeIcon={<TbArrowBarToRight size={20} />}
      title={translate('browser_preview')}
      icon={icon}
      className='browserTour'
      hideTabsHandler={() => {
        dispatch(toggleBrowser(true))
      }}
      takeHeaderSettings={takeHeaderSettings}
    >
      {!codePanelContext.autoRun && <PreviewControls reloadIframe={reloadIframe} />}
      {children}
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
