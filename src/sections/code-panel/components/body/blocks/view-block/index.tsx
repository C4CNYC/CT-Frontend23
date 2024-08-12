import { type FC, useState } from 'react'

import ReplayIcon from '@mui/icons-material/Replay'
import { IconButton } from '@mui/material'
import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { TbArrowBarToRight } from '@react-icons/all-files/tb/TbArrowBarToRight'
import { useDispatch, useSelector } from 'react-redux'

import { toggleBrowser } from '@/redux/slices/code-panel-global'
import { type RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'

import BaseBlock from '../base-block'

import BrowserView, { CodeDocument } from './browser-view'
interface IViewBlock {
  document: CodeDocument | null
}

const ViewBlock: FC<IViewBlock> = ({ document }) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state: RootState) => state.codePanelGlobal.isBrowserHidden)
  const translate = useTranslate()

  const TITLE = translate('browser_preview')

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)
  const [iframeKey, setIframeKey] = useState<number>(0)

  const takeHeaderSettings = (isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }

  const reloadIffame = () => {
    setIframeKey(iframeKey + 1)
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
      {document ? (
        <IconButton
          onClick={reloadIffame}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'rgba(179, 96, 96, .5)',
            borderRadius: '0 0 0 20px',
          }}
        >
          <ReplayIcon />
        </IconButton>
      ) : null}

      <BrowserView
        document={document}
        isOpenHeader={isOpenHeader}
        iframeKey={iframeKey}
      />
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
