import { useMemo } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'

import { languages } from '@root/src/assets/data/languages'
import { Iconify, RHFSelect, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useGetLessonsByIdsQuery } from '@root/src/redux/services/manager/lessons-manager'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  BTN_CONTAINER_STYLES,
  getToggleBtnGroupSx,
  OPTIONAL_TYPO_STYLES,
  PROGRAMMING_LANGUAGE,
  getSkipBtnSx,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TRACK,
  TYPE_LESSON,
  LANG_CONT_SX,
  getNextBtnSx,
} from './constants'

type IGeneralInfoProps = {
  nextStep: () => void
  isModal: boolean
  closeModal?: () => void
  prevStep: () => void
  isCustomLang: boolean
}

export function GeneralInfo({
  nextStep,
  prevStep,
  isModal,
  closeModal,
  isCustomLang,
}: IGeneralInfoProps) {
  const { data: properties } = useGetPropertiesQuery({
    entityType: 'lesson',
    propertyName: 'aiTemplate',
  })
  const { data: aiTemplates } = useGetLessonsByIdsQuery(
    properties?.data.map((item) => item.entityId) ?? []
  )
  const theme = useTheme()
  const translate = useTranslate()
  const { value: trackOptions, onToggle: trackOptionsToggle } = useBoolean(false)
  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const skipBtnStyles = useMemo(
    () => getSkipBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const nextBtnStyles = useMemo(
    () => getNextBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  //type script wiening
  const type_lesson = (
    aiTemplates && aiTemplates.length > 0
      ? [
          ...TYPE_LESSON,
          ...aiTemplates.map((ait) => ({
            key: ait.id,
            value: ait.name,
            tooltip: ait.description,
            icon: 'material-symbols:info-outline',
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
          <Iconify
            icon='ion:chevron-back'
            width='30px'
          />
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
            <Iconify
              icon='ion:close'
              width='30px'
            />
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
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
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
          {translate('ai_gen_progr_lng_title')}
          <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RprogrammingLanguageR'
          options={PROGRAMMING_LANGUAGE}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
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
          />
        </div>
      </Stack>
      <Stack>
        <Typography
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          Language
        </Typography>
        <Typography
          variant='body2'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          {translate('ai_gen_lng_select_title')}
        </Typography>
        <Stack sx={LANG_CONT_SX}>
          <RHFSelect
            name='RlessonLanguageR'
            native
            disabled={isCustomLang}
            sx={{ maxWidth: '300px' }}
          >
            {languages.map((el) => (
              <option
                key={el.code}
                value={el.language}
              >
                {el.language}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            sx={{ maxWidth: '300px' }}
            name='RcustomLanguageR'
            placeholder={translate('ai_gen_lng_placeholder')}
          />
        </Stack>
      </Stack>
      <Stack sx={BTN_CONTAINER_STYLES}>
        {/* <Button
          variant='text'
          sx={skipBtnStyles}
          onClick={nextStep}
        >
          {translate('ai_gen_skip_btn')}
        </Button> */}
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
