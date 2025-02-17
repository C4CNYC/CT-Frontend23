import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { FormControlLabel, MenuItem, Stack, Switch, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFSelect, useSnackbar } from '@/components'
import { useUpdateStudentProfileMutation } from '@/redux/services/auth'
import { useTranslate } from '@/utils/translateHelper'
import {
  days_list,
  leap_years,
  month_names_short,
  schort_month,
  years_list,
} from '@root/src/assets/data/time-data'
import { STUDENT_PATH_PAGE } from '@root/src/routes/student.paths'

import { styledRegisterInput } from '../styles'
import { SUBMIT_BTN_SX } from '../teacher/constants'

interface FormValueProps {
  day: string
  mounth: string
  year: string
}

export default function StepperInfo(): React.ReactElement {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [updateUser] = useUpdateStudentProfileMutation()
  const translate = useTranslate()
  const CreateInfoSchema = Yup.object().shape({
    day: Yup.string().required('Please select day'),
    mounth: Yup.string().required('Please select mounth'),
    year: Yup.string().required('Please select year'),
  })

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateInfoSchema),
    mode: 'onChange',
    defaultValues: {},
  })

  const onSubmit = async (data: FormValueProps) => {
    try {
      // await updateUser({
      // country: data.country ? data.country.toLowerCase() : undefined,
      // birthDate: data.birthDate,
      // }).unwrap()
      router.push(STUDENT_PATH_PAGE.home)
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const currentMonth = methods.watch('mounth')
  const currentYear = methods.watch('year')

  const getDaysCount = () => {
    if (schort_month.includes(currentMonth)) {
      return days_list.slice(0, -1)
    }
    if (currentMonth === 'Feb') {
      if (leap_years.includes(currentYear)) {
        return days_list.slice(0, -2)
      } else {
        return days_list.slice(0, -3)
      }
    }
    return days_list
  }

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack
          direction='row'
          sx={{ alignItems: 'baseline', ml: { xs: 3, sm: 3, md: 0 }, mt: 3 }}
        >
          <Typography variant='h3'>{translate('register_birth_date')}</Typography>
          <Typography
            variant='h2'
            sx={{ display: 'inline-flex', ml: 1 }}
          >
            🎂
          </Typography>
        </Stack>
        <Typography
          variant='body1'
          sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}
        >
          {translate('register_help_assign')}
        </Typography>
        <Stack
          direction='row'
          py={4}
          gap={2}
        >
          <RHFSelect
            native={false}
            name='mounth'
            label={translate('student_birth_data_month')}
            sx={(theme) => ({
              ...styledRegisterInput(theme, {
                '& .MuiInputBase-root': {
                  height: '52px',
                  background: theme.palette.mode === 'light' ? '#efefef' : 'initial',
                  fontSize: '1.2rem',
                },
              }),
            })}
            defaultValue={'MM'}
          >
            <MenuItem
              value='MM'
              disabled
              sx={{ '&.MuiMenuItem-root': { fontSize: '1.1rem!important' } }}
            >
              MM
            </MenuItem>
            {month_names_short.map((month) => (
              <MenuItem
                sx={{ '&.MuiMenuItem-root': { fontSize: '1.1rem!important' } }}
                key={month}
                value={month}
              >
                {month}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect
            name='day'
            label={translate('student_birth_data_day')}
            sx={(theme) => ({
              ...styledRegisterInput(theme, {
                '& .MuiInputBase-root': {
                  height: '52px',
                  background: theme.palette.mode === 'light' ? '#efefef' : 'initial',
                  fontSize: '1.2rem',
                },
              }),
            })}
            defaultValue={'DD'}
            native={false}
          >
            <MenuItem
              value='DD'
              disabled
              sx={{ '&.MuiMenuItem-root': { fontSize: '1.2rem!important' } }}
            >
              DD
            </MenuItem>
            {getDaysCount().map((day) => (
              <MenuItem
                sx={{ '&.MuiMenuItem-root': { fontSize: '1.2rem!important' } }}
                key={day}
                value={day}
              >
                {day}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect
            native={false}
            name='year'
            label={translate('student_birth_data_year')}
            sx={(theme) => ({
              ...styledRegisterInput(theme, {
                '& .MuiInputBase-root': {
                  height: '52px',
                  background: theme.palette.mode === 'light' ? '#efefef' : 'initial',
                  fontSize: '1.2rem',
                },
              }),
            })}
            defaultValue={'2010'}
          >
            <MenuItem
              value={'YYYY'}
              sx={{ '&.MuiMenuItem-root': { fontSize: '1.1rem!important' } }}
              disabled
            >
              YYYY
            </MenuItem>

            {years_list.map((year) => (
              <MenuItem
                sx={{ '&.MuiMenuItem-root': { fontSize: '1.2rem!important' } }}
                key={year}
                value={year}
              >
                {year}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
        <LoadingButton
          type='submit'
          loading={methods.formState.isSubmitting}
          sx={SUBMIT_BTN_SX}
        >
          {translate('register_all_done')}
        </LoadingButton>
        <Stack
          pt={4}
          pr={2}
          alignItems='flex-start'
        >
          <FormControlLabel
            sx={{ width: '100%', justifyContent: 'space-between' }}
            control={<Switch />}
            label={translate('send_welcome_emails')}
            labelPlacement='start'
          />
        </Stack>
      </FormProvider>
    </>
  )
}
