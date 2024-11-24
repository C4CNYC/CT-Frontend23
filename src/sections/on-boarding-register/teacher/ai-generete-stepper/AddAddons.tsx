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
import { useTranslate } from '@root/src/utils/translateHelper'

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
  const translate = useTranslate()

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
          {translate('ai_gen_addon_title')}
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
        {translate('ai_gen_addons_title')}
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
                {translate('ai_gen_addons_text_main_1')}
              </Typography>
              {translate('ai_gen_addons_text_sub_1')}
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
                {translate('ai_gen_addons_text_main_2')}
              </Typography>
              {translate('ai_gen_addons_text_sub_2')}
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
                {translate('ai_gen_addons_text_main_3')}
              </Typography>
              {translate('ai_gen_addons_text_sub_3')}
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
                {translate('ai_gen_addons_text_main_4')}
              </Typography>
              {translate('ai_gen_addons_text_sub_4')}
            </Typography>
          }
        />
        <TextField
          name=''
          placeholder={translate('ai_gen_addons_additional')}
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
          {translate('ai_gen_addons_diamond_1')}
          <i> {translate('ai_gen_addons_diamond_2')}</i>
          {translate('ai_gen_addons_diamond_3')}
        </Typography>
      </Stack>
      <Stack sx={BTN_CONTAINER_STYLES}>
        <Button
          variant='text'
          sx={skipBtnStyles}
          onClick={resetRoad}
        >
          {translate('ai_gen_decline_btn')}
        </Button>
        <Button
          variant='contained'
          sx={nextBtnStyles}
          onClick={() => {
            onSubmitAddons(addons)
          }}
        >
          {translate('ai_gen_addons_btn')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default AddAddons
