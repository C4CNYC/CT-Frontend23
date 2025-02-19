import { type FC, useEffect, useMemo, useRef, useState } from 'react'

import { Box, SpeedDial, SpeedDialAction, Tooltip, Typography, useTheme } from '@mui/material'
import { useSearchParams } from 'next/navigation'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useGetLessonContentStudentQuery } from '@/redux/services/manager/lesson-student'
import { useGetPublicLessonQuery } from '@/redux/services/public-student'
import { useSelector } from '@/redux/store'
import SolutionMobileDialog from '@/sections/code-panel/components/header/nav-bar/options/help-popup/options/solution-mobile-dialog'
import UnstuckMobileDialog from '@/sections/code-panel/components/header/nav-bar/options/help-popup/options/unstack-dialogs/UnstuckMobileDialog'
import { useTranslate } from '@/utils/translateHelper'

import TipsPopover from '../tips-popover'

import { IActionDialogType, actions, actionsTips } from './config'
import {
  getBoxProps,
  SPEED_DEAL_ACTION_FAB_PROPS,
  getSpeedDealFabProps,
  getSpeedDealStyles,
} from './constants'

interface MumuSpeedDialProps {
  openPopover: boolean | null
  contentId?: string
}

const MumuSpeedDial: FC<MumuSpeedDialProps> = ({ openPopover, contentId }) => {
  const translate = useTranslate()
  const isDesktop = useIsDesktop()
  const searchParams = useSearchParams()
  const theme = useTheme()

  const popperRef = useRef<null | HTMLElement>(null)
  const [actionsList, setActionsList] = useState<Array<Record<string, any>>>(actions)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openPoper, setOpenPoper] = useState<boolean>(false)
  const [speedDeal, setSpeedDial] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<IActionDialogType | null>(null)

  let lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  let courseId = useSelector((state) => state.codePanelGlobal.courseId)
  const profile = useSelector((state) => state.global.user)

  const [isVisible, setIsVisible] = useState(false)
  const speedDialRef = useRef(null)

  if (!lessonId) {
    lessonId = searchParams.get('lessonId') || undefined
  }

  if (!courseId) {
    courseId = searchParams.get('courseId') || undefined
  }

  const { data: lessonContent } = useGetLessonContentStudentQuery(
    { id: lessonId as string },
    { skip: !lessonId || !profile }
  )

  const { data: publicData } = useGetPublicLessonQuery(
    { id: courseId as string, lesson_id: lessonId as string },
    { skip: !lessonId || !courseId || !!profile }
  )

  const data = lessonContent ? { contents: lessonContent } : publicData
  const slideTips = data?.contents?.find((ct) => ct.id == contentId)?.tips

  const contentValidations = useSelector((state) => state.codePanelGlobal.contentValidations)

  const selectedContent = contentValidations?.find((item) => item.contentId === contentId)

  const isChecked = !!selectedContent?.checkers?.length

  const speedDealProps = useMemo(() => getSpeedDealFabProps(speedDeal), [speedDeal])
  const speedDealStyles = useMemo(() => getSpeedDealStyles(isDesktop), [isDesktop])
  const boxPropsSx = useMemo(() => getBoxProps(theme, isVisible), [theme, isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    const element = speedDialRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const openSpeedDial = () => {
    setSpeedDial(true)
  }
  const closeSpeedDial = () => {
    setSpeedDial(false)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
  }

  useEffect(() => {
    setAnchorEl(popperRef.current)
  }, [])

  useEffect(() => {
    if (!openPopover) {
      setOpenPoper(false)
    }
    if (openPopover && slideTips && !isChecked) {
      setOpenPoper(true)
    }
  }, [openPopover])

  useEffect(() => {
    if (openPoper) {
      setActionsList(actionsTips)
      setSpeedDial(true)
    }
    if (!openPoper) {
      setActionsList(actions)
      setSpeedDial(false)
    }
  }, [openPoper])

  return (
    <>
      <TipsPopover
        anchorEl={anchorEl}
        openPoper={openPoper}
        setOpenPoper={setOpenPoper}
        tips={slideTips ?? ''}
      />

      <Tooltip title={<Typography>{translate('code_editor_mumu_menu_tooltip')}</Typography>}>
        <SpeedDial
          ref={speedDialRef}
          aria-describedby={'popper'}
          ariaLabel='SpeedDial basic example'
          open={speedDeal}
          onClose={closeSpeedDial}
          onOpen={openSpeedDial}
          FabProps={speedDealProps}
          sx={speedDealStyles}
          direction='up'
          icon={
            <Box
              sx={boxPropsSx}
              ref={popperRef}
            />
          }
        >
          {actionsList.map((action) => {
            if (action.name === 'tips') {
              if (!slideTips || isChecked) {
                return null
              }
            }

            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                onClick={() => {
                  setDialogType(action.type)
                  if (action.type === IActionDialogType.tips) {
                    setOpenPoper(true)
                  }
                }}
                tooltipTitle={
                  <Typography sx={{ color: action.color, p: '2px' }}>
                    {translate(action.name)}
                  </Typography>
                }
                FabProps={SPEED_DEAL_ACTION_FAB_PROPS}
              />
            )
          })}
        </SpeedDial>
      </Tooltip>
      <SolutionMobileDialog
        open={dialogType === IActionDialogType.solution}
        onClose={handleCloseDialog}
      />
      <UnstuckMobileDialog
        open={dialogType === IActionDialogType.stuck}
        onClose={handleCloseDialog}
      />
    </>
  )
}

export default MumuSpeedDial
