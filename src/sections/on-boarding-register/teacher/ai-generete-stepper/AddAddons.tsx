import { useMemo, useState } from 'react'

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'

import { Iconify } from '@root/src/components'

import {
  BTN_CONTAINER_STYLES,
  getSkipBtnSx,
  IAddAddonsProps,
  IAddons,
  getNextBtnSx,
  NOTE_DIAMOND_SX,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
} from './constants'

const AddAddons = ({ closeModal, resetRoad, onSubmitAddons }: IAddAddonsProps) => {
  const theme = useTheme()

  const [addons, setAddons] = useState<IAddons>({
    quiz: false,
    autoGrading: false,
    lessonPlan: false,
    revision: false,
  })

  const { quiz, autoGrading, lessonPlan, revision } = addons

  const skipBtnStyles = useMemo(
    () => getSkipBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const nextBtnStyles = useMemo(
    () => getNextBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddons({
      ...addons,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <Stack sx={STEP_CONTAINER_STYLES}>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
      >
        <Typography
          variant='h3'
          sx={STEP_TYTLE_STYLES}
        >
          Shiny New Things 💍 🤩
        </Typography>
        {closeModal ? (
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
      <Typography
        variant='h4'
        color='#A6A6A6'
      >
        Add any of the following to your lesson?
      </Typography>
      <Stack
        sx={{
          background:
            theme.palette.mode === 'dark' ? theme.palette.background.neutral : '#F0EEEE80',
          borderRadius: '20px',
          py: 3,
          px: 2,
          gap: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={quiz}
              onChange={handleChange}
              name='quiz'
            />
          }
          label={
            <Typography variant='body1'>
              <Typography
                variant='h5'
                display='inline-block'
                mr={1}
              >
                Quiz |
              </Typography>
              Multiple-choice, matching or fill-in-the-blanks
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={autoGrading}
              onChange={handleChange}
              name='autoGrading'
            />
          }
          label={
            <Typography variant='body1'>
              <Typography
                variant='h5'
                display='inline-block'
                mr={1}
              >
                Auto-grading |
              </Typography>
              Using regex: Create tests which check if the correct solution code was typed.
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={lessonPlan}
              onChange={handleChange}
              name='lessonPlan'
            />
          }
          label={
            <Typography variant='body1'>
              <Typography
                variant='h5'
                display='inline-block'
                mr={1}
              >
                Lesson Plan |
              </Typography>
              Ice-breakers, lesson overview, group discussion, synthesizing and more.
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={revision}
              onChange={handleChange}
              name='revision'
            />
          }
          label={
            <Typography variant='body1'>
              <Typography
                variant='h5'
                display='inline-block'
                mr={1}
              >
                Revision & Improvement |
              </Typography>
              Request a full review and stress testing to ensure the lesson content and flow is
              accurate, relevant and lively.
            </Typography>
          }
        />
        <TextField
          name=''
          placeholder='Additional Request'
        />
      </Stack>
      <Stack sx={NOTE_DIAMOND_SX}>
        <Iconify
          icon='system-uicons:diamond'
          width={26}
          color={'#43D4DD'}
        />
        <Typography
          ml={2}
          variant='body2'
        >
          Note: This feature may be limited to <i>DIAMOND</i> accounts.
        </Typography>
      </Stack>
      <Stack sx={BTN_CONTAINER_STYLES}>
        <Button
          variant='text'
          sx={skipBtnStyles}
          onClick={resetRoad}
        >
          Decline
        </Button>
        <Button
          variant='contained'
          sx={nextBtnStyles}
          onClick={() => {
            onSubmitAddons(addons)
          }}
        >
          Request Add-ons
        </Button>
      </Stack>
    </Stack>
  )
}

export default AddAddons
