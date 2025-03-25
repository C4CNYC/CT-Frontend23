import { type FC, memo, useEffect, useMemo, useRef, useState } from 'react'

import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'

import CodeEditorCollab from '../code-editor-collab'
import Checkers from '../elements/checkers-code-editor'
import MumuSpeedDial from '../elements/mumu-speed-deal'
import QuickKeys from '../elements/quick-keys/QuickKeys'

import { CodeEditorStyles } from './styles'

interface ICodeEditorBlock {
  onChangeStreamingDocInfo: (doc: Record<string, string>) => void
  validations: Array<IValidation & BaseResponseInterface>
  preloadedCode: string
  contentId?: string
}

const OPEN_POPOVER_DELAY = 15000
const CLOSE_POPOVER_DELAY = 7000

const CodeEditorBlockContent: FC<ICodeEditorBlock> = ({
  validations,
  onChangeStreamingDocInfo,
  preloadedCode,
  contentId,
}) => {
  const isDesktop = useIsDesktop()

  const openPopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const closePopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const [isOpenPopover, setIsOpenPopover] = useState<boolean | null>(null)

  const codeState = useSelector((state) => state.codePanelGlobal.code)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)

  const selectedContent = useMemo(
    () => contentValidations?.find((item) => item.contentId === contentId),
    [contentId, contentValidations]
  )

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
    <>
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

      <CodeEditorCollab
        preloadedCode={preloadedCode}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
      />
      <QuickKeys />
    </>
  )
}

export default memo(CodeEditorBlockContent)
