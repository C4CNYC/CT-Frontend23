import { useEffect, useMemo, useState, useCallback } from 'react'

import { setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import { setContentValidations, ContentValidation } from '@/redux/slices/code-panel-global'
import {
  useCompleteLessonMutation,
  useCompleteStudentLessonMutation,
} from '@root/src/redux/services/manager/progress-student'
import { dispatch, useSelector } from '@root/src/redux/store'
import { IValidationMap } from '@root/src/utils/CheckValidationTests'
import { isValidRegex } from '@root/src/utils/isValidRegex'
import { sendValidationMessageToIframes } from '@root/src/utils/sendValidationMessageToIframes'

import { useLessonManager } from './LessonManagerContext'

export function useCheckers() {
  const { lessonContent, currentSlideId, checkersAnimation, lesson } = useLessonManager()
  let validations = lessonContent?.find((lc) => lc.id == currentSlideId)?.validations || []
  // Get initial contentValidations from Redux for backward compatibility
  const reduxContentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)
  const [completeLesson] = useCompleteLessonMutation()
  const [completeStudentLesson] = useCompleteStudentLessonMutation()
  const courseId = useSelector((state) => state.codePanelGlobal.courseId)
  const unitId = useSelector((state) => state.codePanelGlobal.unitId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  // Local state to store content validations derived from lessonContent
  const [localContentValidations, setLocalContentValidations] = useState<ContentValidation[]>([])

  // Function to derive contentValidations from lessonContent
  const deriveContentValidationsFromLessonContent = useCallback(() => {
    if (!lessonContent || !Array.isArray(lessonContent)) return []

    return lessonContent.map((content) => {
      if (!content.validations || !Array.isArray(content.validations)) {
        return {
          contentId: content.id || '',
          checkers: [],
        }
      }

      // Convert validations to IValidationMap format
      const checkers = content.validations.map((validation) => ({
        text: validation.name,
        valid: false, // Default to false, will be updated when validation is checked
        description: validation.description || '',
        id: validation.id || '',
        errorMessage: '',
      }))

      return {
        contentId: content.id || '',
        checkers,
      }
    })
  }, [lessonContent])

  // Initialize localContentValidations from lessonContent
  useEffect(() => {
    const derivedValidations = deriveContentValidationsFromLessonContent()

    // If we have Redux validations, merge them with the derived ones
    if (reduxContentValidations && reduxContentValidations.length > 0) {
      const mergedValidations = derivedValidations.map((derived) => {
        const existing = reduxContentValidations.find((rv) => rv.contentId === derived.contentId)
        return existing || derived
      })
      setLocalContentValidations(mergedValidations)
    } else {
      setLocalContentValidations(derivedValidations)
    }
  }, [lessonContent, reduxContentValidations, deriveContentValidationsFromLessonContent])

  // Use localContentValidations instead of Redux contentValidations
  const contentValidations = localContentValidations

  function selectedContentCheckersGet() {
    return contentValidations?.find((item) => item.contentId === currentSlideId)?.checkers || []
  }

  function updateContentValidations(updatedCheckers: IValidationMap[]) {
    fnIncUse(3)
    if (!currentSlideId) return
    if (!contentValidations?.length || !currentSlideId) return

    const updatedContentValidations = contentValidations.map((item) => ({
      ...item,
      checkers: item.contentId === currentSlideId ? updatedCheckers : item.checkers,
    }))

    // Update local state
    setLocalContentValidations(updatedContentValidations)

    // Also update Redux for backward compatibility
    dispatch(setContentValidations(updatedContentValidations))
  }

  useEffect(() => {
    fnIncUse(40)
    const handleMessage = (event: MessageEvent): void => {
      const data = event.data
      let checkerIds: { name: string; isValid: boolean }[] = []
      if (!data || !data.type) return
      if (['checker-validation', 'ConsoleLog'].includes(data.type)) {
        document.querySelectorAll('iframe').forEach((iframe) => {
          if (event.source !== iframe.contentWindow)
            iframe.contentWindow?.postMessage(event.data, '*')
        })
      }
      if ('checker-validation' === data.type && data.checkerId && Boolean(data.valid)) {
        checkerIds.push({ name: data.checkerId, isValid: Boolean(data.valid) })
        checkersAnimation.onTrue()
      } else if ('ConsoleLog' === data.type && data.message) {
        validations.forEach((validator) => {
          let isValid
          switch (validator.type) {
            case 'output':
              if (isValidRegex(validator.regex)) {
                isValid = new RegExp(validator.regex).test(data.message)
              } else {
                isValid = data.message.includes(validator.regex)
              }
              if (isValid) {
                sendValidationMessageToIframes(validator.name, isValid)
              }
          }
          if (typeof isValid === 'boolean') {
            checkerIds.push({ name: validator.name, isValid })
          }
        })
      }
      let checkers = selectedContentCheckersGet()
      let hasChanges = false
      let updatedCheckers = [...checkers] // Work with a copy
      for (let { name: checkerId, isValid } of checkerIds) {
        const checkerIndex = updatedCheckers.findIndex((checker) => checker.text === checkerId)

        if (checkerIndex !== -1 && updatedCheckers[checkerIndex].valid !== isValid && isValid) {
          updatedCheckers[checkerIndex] = { ...updatedCheckers[checkerIndex], valid: isValid }
          hasChanges = true
        }
      }

      if (hasChanges) {
        const newPassedCount = countPassed(updatedCheckers)
        const previousPassedCount = countPassed(checkers)

        if (newPassedCount > previousPassedCount) {
          dispatch(setIsActivateCompeated(true))
        }

        updateContentValidations(updatedCheckers)

        // Save progress to database when all checkers are passed
        // console.log(
        //   updatedCheckers.length,
        //   updatedCheckers.map((checker) => checker.valid)
        // )
        const allPassed =
          updatedCheckers.length > 0 && updatedCheckers.every((checker) => checker.valid)
        if (allPassed && courseId && currentSlideId) {
          completeLesson({
            id: courseId,
            lesson_content_id: currentSlideId,
            module_id: unitId || '',
          })
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => window.removeEventListener('message', handleMessage)
  }, [updateContentValidations])

  const currentCheckers = useMemo(() => {
    if (!contentValidations || !currentSlideId) return []
    fnIncUse(3)
    const currentValidation = contentValidations.find((item) => item.contentId === currentSlideId)
    return currentValidation?.checkers || []
  }, [contentValidations, currentSlideId])

  const allPassed = useMemo(() => {
    fnIncUse(152)
    return currentCheckers.length > 0 && currentCheckers.every((checker) => checker.valid)
  }, [currentCheckers])

  // Check if all slides in the lesson are completed
  const allSlidesCompleted = useMemo(() => {
    if (!lessonContent || !contentValidations || !lesson) return false
    fnIncUse(153)

    // Check if every slide has validations and all validations are passed
    return lessonContent.every((slide) => {
      if (!slide.validations || slide.validations.length === 0) return true // Skip slides without validations

      const slideValidation = contentValidations.find((item) => item.contentId === slide.id)
      if (!slideValidation || !slideValidation.checkers || slideValidation.checkers.length === 0)
        return false

      return slideValidation.checkers.every((checker) => checker.valid)
    })
  }, [lessonContent, contentValidations, lesson])

  // Save lesson completion when all slides are completed
  useEffect(() => {
    if (allSlidesCompleted && lesson?.id) {
      completeStudentLesson({
        studentId: '', // Will be filled by the backend from the authenticated user
        lessonId: lesson.id,
      })
    }
  }, [allSlidesCompleted, lesson?.id, completeStudentLesson])

  return {
    checkers: currentCheckers,
    allPassed,
    allSlidesCompleted,
  }
}

let fnInc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function fnIncUse(n: number, ...args: any[]) {
  fnInc[n] = fnInc[n] + 1
  //console.log('useCheckers fnInc', n, fnInc[n], ...args)
}
function countPassed(checkers: IValidationMap[]): number {
  return checkers.filter((checker) => checker.valid).length
}
let lastRenderTime = 0
