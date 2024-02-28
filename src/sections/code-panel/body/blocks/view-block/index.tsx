import { type FC, useState } from 'react'

import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { TbArrowBarToRight } from '@react-icons/all-files/tb/TbArrowBarToRight'
import { useDispatch, useSelector } from 'react-redux'

import { toggleBrowser } from '@/redux/slices/code-panel-global'
import { type RootState } from '@/redux/store'
import { CodeDocument } from '@/types/code-document'
import { useTranslate } from '@/utils/translateHelper'

import BlockWrapper from '../block-wrapper'

import BrowserView from './browser-view'

interface IViewBlock {
  document?: CodeDocument
}

const ViewBlock: FC<IViewBlock> = ({ document }) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state: RootState) => state.codePanelGlobal.isBrowserHidden)
  const translate = useTranslate()

  const TITLE = translate('browser_preview')

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)

  const takeHeaderSettings = (isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }

  if (isBrowserHidden) {
    return null
  }

  return (
    <BlockWrapper
      closeIcon={<TbArrowBarToRight size={20} />}
      title={TITLE}
      icon={
        <CgBrowser
          size='20px'
          color='#43D4DD'
        />
      }
      className='browserTour'
      hideTabsHandler={() => {
        dispatch(toggleBrowser(true))
      }}
      takeHeaderSettings={takeHeaderSettings}
    >
      <BrowserView
        document={document}
        isOpenHeader={isOpenHeader}
      />
    </BlockWrapper>
  )
}

export default ViewBlock
