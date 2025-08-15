import { useEffect, useMemo } from 'react'

import { setCompletedSlides, setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import {
  setContentValidations,
  setNextStepAble,
  ContentValidation,
} from '@/redux/slices/code-panel-global'
import { dispatch, useSelector } from '@/redux/store'
import { CheckValidationTests } from '@root/src/utils/CheckValidationTests'

import { useFileManager } from '../sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import { useLessonManager } from '../sections/code-panel/lib/LessonManagerContext'

let fnInc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function fnIncUse(n: number) {
  fnInc[n] = fnInc[n] + 1
  //console.log('fnIncUse', n, fnInc[n]) // eslint-disable-line no-console
}
let lastRenderTime = 0
export function useCheckers() {
  const { lessonContent, currentSlideId, lesson } = useLessonManager()
  let validations = lessonContent?.find((lc) => lc.id == currentSlideId)?.validations || []
  const { files } = useFileManager()
  const { completedSlides } = useSelector((state) => state.checkersAnimation)
  const { contentValidations } = useSelector((state) => state.codePanelGlobal)
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

  useEffect(() => {
    if (!codeState || !validations.length) return
    fnIncUse(2)
    const checkers = CheckValidationTests(codeState, validations)
    const allPassed = checkers.length > 0 && checkers.every((checker) => checker.valid)

    let updatedContentValidations: ContentValidation[] = []

    if (contentValidations && contentValidations.length > 0) {
      const existingValidationIndex = contentValidations.findIndex(
        (item) => item.contentId === currentSlideId
      )

      if (existingValidationIndex >= 0) {
        const existingCheckers = contentValidations[existingValidationIndex].checkers || []
        const previousPassedCount = existingCheckers.filter((checker) => checker.valid).length
        const newPassedCount = checkers.filter((checker) => checker.valid).length

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
        fnIncUse(6)
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
      fnIncUse(5)
      dispatch(setCompletedSlides(newCompletedSlides))
      dispatch(setNextStepAble(true))
    }
  }, [codeState, validations, completedSlides, currentSlideId, contentValidations, slideIndex])

  const currentCheckers = useMemo(() => {
    if (!contentValidations || !currentSlideId) return []
    fnIncUse(3)
    const currentValidation = contentValidations.find((item) => item.contentId === currentSlideId)
    return currentValidation?.checkers || []
  }, [contentValidations, currentSlideId])

  const allPassed = useMemo(() => {
    fnIncUse(4)
    return currentCheckers.length > 0 && currentCheckers.every((checker) => checker.valid)
  }, [currentCheckers])

  return {
    checkers: currentCheckers,
    allPassed,
  }
}
