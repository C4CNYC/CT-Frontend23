import { useMemo, useState } from 'react'

import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'

import { Iconify } from '@root/src/components'
import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'
import { useGenerateLessonMutation } from '@root/src/redux/services/manager/lessons-manager'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  BTN_CONTAINER_STYLES,
  getNextBtnSx,
  PROMTS_VARIANTS,
  SIMPLE_GENERATE_TOGLE,
  SIMPLE_GENERATE_TOGLE_GROUP,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
} from './constants'
import LoaderStep from './LoaderStep'

type ISimpleAiGenerateProps = {
  nextStep: () => void
  resetRoad: () => void
  isModal: boolean
  closeModal?: () => void
  updateForm: (name: string, value: string) => void
  getFormValue: (name: string) => string
  redirectAfterComplete: (lessonId: string) => void
}

const SimpleAiGenerate = ({
  nextStep,
  resetRoad,
  isModal,
  closeModal,
  updateForm,
  getFormValue,
  redirectAfterComplete,
}: ISimpleAiGenerateProps) => {
  const theme = useTheme()
  const translate = useTranslate()

  const [textFieldValue, setTextFieldValue] = useState<string>(getFormValue('RpromptR'))

  const [generateLesson, { isLoading: generateLessonLoading }] = useGenerateLessonMutation()

  const nextBtnStyles = useMemo(
    () => getNextBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextFieldValue(event.target.value)
    updateForm('RpromptR', event.target.value)
  }
  const handlePresetChange = (event: React.MouseEvent<HTMLElement>, newPrompt: string) => {
    setTextFieldValue(newPrompt)
    updateForm('RpromptR', newPrompt)
  }

  return (
    <Stack
      sx={STEP_CONTAINER_STYLES}
      justifyContent='space-between'
    >
      {generateLessonLoading ? (
        <LoaderStep isLoading={generateLessonLoading} />
      ) : (
        <>
          <Stack
            direction='row'
            sx={{ gap: 2, pl: isModal ? 1 : 0, alignItems: 'center' }}
          >
            {!isModal ? (
              <IconButton onClick={resetRoad}>
                <Iconify
                  icon='ion:chevron-back'
                  width='30px'
                />
              </IconButton>
            ) : null}
            <Typography
              variant='h3'
              sx={STEP_TYTLE_STYLES}
              color={theme.palette.mode === 'dark' ? '#B5B5B5' : '#333'}
            >
              {translate('ai_gen_simple_step_title')}
            </Typography>
            {isModal ? (
              <IconButton
                onClick={closeModal}
                sx={{ position: 'absolute', top: '-12px', right: '-12px' }}
              >
                <Iconify
                  icon='ion:close'
                  width='20px'
                />
              </IconButton>
            ) : null}
          </Stack>
          <Stack gap={{ xs: 2, sm: 2, md: 8 }}>
            <Stack sx={{ gap: { xs: 1, sm: 1, md: 4 }, px: { xs: 0, sm: 0, md: 4 } }}>
              <ToggleButtonGroup
                size='large'
                onChange={handlePresetChange}
                aria-label='promt variants'
                exclusive
                sx={SIMPLE_GENERATE_TOGLE_GROUP}
              >
                {PROMTS_VARIANTS.map((el) => (
                  <ToggleButton
                    value={el.key}
                    key={el.key}
                    sx={SIMPLE_GENERATE_TOGLE}
                  >
                    <Iconify
                      icon={el.icon}
                      color={el.color}
                      width={22}
                      height={22}
                    />
                    {translate(el.text)}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <RHFTextField
                placeholder={translate('ai_gen_simple_step_placeholder')}
                multiline
                name='RpromptR'
                minRows={3}
                required
                onChange={(e) => {
                  handleChangeTextField(e)
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#616161',
                      borderWidth: '2px',
                    },
                    background: theme.palette.mode === 'dark' ? '#1a2029' : '',
                  },
                }}
              />

              <Typography sx={{ color: '#616161', pl: 2, mt: { xs: 0, md: -2 } }}>
                {!textFieldValue ? translate('ai_gen_simple_step_error_text') : '\u00A0'}
              </Typography>
            </Stack>
            <Stack sx={BTN_CONTAINER_STYLES}>
              <Button
                variant='contained'
                sx={nextBtnStyles}
                onClick={nextStep}
                disabled={!textFieldValue}
              >
                {translate('ai_gen_next_btn')}
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default SimpleAiGenerate
