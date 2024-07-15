import { type FC, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import { AnimatePresence, m } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch } from 'react-redux'

import { setIsVisible } from '@/redux/slices/checkers-animation'
import { setContentValidations, setNextStepAble } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { type IValidationMap } from '@/utils/validationMaping'

import CheckersCompleated from './checkers-compleated'
import CheckersMenu from './checkers-menu'
import { CheckerIcon } from './CheckersIcon'
import {
  BOX_SX,
  CHECKERS_ANIMATION,
  INDICATORS_WRAPPER_SX,
  M_DIV_STYLE,
  OPEN_BOX_SX,
  OPEN_BTN_WRAPPER_SX,
  OPEN_HANDLER_ANIMATION,
  getIndicatorSx,
  getStackSx,
} from './constants'

interface ICheckers {
  checkers: IValidationMap[]
  contentId?: string | undefined
  isCheckedOnce: boolean
}

const Checkers: FC<ICheckers> = ({ checkers, contentId, isCheckedOnce }) => {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.checkersAnimation.isVisible)
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const nextStepAble = useSelector((state) => state.codePanelGlobal.nextStepAble)
  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)
  const handleCollaps = (): void => {
    if (isVisible) {
      dispatch(setIsVisible(false))
    } else {
      dispatch(setIsVisible(true))
    }
  }

  const handleClose = (): void => {
    if (isVisible) {
      dispatch(setIsVisible(false))
    }
  }

  const ref = useDetectClickOutside({ onTriggered: handleClose })

  useEffect(() => {
    const allPased = checkers.reduce((prev, curr) => prev && curr.valid, true)
    if (allPased) {
      const checkedContents = contentValidations?.map((item) => ({
        ...item,
        checkers: item.contentId === contentId ? checkers : item.checkers,
      }))
      dispatch(setContentValidations(checkedContents))
    }
    dispatch(setNextStepAble(allPased))
  }, [checkers])

  const stackSx = useMemo(() => getStackSx(isBrowserHidden), [isBrowserHidden])

  const handleIconColor = (checkers: IValidationMap[]): string => {
    let containsValid = false
    let containsInvalid = false

    checkers.forEach((checker) => {
      checker.valid ? (containsValid = true) : (containsInvalid = true)
    })

    if (containsValid && !containsInvalid) {
      return '#75CF6D'
    }

    if (containsValid && containsInvalid) {
      return '#ED9526'
    }

    return '#C4C4C4'
  }

  return (
    <>
      <CheckersCompleated />

      <Box
        sx={OPEN_BOX_SX}
        ref={ref}
      >
        <AnimatePresence>
          <m.div
            initial='visible'
            animate={isVisible ? 'closed' : 'open'}
            variants={OPEN_HANDLER_ANIMATION}
          >
            <Box sx={OPEN_BTN_WRAPPER_SX}>
              <Box
                sx={BOX_SX}
                onClick={handleCollaps}
              >
                <CheckerIcon
                  width={14}
                  height={15}
                  color={handleIconColor(checkers)}
                />
              </Box>
              <Box sx={INDICATORS_WRAPPER_SX}>
                {checkers.map((checker, i) => (
                  <Box
                    key={i}
                    sx={{ ...getIndicatorSx(checker.valid) }}
                  />
                ))}
              </Box>
            </Box>
          </m.div>
        </AnimatePresence>
      </Box>
      <Stack sx={stackSx}>
        <AnimatePresence>
          <m.div
            initial={false}
            animate={isVisible ? 'open' : 'closed'}
            variants={CHECKERS_ANIMATION}
            style={M_DIV_STYLE}
          >
            <CheckersMenu
              checkers={checkers}
              isCheckedOnce={isCheckedOnce}
            />
          </m.div>
        </AnimatePresence>
      </Stack>
    </>
  )
}

export default Checkers
