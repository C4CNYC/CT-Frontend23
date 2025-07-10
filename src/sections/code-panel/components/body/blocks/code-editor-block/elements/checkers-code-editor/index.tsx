import { type FC, useMemo } from 'react'

import { Box, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import { AnimatePresence, m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch } from 'react-redux'

import { setIsVisible } from '@/redux/slices/checkers-animation'
import { useSelector } from '@/redux/store'
import { type IValidationMap } from '@/utils/validationMaping'

import CheckersMenu from './checkers-menu'
import { CheckerIcon } from './CheckersIcon'
import {
  getBoxSx,
  CHECKERS_ANIMATION,
  INDICATORS_WRAPPER_SX,
  getMDivStyles,
  OPEN_BOX_SX,
  OPEN_BTN_WRAPPER_SX,
  OPEN_HANDLER_ANIMATION,
  getIndicatorSx,
  getStackSx,
} from './constants'

const CheckersCompleated = dynamic(() => import('./checkers-compleated'), {
  ssr: false,
})

interface ICheckers {
  checkers: IValidationMap[]
}

const Checkers: FC<ICheckers> = ({ checkers }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const isVisible = useSelector((state) => state.checkersAnimation.isVisible)
  const isActivateCompleted = useSelector((state) => state.checkersAnimation.isActivateCompeated)

  const getBoxStyle = useMemo(() => getBoxSx(theme), [theme])
  const mDivStyle = useMemo(() => getMDivStyles(theme), [theme])

  const handleCollapse = (): void => {
    dispatch(setIsVisible(isVisible ? false : true))
  }

  const handleClose = (): void => {
    if (isVisible) {
      dispatch(setIsVisible(false))
    }
  }

  const ref = useDetectClickOutside({ onTriggered: handleClose })

  const handleIconColor = (checkers: IValidationMap[]): string => {
    const hasValid = checkers.some((c) => c.valid)
    const hasInvalid = checkers.some((c) => !c.valid)

    if (hasValid && !hasInvalid) return '#75CF6D'
    if (hasValid && hasInvalid) return '#ED9526'
    return '#C4C4C4'
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {isActivateCompleted ? <CheckersCompleated /> : null}
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
                sx={getBoxStyle}
                onClick={handleCollapse}
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
      <Stack sx={getStackSx()}>
        <AnimatePresence>
          <m.div
            initial={false}
            animate={isVisible ? 'open' : 'closed'}
            variants={CHECKERS_ANIMATION}
            style={mDivStyle}
          >
            <CheckersMenu checkers={checkers} />
          </m.div>
        </AnimatePresence>
      </Stack>
    </Box>
  )
}

export default Checkers
