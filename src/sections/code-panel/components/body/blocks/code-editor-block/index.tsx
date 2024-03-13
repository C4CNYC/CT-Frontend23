import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { Box, Collapse } from '@mui/material'
import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import { useDispatch } from 'react-redux'

import { type AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { setRoom } from '@/redux/slices/code-editor-controller'
import { useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'
import { UPDATE_COLORS } from '@root/src/sections/code-panel/lib/events/update-colors.event'
import { UPDATE_FONT_SIZE } from '@root/src/sections/code-panel/lib/events/update-font-size.event'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../base-block'

import { EditorMode } from './code-editor-collab/hook/constants'
import CodeEditorController from './code-editor-controller'
import Checkers from './elements/checkers-code-editor'
import { CodingSymbols, CodingTools } from './elements/coding-controls'
import MumuSpeedDial from './elements/mumu-speed-deal'

interface ICodeEditorBlock {
  user: AuthUserType | null
  code: string
  onChangeStreamingDocInfo: (doc: Record<string, string>) => void
  validations: Array<IValidation & BaseResponseInterface>
  preloadedCode: string
  isFetching?: boolean
}

const icon = (
  <BiCodeAlt
    size='20px'
    color='#43D4DD'
  />
)
const TYPING_DELEY = 20000
const FIRST_LOADING_DELEY = 15000
const MOBILE_HEIGHT = 80
const DESKTOP_HEIGHT = 145
const TIMEOUT = 1000

const CodeEditorBlock: FC<ICodeEditorBlock> = ({
  user,
  validations,
  code,
  onChangeStreamingDocInfo,
  preloadedCode,
  isFetching = false,
}) => {
  const translate = useTranslate()
  const TITLE = translate('code_editor')
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true)
  const [typing, setTyping] = useState<boolean | null>(null)
  const room = useSelector((state) => state.codeEditorController.room)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const timer = useRef<NodeJS.Timeout>()
  const codeRef = useRef(code)

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

  const onResetRoom = useCallback(() => {
    if (user && lessonId) {
      dispatch(
        setRoom({
          // roomId: user?.id as string,
          roomId: `${user?.id as string}_${lessonId as string}`,
          cursorText: user?.first_name as string,
          preloadedCode,
          code: codeRef.current,
          mode: EditorMode.Owner,
        })
      )
    }
  }, [user, lessonId, dispatch, preloadedCode])

  useEffect(() => {
    onResetRoom()
  }, [onResetRoom])

  return (
    <BaseBlock
      title={TITLE}
      icon={icon}
      className='codeEditorTour'
    >
      {/* <style>{getTitleStyles(isDesktop)}</style> */}
      <CodeEditorStyles isDesktop={isDesktop} />

      <MumuSpeedDial typing={typing} />

      {Boolean(validations?.length) && (
        <Checkers checkers={mapValidations(code ?? '', validations)} />
      )}

      <CodeEditorController
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        user={user}
        isFetching={isFetching}
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
    </BaseBlock>
  )
}

const CodeEditorStyles = ({ isDesktop }: { isDesktop: boolean }) => {
  const [color, setColor] = useState()
  const [bgColor, setBgcolor] = useState()
  const [fontSize, setFontSize] = useState()

  const colorListener = (data: any) => {
    setBgcolor(data?.detail?.background)
    setColor(data?.detail?.text)
  }

  const fontListener = (data: any) => {
    setFontSize(data?.detail?.size)
  }

  const subscribeSettings = (eventName: string, listener: (data: any) => void) => {
    window.addEventListener(eventName, listener)
  }

  const unsebscribeSettings = (eventName: string, listener: (data: any) => void) => {
    window.removeEventListener(eventName, listener)
  }

  useEffect(() => {
    subscribeSettings(UPDATE_COLORS, colorListener)
    subscribeSettings(UPDATE_FONT_SIZE, fontListener)
    return () => {
      unsebscribeSettings(UPDATE_COLORS, colorListener)
      unsebscribeSettings(UPDATE_FONT_SIZE, fontListener)
    }
  })

  return (
    <style>
      {`
        .cm-editor{
          height: calc(100vh - ${isDesktop ? DESKTOP_HEIGHT : MOBILE_HEIGHT}px)!important;
          background-color: ${bgColor};
        }
        .cm-gutter{
          background-color: ${bgColor};
        }
        .cm-gutterElement.cm-activeLineGutter{
          background-color: ${bgColor};
        }
        .cm-scroller::-webkit-scrollbar{
          width: 0px;
        }
        .cm-content{
          color: ${color};
          font-size: ${fontSize}px;
        }
      `}
    </style>
  )
}

export default memo(CodeEditorBlock)
