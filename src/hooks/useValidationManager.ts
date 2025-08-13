import { useCallback, useEffect, useMemo } from 'react'

import { IValidation } from '@/redux/interfaces/content.interface'
import { setCompletedSlides, setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import { setContentValidations, setNextStepAble } from '@/redux/slices/code-panel-global'
import { dispatch, useSelector } from '@/redux/store'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { IValidationMap, CheckValidationTests } from '@root/src/utils/CheckValidationTests'

import { useFileManager } from '../sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'

interface UseValidationManagerProps {
  validations: Array<IValidation & BaseResponseInterface>
  contentId?: string
}

export const useValidationManager = ({ validations, contentId }: UseValidationManagerProps) => {
  // Get required state from Redux

  const { files } = useFileManager()
  const codeState = useMemo(() => {
    if (!files || !Array.isArray(files)) return ''
    return files
      .filter((file) => file && file.extension && file.extension.toLowerCase() !== 'test')
      .map((file) => file.body || '')
      .join('\n')
  }, [files])
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const completedSlides = useSelector((state) => state.checkersAnimation.completedSlides)

  // Find the selected content validation
  const selectedContent = useMemo(
    () => contentValidations?.find((item) => item.contentId === contentId),
    [contentId, contentValidations]
  )
  const checkers = useMemo(() => {
    if (!validations?.length) return []
    const mappedCheckers = CheckValidationTests(codeState, validations)
    return mappedCheckers.map((checker) => {
      const existingChecker = selectedContent?.checkers?.find((c) => c.text === checker.text)
      return {
        text: checker.text,
        valid: checker.valid || existingChecker?.valid || false,
      }
    })
  }, [codeState, validations, selectedContent?.checkers])

  // Update content validations in Redux store
  const updateContentValidations = useCallback(
    (updatedCheckers: IValidationMap[]) => {
      if (!contentValidations?.length || !contentId) return

      const updatedContentValidations = contentValidations.map((item) => ({
        ...item,
        checkers: item.contentId === contentId ? updatedCheckers : item.checkers,
      }))

      dispatch(setContentValidations(updatedContentValidations))
    },
    [contentId]
  )

  // Initialize validation for new content
  useEffect(() => {
    if (!contentId || !validations?.length || selectedContent) return

    const initialCheckers = checkers.map((checker) => ({ ...checker }))
    const newContentValidation = {
      contentId,
      checkers: initialCheckers,
    }

    const updatedContentValidations = contentValidations
      ? [...contentValidations, newContentValidation]
      : [newContentValidation]

    dispatch(setContentValidations(updatedContentValidations))
  }, [contentId, validations, selectedContent])

  // Listen for external checker validation messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      const data = event.data
      if (
        data?.type === 'checker-validation' &&
        data.checkerId &&
        typeof data.valid === 'boolean'
      ) {
        const checkerToUpdate = checkers.find((checker) => checker.text === data.checkerId)
        if (checkerToUpdate && checkerToUpdate.valid !== data.valid) {
          const updatedCheckers = checkers.map((checker) =>
            checker.text === data.checkerId ? { ...checker, valid: data.valid } : checker
          )
          updateContentValidations(updatedCheckers)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [checkers, updateContentValidations])

  // Handle validation state updates and completion tracking
  useEffect(() => {
    if (!checkers.length) return

    // Check if all validations are passed
    const allPassed = checkers.every((checker) => checker.valid)
    const currentSlideCompleted = completedSlides[slideIndex]

    // Update slide completion state if all validations passed
    if (allPassed && !currentSlideCompleted) {
      const newCompletedSlides = [...completedSlides]
      newCompletedSlides[slideIndex] = true
      dispatch(setCompletedSlides(newCompletedSlides))
      dispatch(setNextStepAble(true))
    }

    // Check for changes in checker state
    const oldCount = selectedContent?.checkers?.filter((checker) => checker.valid).length || 0
    const newCount = checkers.filter((checker) => checker.valid).length

    // Compare checker states using efficient comparison
    const checkersChanged =
      !selectedContent?.checkers ||
      JSON.stringify(selectedContent.checkers) !== JSON.stringify(checkers)

    // Update validations if changed
    if (checkersChanged) {
      updateContentValidations(checkers)
      // Trigger completion animation if new validations passed
      if (newCount > oldCount) {
        dispatch(setIsActivateCompeated(true))
      }
    }
  }, [checkers, slideIndex, completedSlides, selectedContent?.checkers, updateContentValidations])

  return {
    checkers,
    allPassed: checkers.length > 0 && checkers.every((checker) => checker.valid),
  }
}
