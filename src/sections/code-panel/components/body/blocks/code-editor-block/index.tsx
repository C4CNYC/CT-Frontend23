import { type FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { type AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { setRoom } from '@/redux/slices/code-editor-controller'
import { useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'
import useMobileKeyboard from '@root/src/hooks/useMobileKeyboard'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../base-block'

import { EditorMode } from './code-editor-collab/hook/constants'
import CodeEditorController from './code-editor-controller'
import { CodeEditorStyles } from './CodeEditorStyles'
import Checkers from './elements/checkers-code-editor'
import MumuSpeedDial from './elements/mumu-speed-deal'
import QuickKeys from './elements/quick-keys/QuickKeys'

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
const OPEN_POPOVER_DELAY = 15000
const CLOSE_POPOVER_DELAY = 4000

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
  const { isKeyboardOpen, keyboardHeight } = useMobileKeyboard()

  const codeRef = useRef(code)
  const openPopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const closePopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const [isOpenPopover, setIsOpenPopover] = useState<boolean | null>(null)

  const codeState = useSelector((state) => state.codePanelGlobal.code)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)

  const selectedContent = useMemo(
    () => contentValidations?.find((item) => item.contentId === contentId),
    [contentId, contentValidations]
  )

  const onResetRoom = useCallback(() => {
    let roomId = `${user?.id as string}_${(query?.lessonId as string) ?? lessonId}`
    if (user && lessonId) {
      dispatch(
        setRoom({
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
    onResetRoom()
  }, [onResetRoom])

  useEffect(() => {
    openPopoverTimer.current = setTimeout(() => {
      setIsOpenPopover(true)

      closePopoverTimer.current = setTimeout(() => {
        setIsOpenPopover(false)
      }, CLOSE_POPOVER_DELAY)
    }, OPEN_POPOVER_DELAY)

    return () => {
      if (openPopoverTimer.current) clearTimeout(openPopoverTimer.current)
      if (closePopoverTimer.current) clearTimeout(closePopoverTimer.current)
    }
  }, [])

  return (
    <BaseBlock
      title={translate('code_editor')}
      icon={icon}
      className='codeEditorTour'
    >
      <CodeEditorStyles isDesktop={isDesktop} />

      <MumuSpeedDial
        openPopover={isOpenPopover}
        contentId={contentId}
      />

      {Boolean(validations?.length) && Boolean(selectedContent) && (
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
      {isDesktop ? (
        <QuickKeys />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: isKeyboardOpen ? `${Math.abs(keyboardHeight)}px` : 0,
            transition: 'bottom .2s easy-out',
          }}
        >
          <Typography
            zIndex={4000}
            color={'red'}
            pl={2}
          ></Typography>
          <QuickKeys />
        </Box>
      )}
    </BaseBlock>
  )
}

export default memo(CodeEditorBlock)
