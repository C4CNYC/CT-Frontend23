import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { Box, Collapse } from '@mui/material'
import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import { useDispatch } from 'react-redux'

import { type AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { setRoom } from '@/redux/slices/code-editor-controller'
import { useSelector } from '@/redux/store'
import { EditorMode } from '@/sections/code-panel/code-editor/lib/hooks/constants'
import getRoomId from '@/sections/code-panel/lib/utils/getRoomId'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'

import BlockWrapper from '../block-wrapper'

import CodeEditorController from './code-editor-controller'
import Checkers from './elements/checkers-code-editor'
import { CodingSymbols, CodingTools } from './elements/coding-controls'
import MumuSpeedDial from './elements/mumu-speed-deal'
import Title from './elements/title'

interface ICodeEditorBlock {
  user: AuthUserType | null
  code: string
  validations: Array<IValidation & BaseResponseInterface>
  preloadedCode: string
  isFetchingLessonContent?: boolean
}

const TYPING_DELEY = 20000
const FIRST_LOADING_DELEY = 15000
const MOBILE_HEIGHT = 80
const DESKTOP_HEIGHT = 145
const TIMEOUT = 1000

const CodeEditorBlock: FC<ICodeEditorBlock> = ({
  user,
  validations,
  code,
  preloadedCode,
  isFetchingLessonContent = false,
}) => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true)
  const [typing, setTyping] = useState<boolean | null>(null)
  const room = useSelector((state) => state.codeEditorController.room)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const timer = useRef<NodeJS.Timeout>()

  const typingListener = (delay: number, firstLoad: boolean): void => {
    if (!firstLoad) {
      setTyping(false)
    }

    if (timer.current != null) {
      clearInterval(timer.current)
    }

    timer.current = setInterval(() => {
      setTyping(true)
    }, delay)
  }

  useEffect(() => {
    typingListener(FIRST_LOADING_DELEY, true)
  }, [])

  useEffect(() => {
    if (code) {
      typingListener(TYPING_DELEY, false)
    }
  }, [code])

  const symbolsHandler = useCallback((): void => {
    setCodingSymbols(!codingSymbols)
  }, [codingSymbols])

  const initRoom = useCallback(() => {
    if (user && lessonId) {
      dispatch(
        setRoom({
          roomId: getRoomId(user?.id, lessonId),
          cursorText: user?.first_name as string,
          preloadedCode,
          code,
          mode: EditorMode.Owner,
        })
      )
    }
  }, [user, lessonId, dispatch, preloadedCode])

  useEffect(() => {
    initRoom()
  }, [initRoom])

  return (
    <BlockWrapper
      title={
        <Title
          room={room}
          resetRoom={initRoom}
        />
      }
      icon={
        <BiCodeAlt
          size='20px'
          color='#43D4DD'
        />
      }
      className='codeEditorTour'
    >
      <style>{getTitleStyles(isDesktop)}</style>

      <MumuSpeedDial typing={typing} />

      {Boolean(validations?.length) && (
        <Checkers checkers={mapValidations(code ?? '', validations)} />
      )}

      <CodeEditorController
        user={user}
        isFetchingLessonContent={isFetchingLessonContent}
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
    </BlockWrapper>
  )
}

const getTitleStyles = (isDesktop: boolean): string => {
  return `
  .cm-editor{
    height: calc(100vh - ${isDesktop ? DESKTOP_HEIGHT : MOBILE_HEIGHT}px)!important;
  }
  .cm-scroller::-webkit-scrollbar{
    width: 0px;
  }

`
}

export default memo(CodeEditorBlock)
