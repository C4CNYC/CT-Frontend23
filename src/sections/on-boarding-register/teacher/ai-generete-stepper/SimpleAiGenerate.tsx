import { useMemo, useState } from 'react'

import {
  Button,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'

import { Iconify } from '@root/src/components'

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
}

const SimpleAiGenerate = ({ nextStep, resetRoad, isModal, closeModal }: ISimpleAiGenerateProps) => {
  const theme = useTheme() 
  const [textFieldValue, setTextFieldValue] = useState<null | string>(null)
  const skipBtnStyles = useMemo(
    () => getSkipBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextFieldValue(event.target.value)
  }
  const handleChange = (event: React.MouseEvent<HTMLElement>, newPromt: string) => { 
    setTextFieldValue(newPromt)
  }

  const onSubmit = () => {
    // send promt || textFieldValue
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
            onChange={handleChange}            
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
          <TextField
            placeholder='Enter prompt or select from above'
            multiline
            minRows={4}
            value={textFieldValue}
            onChange={handleChangeTextField}
          />
        </Stack>
        <Stack sx={BTN_CONTAINER_STYLES}>
          <Button
            variant='text'
            sx={skipBtnStyles}
            onClick={nextStep}
          >
            Advanced
          </Button>
          <Button
            variant='contained'
            sx={NEXT_BUTTON_STYLES}
            onClick={onSubmit}
          >
            Generate ✨
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SimpleAiGenerate
