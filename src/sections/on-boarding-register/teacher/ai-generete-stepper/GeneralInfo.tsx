import { useMemo } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { LuInfo } from '@react-icons/all-files/lu/LuInfo'
import { useController } from 'react-hook-form'

import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  BTN_CONTAINER_STYLES,
  getToggleBtnGroupSx,
  OPTIONAL_TYPO_STYLES,
  PROGRAMMING_LANGUAGE,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TRACK,
  TYPE_LESSON,
  getNextBtnSx,
} from './constants'
import { useSelector } from '@root/src/redux/store'
import { useAiGenerateStepper } from './AiGenerateStepperContext'

type IGeneralInfoProps = { 
  isModal: boolean
  closeModal?: () => void
  isTrackSelected: boolean
}

export function GeneralInfo({
  isModal,
  closeModal,
  isTrackSelected,
}: IGeneralInfoProps) {
  const theme = useTheme()
  const translate = useTranslate()
  const { value: trackOptions, onToggle: trackOptionsToggle } = useBoolean(false)
  const { field: RtrackRField } = useController({ name: 'RtrackR' })
  const { nextStep, prevStep, aiLessons } = useAiGenerateStepper();

  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const nextBtnStyles = useMemo(
    () => getNextBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
 

  const RtrackRHandleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: any) => {
    RtrackRField.onChange(newAlignment === RtrackRField.value ? null : newAlignment)
  }

  //type script wiening
  const type_lesson = (
    aiLessons && aiLessons.length > 0
      ? [
          // ...TYPE_LESSON, we dont use this anymore, 
          ...aiLessons.map((ait) => ({
            key:
              ait.id +
              (ait.meta?.redirectAfterAiCreate ? 'code-panel' : '') +
              (ait.meta?.generator ? 'n8n' : ''),
            // wether redirect to code-panel, after lesson created
            value:
              ait.name +
              (ait.meta?.redirectAfterAiCreate ? ' * ' : '') +
              (ait.meta?.generator ? ' ** ' : ''),
            tooltip: ait.description,
            icon: <LuInfo size={16} />,
          })),
        ]
      : TYPE_LESSON
  ).filter((e) => e !== undefined)

  return (
    <Stack sx={STEP_CONTAINER_STYLES}>
      <Stack
        direction='row'
        sx={{ gap: 2, pl: isModal ? 1 : 0, alignItems: 'center' }}
      >
        <IconButton onClick={prevStep}>
          <IoChevronBack size={30} />
        </IconButton>
        <Typography
          variant='h3'
          sx={STEP_TYTLE_STYLES}
        >
          {translate('ai_gen_step_1_title')}
        </Typography>
        {isModal ? (
          <IconButton
            onClick={closeModal}
            sx={{ margin: '0px 0px 0px auto' }}
          >
            <IoClose size={30} />
          </IconButton>
        ) : null}
      </Stack>
      <Stack>
        <Typography
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          {translate('ai_gen_type_1_title')}
          <Typography variant='caption'>{translate('ai_gen_type_1_subtitle')}</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RtypeLessonR'
          options={type_lesson}
          sxGroup={{ ...TOGGLE_BUTTON_GROUP_STYLES, minHeight: 86 }}
          sxButton={toggleButtonStyles}
          tooltip
        ></RHFToggleButtonGroup>
      </Stack>

      <Stack>
        <Typography
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          {translate('ai_gen_programming_lng_title')}
          <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RprogrammingLanguageR'
          options={PROGRAMMING_LANGUAGE}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
          disabled={isTrackSelected}
        />
      </Stack>
      <Stack>
        <Typography
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          {translate('ai_gen_track_title')}
          <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
          <Button onClick={trackOptionsToggle}>
            <FaChevronDown size={15} />
          </Button>
        </Typography>
        <div style={trackOptions ? { visibility: 'visible' } : { visibility: 'hidden' }}>
          <RHFToggleButtonGroup
            name='RtrackR'
            options={TRACK}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
            onChange={RtrackRHandleChange}
          />
        </div>
      </Stack>
      <Stack sx={BTN_CONTAINER_STYLES}>
        <Button
          variant='contained'
          sx={nextBtnStyles}
          onClick={nextStep}
          type='submit'
        >
          {translate('ai_gen_next_btn')}
        </Button>
      </Stack>
    </Stack>
  )
}
