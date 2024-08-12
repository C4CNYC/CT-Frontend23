import { type FC, useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Button, Tooltip, Typography, useTheme } from '@mui/material'

import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'

import LessonFeedback from '../../../../footer/lesson-feedback/LessonFeedback'

import { BOX_SX, getNestedBoxSx } from './constants'
import { FeedbackIcon } from './FeedbackIcon'
import NavigationElement from './navigation-element'
import NavigationSpeedDial from './navigation-speed-dial'
import {
  FEEDBACK_BTN_SX,
  TOOLTIP_CONTENT_SX,
  getTooltipWrapperSx,
  stylesNext,
  stylesPrev,
  stylesSkip,
} from './styles'

export enum BtnType {
  next = 'btn_group_next',
  compleated = 'btn_group_you_did_it',
  coding = 'btn_group_lets_coding',
}

interface INavigation {
  hasPrev: boolean
  canMoveNext: boolean
  stepHasValidation: boolean
  onNext: (skip?: boolean) => void
  onPrev: () => void
  hasNextStep: boolean
  lessonName?: string
}

const Navigation: FC<INavigation> = ({
  onNext,
  onPrev,
  hasPrev,
  stepHasValidation,
  canMoveNext,
  lessonName,
}) => {
  const theme = useTheme()
  const [btnNext, setBtnNext] = useState<BtnType>(BtnType.next)
  const translate = useTranslate()
  const nestedBox = useMemo(() => getNestedBoxSx(theme), [theme])
  const tooltipWrapperSx = useMemo(() => getTooltipWrapperSx(theme), [theme])

  const stylePrev = useMemo(() => stylesPrev(theme), [theme])
  const styleNext = useMemo(() => stylesNext(btnNext, theme), [btnNext])

  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  const completedSlides = useSelector((state) => state.checkersAnimation.completedSlides)
  const [slideProgress, setSlideProgress] = useState(-1)

  useEffect(() => {
    if (canMoveNext) {
      if (slideIndex === 0) {
        setSlideProgress(0)
      } else if (slideIndex > slideProgress) {
        setSlideProgress(slideIndex)
      }
    }
  }, [slideIndex])

  const getNextBtnType = useCallback((): void => {
    if (stepHasValidation) {
      if (canMoveNext || completedSlides[slideIndex]) {
        setBtnNext(BtnType.compleated)
      } else {
        setBtnNext(BtnType.coding)
      }
    } else {
      setBtnNext(BtnType.next)
    }
  }, [stepHasValidation, canMoveNext, completedSlides, slideIndex])

  useEffect(() => {
    getNextBtnType()
  }, [getNextBtnType])

  return (
    <Box sx={BOX_SX}>
      <div className='controls'>
        <Box sx={nestedBox}>
          <LessonFeedback lessonName={lessonName}>
            <Button sx={FEEDBACK_BTN_SX}>
              <FeedbackIcon
                size={30}
                color={theme.palette.text.secondary}
              />
            </Button>
          </LessonFeedback>
          <NavigationElement
            sx={stylePrev}
            disabled={!hasPrev}
            direction='prev'
            onClick={onPrev}
          />

          <NavigationSpeedDial stepHasValidation={stepHasValidation} />

          <Tooltip
            title={
              stepHasValidation && !canMoveNext && !completedSlides[slideIndex] ? (
                <Typography sx={TOOLTIP_CONTENT_SX}>{translate('btn_group_tooltip')}</Typography>
              ) : (
                ''
              )
            }
            placement='top'
            sx={{
              width: 100,
              textAlign: 'center',
            }}
          >
            <Box sx={tooltipWrapperSx}>
              <NavigationElement
                sx={styleNext}
                onClick={() => {
                  onNext()
                }}
                backType={btnNext}
              >
                {stepHasValidation && !canMoveNext && !completedSlides[slideIndex] ? (
                  <Button
                    onClick={() => {
                      onNext(true)
                    }}
                    sx={stylesSkip(theme)}
                  >
                    {translate('btn_group_skip')}
                  </Button>
                ) : null}
              </NavigationElement>
            </Box>
          </Tooltip>
        </Box>
      </div>
    </Box>
  )
}

export default Navigation
