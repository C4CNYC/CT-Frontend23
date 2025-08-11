import { type FC, memo, useEffect, useMemo, useRef, useState } from 'react'

import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useValidationManager } from '@/hooks/useValidationManager'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../../base-block'
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
  const translate = useTranslate()
  const isDesktop = useIsDesktop()

  const openPopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const closePopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const [isOpenPopover, setIsOpenPopover] = useState<boolean | null>(null)

  // Use the custom validation manager hook
  const { checkers } = useValidationManager({ validations, contentId })

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
    <BaseBlock
      title={translate('code_editor')}
      icon={
        <BiCodeAlt
          size='20px'
          color='#43D4DD'
        />
      }
      className='codeEditorTour'
    >
      <CodeEditorStyles isDesktop={isDesktop} />

      <MumuSpeedDial
        openPopover={isOpenPopover}
        contentId={contentId}
      />

      {Boolean(validations?.length) && Boolean(selectedContent) && <Checkers checkers={checkers} />}

      <CodeEditorCollab
        preloadedCode={preloadedCode}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
      />
      <QuickKeys />
    </BaseBlock>
  )
}

export default memo(CodeEditorBlockContent)
