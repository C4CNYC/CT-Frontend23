import { type FC, useEffect, useMemo, useRef, useState } from 'react'

import { Box, SpeedDial, SpeedDialAction, Tooltip, Typography } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useGetLessonStudentQuery } from '@/redux/services/manager/lesson-student'
import { useSelector } from '@/redux/store'
import SolutionMobileDialog from '@/sections/code-panel/components/header/nav-bar/options/help-popup/options/solution-mobile-dialog'
import UnstuckMobileDialog from '@/sections/code-panel/components/header/nav-bar/options/help-popup/options/unstack-dialogs/UnstuckMobileDialog'
import { useTranslate } from '@/utils/translateHelper'

import TipsPopover from '../tips-popover'

import { IActionDialogType, actions, actionsTips } from './config'
import {
  BOX_PROPS,
  SPEED_DEAL_ACTION_FAB_PROPS,
  getSpeedDealFabProps,
  getSpeedDealStyles,
} from './constants'

interface MumuSpeedDialProps {
  typing: boolean | null
}

const MumuSpeedDial: FC<MumuSpeedDialProps> = ({ typing }) => {
  const isDesktop = useIsDesktop()
  const [actionsList, setActionsList] = useState<Array<Record<string, any>>>(actions)
  const popperRef = useRef<null | HTMLElement>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openPoper, setOpenPoper] = useState<boolean>(false)
  const [speedDeal, setSpeedDial] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<IActionDialogType | null>(null)
  const translate = useTranslate()
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  const { data, isLoading } = useGetLessonStudentQuery(
    { id: lessonId as string },
    { skip: !lessonId }
  )

  const slideTips = data?.contents[slideIndex]?.tips

  const speedDealProps = useMemo(() => getSpeedDealFabProps(speedDeal), [speedDeal])
  const speedDealStyles = useMemo(() => getSpeedDealStyles(isDesktop), [isDesktop])

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
    if (typing && slideTips) {
      setOpenPoper(true)
    }
  }, [typing])

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
          ref={popperRef}
          aria-describedby={'popper'}
          ariaLabel='SpeedDial basic example'
          open={speedDeal}
          onClose={closeSpeedDial}
          onOpen={openSpeedDial}
          FabProps={speedDealProps}
          sx={speedDealStyles}
          direction='up'
          icon={<Box sx={BOX_PROPS} />}
        >
          {actionsList.map((action) => {
            if (action.name === 'tips' && !slideTips) {
              return null
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
      {/* commented before V1 release */}
      {/* <TipsMobileDialog
        open={dialogType === IActionDialogType.tips}
        onClose={handleCloseDialog}
        isLoading={isLoading}
        tips={[...(data?.tips ?? []), ...slideTips]}
      /> */}

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
