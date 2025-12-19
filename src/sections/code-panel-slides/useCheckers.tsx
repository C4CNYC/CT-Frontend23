import { useEffect, useMemo } from 'react'

import { setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import { setContentValidations } from '@/redux/slices/code-panel-global'
import { dispatch, useSelector } from '@root/src/redux/store'
import { IValidationMap } from '@root/src/utils/CheckValidationTests'
import { isValidRegex } from '@root/src/utils/isValidRegex'
import { sendValidationMessageToIframes } from '@root/src/utils/sendValidationMessageToIframes'

import { useLessonManager } from './LessonManagerContext'

export function useCheckers() {
  const { lessonContent, currentSlideId, checkersAnimation } = useLessonManager()
  let validations = lessonContent?.find((lc) => lc.id == currentSlideId)?.validations || []
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)

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
  //console.log('useCheckers fnInc', n, fnInc[n], ...args)
}
function countPassed(checkers: IValidationMap[]): number {
  return checkers.filter((checker) => checker.valid).length
}
let lastRenderTime = 0
