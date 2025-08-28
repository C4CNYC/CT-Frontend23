import { useEffect, useMemo } from 'react'

import { setCompletedSlides, setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import {
  setContentValidations,
  setNextStepAble,
  ContentValidation,
} from '@/redux/slices/code-panel-global'
import { CheckValidationTests, IValidationMap } from '@root/src/utils/CheckValidationTests'

import { dispatch, useSelector } from '../redux/store'
import { useFileManager } from '../sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import { useLessonManager } from '../sections/code-panel/lib/LessonManagerContext'
import { isValidRegex } from '../utils/isValidRegex'

export function useCheckers() {
  const { lessonContent, currentSlideId } = useLessonManager()
  let validations = lessonContent?.find((lc) => lc.id == currentSlideId)?.validations || []
  const { files } = useFileManager()
  const { completedSlides } = useSelector((state) => state.checkersAnimation)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  fnIncUse(0)
  const codeState = useMemo(() => {
    if (!files || !Array.isArray(files)) return ''
    fnIncUse(1)
    return files
      .filter((file) => file && file.extension && file.extension.toLowerCase() !== 'test')
      .map((file) => file.body || '')
      .join('\n')
  }, [files])

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

    dispatch(setContentValidations(updatedContentValidations))
  }
  useEffect(() => {
    if (!codeState || !validations.length) return
    fnIncUse(2)
    const checkers = CheckValidationTests(codeState, validations)
    let allPassed = checkers.length > 0 && checkers.every((checker) => checker.valid)

    let updatedContentValidations: ContentValidation[] = []

    if (contentValidations && contentValidations.length > 0) {
      const existingValidationIndex = contentValidations.findIndex(
        (item) => item.contentId === currentSlideId
      )

      if (existingValidationIndex >= 0) {
        const existingCheckers = contentValidations[existingValidationIndex].checkers || []
        const previousPassedCount = countPassed(existingCheckers)

        checkers.forEach((checker) => {
          const existingChecker = existingCheckers.find((c) => c.text === checker.text)
          if (existingChecker) {
            checker.valid = existingChecker.valid || checker.valid
          }
        })

        allPassed = checkers.length > 0 && checkers.every((checker) => checker.valid)
        const newPassedCount = countPassed(checkers)
        if (newPassedCount > previousPassedCount) {
          dispatch(setIsActivateCompeated(true))
        }
        updatedContentValidations = contentValidations.map((item, index) =>
          index === existingValidationIndex ? { ...item, checkers } : item
        )
      } else {
        updatedContentValidations = [...contentValidations, { contentId: currentSlideId, checkers }]
      }
    } else {
      updatedContentValidations = [{ contentId: currentSlideId, checkers }]
    }
    if (JSON.stringify(updatedContentValidations) !== JSON.stringify(contentValidations)) {
      if (true || Date.now() - lastRenderTime > 100) {
        lastRenderTime = Date.now()
        fnIncUse(92)
        dispatch(setContentValidations(updatedContentValidations))
      }
    }

    if (allPassed) {
      const newCompletedSlides = [...completedSlides]

      if (slideIndex !== undefined && slideIndex >= 0) {
        while (newCompletedSlides.length <= slideIndex) {
          newCompletedSlides.push(false)
        }
        newCompletedSlides[slideIndex] = true
      }
      if (JSON.stringify(newCompletedSlides) === JSON.stringify(completedSlides)) return
      fnIncUse(107)
      dispatch(setCompletedSlides(newCompletedSlides))
      dispatch(setNextStepAble(true))
    }
  }, [codeState, validations, completedSlides, currentSlideId, contentValidations, slideIndex])
  useEffect(() => {
    fnIncUse(119)
    const handleMessage = (event: MessageEvent): void => {
      const data = event.data
      let checkerIds: { name: string; isValid: boolean }[] = []
      if (!data || !data.type) return
      if ('checker-validation' === data.type && data.checkerId && Boolean(data.valid)) {
        checkerIds.push({ name: data.checkerId, isValid: Boolean(data.valid) })
        document.querySelectorAll('iframe').forEach((iframe) => {
          iframe.contentWindow?.postMessage(event.data, '*')
        })
      } else if ('ConsoleLog' === data.type && data.message) {
        validations.forEach((validator) => {
          let isValid
          switch (validator.type) {
            case 'error':
            case 'output':
              if (isValidRegex(validator.regex)) {
                isValid = new RegExp(validator.regex).test(data.message)
              } else {
                isValid = data.message.includes(validator.regex)
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

        if (checkerIndex !== -1 && updatedCheckers[checkerIndex].valid !== isValid) {
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
  return {
    checkers: currentCheckers,
    allPassed,
  }
}

let fnInc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function fnIncUse(n: number, ...args: any[]) {
  fnInc[n] = fnInc[n] + 1
  // console.log('fnIncUse', n, fnInc[n], args)
}
function countPassed(checkers: IValidationMap[]): number {
  return checkers.filter((checker) => checker.valid).length
}
let lastRenderTime = 0
