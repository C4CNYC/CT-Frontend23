import { useEffect, useMemo, useState } from 'react'

import { Avatar, FormGroup, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

import { RHFSelect, RHFTextField } from '@/components'
import { RHFRemirror } from '@/components/hook-form/RHFRemirror'
import { AssignmentTypes } from '@/redux/enums/assignment-types.enum'
import { ICourse } from '@/redux/services/interfaces/courseUnits.interface'
import { InitialDescriptionValueType } from '@/types'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'

import { AVATAR_SX, INPUT_TEXT_SX, inputNameStyles, selectStyle } from './constants'

export default function DetailsStep({
  coursesData,
  methods,
  initialValue,
}: {
  coursesData: {
    data: Array<ICourse & BaseResponseInterface> | undefined
    isLoading: boolean
  }
  methods: UseFormReturn<any>
  initialValue: InitialDescriptionValueType
}): React.ReactElement {
  const theme = useTheme()
  const { data, isLoading } = coursesData
  const [type, setType] = useState<AssignmentTypes>(AssignmentTypes.COURSE)
  const [course, setCourse] = useState<string | null>()
  const translate = useTranslate()

  const selectedModules = useMemo(() => data?.find((c) => c.id === course)?.units, [data, course])

  useEffect(() => {
    setCourse(methods.getValues('course') ?? data?.[0]?.id)
  }, [data])

  return (
    <Stack sx={{ gap: 4, minHeight: '630px' }}>
      <Stack
        direction='row'
        gap={3}
        flexWrap='wrap'
      >
        <FormGroup
          sx={{
            maxWidth: { xs: '100%', sm: '100%', md: '300px' },
            width: '100%',
          }}
        >
          <Typography
            variant='h5'
            gutterBottom
            pl={2}
          >
            {translate('quest_select_type')}
          </Typography>
          <RHFSelect
            native
            name='type'
            size='small'
            onChange={(event: any) => {
              setType(event?.target?.value)
              setCourse(null)
            }}
            value={type}
            sx={{ ...selectStyle(theme), textTransform: 'capitalize' }}
          >
            <option
              key='empty'
              value='empty'
            ></option>
            {Object.keys(AssignmentTypes).map((t) => (
              <option
                key={AssignmentTypes[t as keyof typeof AssignmentTypes]}
                value={AssignmentTypes[t as keyof typeof AssignmentTypes]}
              >
                {t.split('_').join(' ').charAt(0).toUpperCase() +
                  t.split('_').join(' ').slice(1).toLowerCase()}
              </option>
            ))}
          </RHFSelect>
        </FormGroup>
        {type === AssignmentTypes.COURSE && (
          <FormGroup
            sx={{
              maxWidth: { xs: '100%', sm: '100%', md: '300px' },
              width: '100%',
            }}
          >
            <Typography
              variant='h5'
              gutterBottom
              pl={2}
            >
              {translate('quest_select_course')}
            </Typography>
            {!isLoading ? (
              <RHFSelect
                native
                name='course'
                size='small'
                onChange={(event: any) => {
                  methods.setValue('course', event?.target?.value)
                  setCourse(event?.target?.value)
                }}
                disabled={!data?.length}
                sx={selectStyle(theme)}
              >
                {!data?.length && (
                  <option
                    key='empty'
                    value='empty'
                  >
                    {translate('quest_you_dont_have_courses_msg')}
                  </option>
                )}
                {data
                  ? data.map((course) => (
                      <option
                        key={course.id}
                        value={course.id}
                      >
                        {course.name}
                      </option>
                    ))
                  : null}
              </RHFSelect>
            ) : (
              <Skeleton
                variant='rounded'
                sx={(theme) => ({
                  height: '40px',
                  background: theme.palette.common.white,
                })}
              />
            )}
          </FormGroup>
        )}
      </Stack>
      <FormGroup
        sx={{
          maxWidth: { xs: '100%', sm: '100%', md: '300px' },
          width: '100%',
        }}
      >
        <Typography
          variant='h5'
          gutterBottom
          pl={2}
        >
          {translate('auest_select_module')}
        </Typography>
        {!isLoading ? (
          <RHFSelect
            native
            name='module'
            size='small'
            sx={{
              borderRadius: 1,
              '& fieldset': { border: 'none' },
              background: theme.palette.mode === 'light' ? '#fff' : '',
              border: theme.palette.mode === 'light' ? '' : '1px solid #fff',
            }}
          >
            {!selectedModules?.length && (
              <option
                key='empty'
                value='empty'
              >
                {translate('quest_you_dont_have_module_msg')}
              </option>
            )}
            {selectedModules
              ? [
                  <option
                    key='module'
                    value='all'
                  >
                    {translate('quest_all_modules')}
                  </option>,
                  ...selectedModules.map((unit) => (
                    <option
                      key={unit.id}
                      value={unit.id}
                    >
                      {unit.name}
                    </option>
                  )),
                ]
              : null}
          </RHFSelect>
        ) : (
          <Skeleton
            variant='rounded'
            sx={(theme) => ({
              height: '40px',
              background: theme.palette.common.white,
            })}
          />
        )}
      </FormGroup>
      <FormGroup sx={{ position: 'relative' }}>
        <Typography
          variant='h5'
          gutterBottom
          pl={2}
        >
          {translate('quest_name')}
        </Typography>
        <Avatar sx={AVATAR_SX}>🤩</Avatar>
        <RHFTextField
          sx={inputNameStyles(theme)}
          name='name'
        />
        <Typography
          variant='caption'
          sx={INPUT_TEXT_SX}
        >
          {translate('quest_edit_name_msg')}
        </Typography>
      </FormGroup>
      <FormGroup>
        <Typography
          variant='h5'
          gutterBottom
          pl={2}
        >
          {translate('quest_description')}
        </Typography>
        <RHFRemirror
          initialValue={initialValue}
          name='description'
        />
      </FormGroup>
    </Stack>
  )
}
