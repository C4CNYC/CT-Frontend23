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

import {
  BTN_CONTAINER_STYLES,
  getSkipBtnSx,
  NEXT_BUTTON_STYLES,
  PROMTS_VARIANTS,
  SIMPLE_GENERATE_TOGLE,
  SIMPLE_GENERATE_TOGLE_GROUP,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
} from './constants'

type ISimpleAiGenerateProps = {
  nextStep: () => void
  resetRoad: () => void
  isModal: boolean
  closeModal?: () => void
  updateForm: (name: string, value: string) => void
  redirectAfterComplete: (lessonId: string) => void
}

const SimpleAiGenerate = ({
  nextStep,
  resetRoad,
  isModal,
  closeModal,
  updateForm,
  redirectAfterComplete,
}: ISimpleAiGenerateProps) => {
  const theme = useTheme()
  const [textFieldValue, setTextFieldValue] = useState<null | string>(null)
  const skipBtnStyles = useMemo(
    () => getSkipBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const [generateLesson, { isLoading: generateLessonLoading }] = useGenerateLessonMutation()

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextFieldValue(event.target.value)
    setPromt(event.target.value)
    updateForm('RpromptR', event.target.value)
  }
  const handlePresetChange = (event: React.MouseEvent<HTMLElement>, newPromt: string) => {
    setPromt(newPromt)
    setTextFieldValue(newPromt)
  }

  const onSubmit = async () => {
    if (!textFieldValue) return
    const lesson = await generateLesson({ lessonPrompt: textFieldValue })
    if ('data' in lesson) {
      redirectAfterComplete(lesson.data.id)
      if (closeModal) closeModal()
    }
  }

  return (
    <Stack
      gap={2}
      sx={STEP_CONTAINER_STYLES}
      justifyContent='space-between'
    >
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
          color={theme.palette.mode === 'dark' ? '#616161' : '#333'}
        >
          Create beautiful coding lessons with Mumu 🐯
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
      <Stack gap={{ xs: 2, sm: 2, md: 8 }}>
        <Stack sx={{ gap: { xs: 1, sm: 1, md: 4 } }}>
          <ToggleButtonGroup
            size='large'
            onChange={handlePresetChange}
            aria-label='promt variants'
            exclusive
            sx={SIMPLE_GENERATE_TOGLE_GROUP}
          >
            {PROMTS_VARIANTS.map((el) => (
              <ToggleButton
                value={el.text}
                key={el.icon}
                sx={SIMPLE_GENERATE_TOGLE}
              >
                <Iconify
                  icon={el.icon}
                  color={el.color}
                  width={22}
                  height={22}
                />
                {el.text}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <RHFTextField
            placeholder='Enter prompt or select from above'
            multiline
            name='RpromptR'
            minRows={4}
            value={textFieldValue}
            required
            onChange={(e) => {
              handleChangeTextField(e)
            }}
          />
        </Stack>
        <Stack sx={BTN_CONTAINER_STYLES}>
          <Button
            variant='text'
            sx={skipBtnStyles}
            onClick={nextStep}
            disabled={!textFieldValue}
          >
            Advanced
          </Button>
          <Button
            variant='contained'
            sx={NEXT_BUTTON_STYLES}
            onClick={onSubmit}
            disabled={!textFieldValue}
          >
            Generate ✨
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SimpleAiGenerate
