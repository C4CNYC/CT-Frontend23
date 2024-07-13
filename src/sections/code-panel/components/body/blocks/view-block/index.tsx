import { type FC, useEffect, useState } from 'react'

import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { TbArrowBarToRight } from '@react-icons/all-files/tb/TbArrowBarToRight'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { toggleBrowser } from '@/redux/slices/code-panel-global'
import { type RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'

import BaseBlock from '../base-block'

import BrowserView from './browser-view'

interface IViewBlock {
  document: string
}

const ViewBlock: FC<IViewBlock> = ({}) => {
  const dispatch = useDispatch()
  const query = useRouter().query
  const [document, setDocument] = useState<string>('')

  const socket = useSelector((state: RootState) => state.codePanelGlobal.socket)
  const roomId = useSelector((state: RootState) => state.codeEditorController.room?.roomId)
  const isBrowserHidden = useSelector((state: RootState) => state.codePanelGlobal.isBrowserHidden)
  const translate = useTranslate()

  const TITLE = translate('browser_preview')

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)

  const takeHeaderSettings = (isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }

  useEffect(() => {
    if (!roomId || !query.id) return

    fetch(
      `${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room/${roomId || query.id}/project/build`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((data: { body: string; htmlDataPresent: boolean }) => {
        if (data.htmlDataPresent) setDocument(data.body)
      })
  }, [roomId, query.id])

  useEffect(() => {
    if (socket == null) {
      return
    }

    socket.on('stream-file:room-project-updated', (data) => {
      if (data.htmlDataPresent) setDocument(data.body)
    })

    return () => {
      socket.off('stream-file:room-project-updated')
    }
  }, [socket])

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
      <BrowserView
        page={document}
        isOpenHeader={isOpenHeader}
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
