import { useEffect, useRef, useState } from 'react'

import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../../base-block'
import CodeEditorCollab from '../code-editor-collab'
import { Checkers } from '../elements/checkers-code-editor'
import MumuSpeedDial from '../elements/mumu-speed-deal'
import QuickKeys from '../elements/quick-keys/QuickKeys'

import { CodeEditorStyles } from './styles'

interface ICodeEditorBlock {
  preloadedCode: string
  contentId?: string
}

const OPEN_POPOVER_DELAY = 15000
const CLOSE_POPOVER_DELAY = 7000

export function CodeEditorBlockContent({ preloadedCode, contentId }: ICodeEditorBlock) {
  const translate = useTranslate()
  const isDesktop = useIsDesktop()

  const openPopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const closePopoverTimer = useRef<NodeJS.Timeout | null>(null)
  const [isOpenPopover, setIsOpenPopover] = useState<boolean | null>(null)

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
      <Checkers />
      <CodeEditorCollab preloadedCode={preloadedCode} />
      <QuickKeys />
    </BaseBlock>
  )
}
