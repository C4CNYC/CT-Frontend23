/*
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { setCompletedSlides, setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import { setContentValidations, setNextStepAble } from '@/redux/slices/code-panel-global'
import { dispatch, useSelector } from '@/redux/store'
import { IValidationMap, CheckValidationTests } from '@root/src/utils/CheckValidationTests'

import { useFileManager } from '../sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import { useLessonManager } from '../sections/code-panel/lib/LessonManagerContext'
let fnInc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function fnIncUse(n: number) {
  fnInc[n] = fnInc[n] + 1
  console.log('fnIncUse', n, fnInc[n]) // eslint-disable-line no-console
}
const jsonify = (obj: any) => JSON.stringify(obj)
function jsonifyu<T>(obj: string) {
  return JSON.parse(obj || '[]') as T[]
}

export const useValidationManager = () => {
  const { lessonContent, currentSlideId, lesson } = useLessonManager()
  let validations = lessonContent?.find((lc) => lc.id == currentSlideId)?.validations || []
  let lessonId = lesson?.id
  const { files } = useFileManager()
  fnIncUse(0)
  const codeState = useMemo(() => {
    if (!files || !Array.isArray(files)) return ''
    fnIncUse(1)
    return files
      .filter((file) => file && file.extension && file.extension.toLowerCase() !== 'test')
      .map((file) => file.body || '')
      .join('\n')
  }, [files])
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const completedSlides = useSelector((state) => state.checkersAnimation.completedSlides)

  const prevLessonIdRef = useRef<string>('')

  // Find the selected content validation
  const selectedContentCheckersString = useMemo(
    () => JSON.stringify(contentValidations?.find(item => item.contentId === currentSlideId)?.checkers || []),
    [currentSlideId, contentValidations]
  );
  const checkersj = useMemo(() => {
    if (!validations?.length) return '[]'
    fnIncUse(2)
    const mappedCheckers = CheckValidationTests(codeState, validations)
    return jsonify(mappedCheckers.map((checker) => {
      const existingChecker = selectedContentCheckers.find((c) => c.text === checker.text)
      return {
        text: checker.text,
        valid: checker.valid || existingChecker?.valid || false,
      }
    }))
  }, [codeState, validations, contentValidations])
  const allPassed = useMemo(() => {
    if (!checkersj || checkersj === '[]') return false
    const checkers = jsonifyu<IValidationMap>(checkersj)
    return checkers.length > 0 && checkers.every((checker) => checker.valid)
  }, [checkersj])

  // Update content validations in Redux store
  const updateContentValidations = useCallback(
    (updatedCheckers: IValidationMap[]) => {
      fnIncUse(3)
      if (lessonId === undefined || !currentSlideId) return
      if (!contentValidations?.length || !currentSlideId) return
      if (prevLessonIdRef.current !== lessonId) {
        prevLessonIdRef.current = lessonId
        return // Skip update during transition
      }

      const updatedContentValidations = contentValidations.map((item) => ({
        ...item,
        checkers: item.contentId === currentSlideId ? updatedCheckers : item.checkers,
      }))

      dispatch(setContentValidations(updatedContentValidations))
    },
    [currentSlideId, prevLessonIdRef, lessonId, contentValidations]
  )

  // Initialize validation for new content
  useEffect(() => {
    if (!currentSlideId || !validations?.length || selectedContentCheckers) return
    fnIncUse(4)
    const initialCheckers = jsonifyu<IValidationMap>(checkersj).map((checker) => ({ ...checker }))
    const newContentValidation = {
      contentId: currentSlideId,
      checkers: initialCheckers,
    }

    const updatedContentValidations = contentValidations
      ? [...contentValidations, newContentValidation]
      : [newContentValidation]

    dispatch(setContentValidations(updatedContentValidations))
  }, [currentSlideId, validations, selectedContentCheckers])
 
  useEffect(() => {
    fnIncUse(5)
    const handleMessage = (event: MessageEvent): void => {
      const data = event.data
      if (
        data?.type === 'checker-validation' &&
        data.checkerId &&
        typeof data.valid === 'boolean'
      ) {
        let checkers = jsonifyu<IValidationMap>(checkersj)
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
  }, [checkersj, updateContentValidations])
 
  useEffect(() => {
    if (checkersj != '[]') return
    fnIncUse(6)
    let checkers = jsonifyu<IValidationMap>(checkersj)
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
    const oldCount = selectedContentCheckers?.filter((checker) => checker.valid).length || 0
    const newCount = checkers.filter((checker) => checker.valid).length

    // Compare checker states using efficient comparison
    const checkersString = JSON.stringify(checkers);
    const selectedCheckersString = JSON.stringify(selectedContentCheckers);
    const checkersChanged = checkersString !== selectedCheckersString;

    // Update validations if changed
    if (checkersChanged) {
      fnIncUse(7)
      updateContentValidations(checkers)
      // Trigger completion animation if new validations passed
      if (newCount > oldCount) {
        dispatch(setIsActivateCompeated(true))
      }
    }
  }, [checkersj, slideIndex, completedSlides, selectedContentCheckers, updateContentValidations])

  return {
    checkers: jsonifyu<IValidationMap>(checkersj),
    allPassed
  }
}
*/
