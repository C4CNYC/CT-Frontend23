import { type FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'

import useIsDesktop from '@/hooks/useIsDesktop'
import { type IValidation } from '@/redux/interfaces/content.interface'
import { dispatch, useSelector } from '@/redux/store'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { mapValidations } from '@/utils/validationMaping'
import {
  setCompletedSlides,
  setIsActivateCompeated,
} from '@root/src/redux/slices/checkers-animation'
import { setContentValidations, setNextStepAble } from '@root/src/redux/slices/code-panel-global'
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

  const codeState = useSelector((state) => state.codePanelGlobal.code)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const completedSlides = useSelector((state) => state.checkersAnimation.completedSlides)

  const selectedContent = useMemo(
    () => contentValidations?.find((item) => item.contentId === contentId),
    [contentId, contentValidations]
  )

  const checkers = useMemo(() => {
    if (!validations?.length) return []

    const mappedCheckers = mapValidations(codeState, validations)
    return mappedCheckers.map((checker) => {
      const existingChecker = selectedContent?.checkers?.find((c) => c.text === checker.text)
      return {
        text: checker.text,
        valid: checker.valid || existingChecker?.valid || false,
      }
    })
  }, [codeState, validations, selectedContent?.checkers])

  const updateContentValidations = useCallback(
    (updatedCheckers: any[]) => {
      if (!contentValidations?.length) return

      const updatedContentValidations = contentValidations.map((item) => ({
        ...item,
        checkers: item.contentId === contentId ? updatedCheckers : item.checkers,
      }))

      dispatch(setContentValidations(updatedContentValidations))
    },
    [contentId]
  )

  useEffect(() => {
    if (!contentId || !validations?.length || selectedContent) return

    const initialCheckers = checkers.map((checker) => ({
      ...checker,
    }))

    const newContentValidation = {
      contentId,
      checkers: initialCheckers,
    }
    const updatedContentValidations = contentValidations
      ? [...contentValidations, newContentValidation]
      : [newContentValidation]

    dispatch(setContentValidations(updatedContentValidations))
  }, [contentId, validations, selectedContent, checkers])

  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      const data = event.data
      if (
        data?.type === 'checker-validation' &&
        data.checkerId &&
        typeof data.valid === 'boolean'
      ) {
        const updatedCheckers = checkers.map((checker) =>
          checker.text === data.checkerId ? { ...checker, valid: data.valid } : checker
        )
        updateContentValidations(updatedCheckers)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [checkers, updateContentValidations])
  useEffect(() => {
    if (!checkers.length) return

    const allPassed = checkers.every((checker) => checker.valid)
    const currentSlideCompleted = completedSlides[slideIndex]

    if (allPassed && !currentSlideCompleted) {
      const newCompletedSlides = [...completedSlides]
      newCompletedSlides[slideIndex] = allPassed
      dispatch(setCompletedSlides(newCompletedSlides))
      dispatch(setNextStepAble(allPassed))
    }
    let oldCount = selectedContent?.checkers?.filter((checker) => checker.valid).length || 0
    const newCount = checkers.filter((checker) => checker.valid).length
    const checkersMatch =
      selectedContent?.checkers &&
      JSON.stringify(selectedContent.checkers) === JSON.stringify(checkers)

    if (!checkersMatch) {
      updateContentValidations(checkers)
      if (newCount > oldCount) dispatch(setIsActivateCompeated(true))
    }
  }, [checkers, slideIndex, completedSlides, selectedContent?.checkers, updateContentValidations])
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
