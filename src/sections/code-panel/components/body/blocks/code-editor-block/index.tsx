import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { Box, Collapse } from '@mui/material'
import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { type AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../base-block'

import CodeEditorController from './code-editor-controller'
import { CodeEditorStyles } from './CodeEditorStyles'
import Checkers from './elements/checkers-code-editor'
import { CodingSymbols, CodingTools } from './elements/coding-controls'
import DesktopQuickKeys from './elements/desktop-quick-keys/DesktopQuickKeys'
import MumuSpeedDial from './elements/mumu-speed-deal'

interface ICodeEditorBlock {
  user: AuthUserType | null
  code: string
  onChangeStreamingDocInfo: (doc: string) => void
  validations: Array<IValidation & BaseResponseInterface>
  preloadedCode: string
  isFetching?: boolean
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
  code,
  user,
  contentId,
  validations,
  preloadedCode,
  onChangeStreamingDocInfo,
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const translate = useTranslate()
  const [typing, setTyping] = useState<boolean | null>(null)
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true)

  const codeRef = useRef(code)
  const timer = useRef<NodeJS.Timeout>()

  const TITLE = translate('code_editor')
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)

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

  const selectedContent = contentValidations?.find((item) => item.contentId === contentId)
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
              : mapValidations(code ?? '', validations)
          }
          isCheckedOnce={!!selectedContent?.checkers?.length}
        />
      )}

      <CodeEditorController
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        preloadedCode={preloadedCode}
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
