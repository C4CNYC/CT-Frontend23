import { useContext, useState } from 'react'

import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { TbArrowBarToRight } from '@react-icons/all-files/tb/TbArrowBarToRight'
import { useDispatch, useSelector } from 'react-redux'

import { toggleBrowser } from '@/redux/slices/code-panel-global'
import { type RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import { BrowserView } from '../../../browserview/BrowserView'
import BaseBlock from '../base-block'

import PreviewControls from './browser-view/preview-controls'
import ConsoleBlock from './console-block'

export function ViewBlock() {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state: RootState) => state.codePanelGlobal.isBrowserHidden)
  const translate = useTranslate()
  const codePanelContext = useContext(CodePanelContext)
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)
  const [iframeKey, setIframeKey] = useState<number>(0)
  if (isBrowserHidden) {
    return null
  }
  return (
    <BaseBlock
      closeIcon={<TbArrowBarToRight size={20} />}
      title={translate('browser_preview')}
      icon={
        <CgBrowser
          size='20px'
          color='#43D4DD'
        />
      }
      className='browserTour'
      hideTabsHandler={() => dispatch(toggleBrowser(true))}
      takeHeaderSettings={setIsOpenHeader}
    >
      {!codePanelContext.autoRun && (
        <PreviewControls reloadIframe={() => setIframeKey((k) => k + 1)} />
      )}
      <BrowserView
        isOpenHeader={isOpenHeader}
        iframeKey={iframeKey + codePanelContext.reloadIframeKey}
      />
      <ConsoleBlock />
    </BaseBlock>
  )
}
