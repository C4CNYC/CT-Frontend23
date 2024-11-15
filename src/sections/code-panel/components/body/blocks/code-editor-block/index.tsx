import { type FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box, Collapse } from '@mui/material'
import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import { type AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { setRoom } from '@/redux/slices/code-editor-controller'
import { useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../base-block'

import { EditorMode } from './code-editor-collab/hook/constants'
import { waitConnectSocket } from './code-editor-collab/hook/utils/socket'
import CodeEditorController from './code-editor-controller'
import { CodeEditorStyles } from './CodeEditorStyles'
import Checkers from './elements/checkers-code-editor'
import { CodingSymbols, CodingTools } from './elements/coding-controls'
import DesktopQuickKeys from './elements/desktop-quick-keys/DesktopQuickKeys'
import MumuSpeedDial from './elements/mumu-speed-deal'

interface ICodeEditorBlock {
  user: AuthUserType | null
  code: string
  onChangeStreamingDocInfo: (doc: Record<string, string>) => void
  validations: Array<IValidation & BaseResponseInterface>
  preloadedCode: string
  contentId?: string
}

const icon = (
  <BiCodeAlt
    size='20px'
    color='#43D4DD'
  />
)
const TYPING_DELEY = 20000
const FIRST_LOADING_DELEY = 15000
const TIMEOUT = 1000

const CodeEditorBlock: FC<ICodeEditorBlock> = ({
  user,
  validations,
  code,
  onChangeStreamingDocInfo,
  preloadedCode,
  contentId,
}) => {
  const { query } = useRouter()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const translate = useTranslate()

  const codeRef = useRef(code)
  const timer = useRef<NodeJS.Timeout>()
  const [typing, setTyping] = useState<boolean | null>(null)
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true)

  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const codeState = useSelector((state) => state.codePanelGlobal.code)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)

  const TITLE = translate('code_editor')

  const typingListener = (deley: number, firstLoad: boolean): void => {
    if (!firstLoad) {
      setTyping(false)
    }

    if (timer.current != null) {
      clearInterval(timer.current)
    }

    timer.current = setInterval(() => {
      setTyping(true)
    }, deley)
  }

  const symbolsHandler = useCallback((): void => {
    setCodingSymbols(!codingSymbols)
  }, [codingSymbols])

  const onResetRoom = useCallback(() => {
    let roomId = `${user?.id as string}_${(query?.lessonId as string) ?? lessonId}`
    if (user && lessonId) {
      dispatch(
        setRoom({
          // roomId: user?.id as string,
          roomId: roomId,
          cursorText: user?.first_name as string,
          preloadedCode,
          code: codeRef.current,
          mode: EditorMode.Owner,
        })
      )
    }
  }, [user, lessonId, dispatch, preloadedCode, query?.lessonId])

  useEffect(() => {
    const runAsyncEffect = async (socket: Socket) => {
      const isConnected = await waitConnectSocket(socket)

      if (!isConnected) {
        void runAsyncEffect(socket)
      }
    }

    if (socket && !socket.connected) {
      void runAsyncEffect(socket)
    }
  }, [socket])

  useEffect(() => {
    if (code) {
      typingListener(TYPING_DELEY, false)
    }
  }, [code])

  useEffect(() => {
    onResetRoom()
  }, [onResetRoom])

  const selectedContent = useMemo(
    () => contentValidations?.find((item) => item.contentId === contentId),
    [contentId, contentValidations]
  )
  return (
    <BaseBlock
      title={TITLE}
      icon={icon}
      className='codeEditorTour'
    >
      <CodeEditorStyles isDesktop={isDesktop} />

      <MumuSpeedDial
        typing={typing}
        contentId={contentId}
      />

      {Boolean(validations?.length) && (
        <Checkers
          contentId={contentId}
          checkers={
            selectedContent?.checkers?.length
              ? selectedContent?.checkers
              : mapValidations(codeState ?? '', validations)
          }
          isCheckedOnce={!!selectedContent?.checkers?.length}
        />
      )}

      <CodeEditorController
        preloadedCode={preloadedCode}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        user={user}
      />

      <Box sx={{ display: isDesktop ? 'none' : 'block' }}>
        <Collapse
          in={codingSymbols}
          timeout={!codingSymbols ? 0 : TIMEOUT}
        >
          <CodingSymbols symbolsHandler={symbolsHandler} />
        </Collapse>

        <Collapse
          in={!codingSymbols}
          timeout={codingSymbols ? 0 : TIMEOUT}
        >
          <CodingTools symbolsHandler={symbolsHandler} />
        </Collapse>
      </Box>
      <DesktopQuickKeys />
    </BaseBlock>
  )
}

export default memo(CodeEditorBlock)
