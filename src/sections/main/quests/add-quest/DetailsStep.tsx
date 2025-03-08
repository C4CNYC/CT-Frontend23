import { useEffect, useMemo, useState } from 'react'

import { Avatar, FormGroup, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

import { FilterMode, useFilters } from '@/hooks'
import { AssignmentTypes, AssignmentTypesForQuest } from '@/redux/enums/assignment-types.enum'
import { ICourse, ILessonSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
import { useGetOwnLessonsQuery } from '@/redux/services/manager/lessons-manager'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { RHFSelect } from '@root/src/components/hook-form/RHFSelect'
import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'

import { AVATAR_SX, INPUT_TEXT_SX, inputNameStyles, selectStyle } from './constants'

export default function DetailsStep({
  coursesData,
  methods,
  initialType,
  initialLesson,
}: {
  coursesData: {
    data: Array<ICourse & BaseResponseInterface> | undefined
    isLoading: boolean
  }
  methods: UseFormReturn<any>
  initialType: AssignmentTypes | undefined
  initialLesson: string | undefined
}): React.ReactElement {
  const theme = useTheme()
  const { data, isLoading } = coursesData
  const [type, setType] = useState<AssignmentTypes>(initialType || AssignmentTypes.COURSE)
  const [course, setCourse] = useState<string | null>()
  const [lesson, setLesson] = useState<string | undefined>(initialLesson || undefined)
  const [module, setModule] = useState<string | undefined>()
  const translate = useTranslate()

  const selectedModules = useMemo(() => data?.find((c) => c.id === course)?.units, [data, course])
  const { filters } = useFilters<ILessonSearchParams>(
    {
      take: 25,
      module_id: '',
      name: '',
    },
    FilterMode.global
  )

  const {
    data: lessons,
    isLoading: lessonLoading,
    isFetching: lessonFetching,
  } = useGetOwnLessonsQuery(filters)

  useEffect(() => {
    setCourse(methods.getValues('course'))
  }, [data])

  if (!course && data) {
    setCourse(data[0]?.id)
  }

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
              methods.setValue('type', event?.target?.value)
            }}
            value={type}
            sx={{ ...selectStyle(theme), textTransform: 'capitalize' }}
          >
            <option
              key='empty'
              value='empty'
            ></option>
            {Object.keys(AssignmentTypesForQuest).map((t) => (
              <option
                key={AssignmentTypesForQuest[t as keyof typeof AssignmentTypesForQuest]}
                value={AssignmentTypesForQuest[t as keyof typeof AssignmentTypesForQuest]}
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
                {!data?.length ? (
                  <option
                    key='empty'
                    value='empty'
                  >
                    {translate('quest_you_dont_have_courses_msg')}
                  </option>
                ) : (
                  <option
                    key='empty'
                    value='empty'
                  ></option>
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
        {type === AssignmentTypes.MY_CREATIONS ? (
          <>
            <Typography
              variant='h5'
              gutterBottom
              pl={2}
            >
              Select lesson
            </Typography>
            {!lessonLoading ? (
              <RHFSelect
                native
                name='lesson'
                value={lesson}
                size='small'
                onChange={(event: any) => {
                  setLesson(event?.target?.value)
                  methods.setValue('lesson', event?.target?.value)
                }}
                sx={{
                  borderRadius: 1,
                  '& fieldset': { border: 'none' },
                  background: theme.palette.mode === 'light' ? '#fff' : '',
                  border: theme.palette.mode === 'light' ? '' : '1px solid #fff',
                }}
              >
                {!lessons?.data?.length && (
                  <option
                    key='empty'
                    value='empty'
                  >
                    You don't have any lessons
                  </option>
                )}
                {lessons?.data
                  ? [
                      <option
                        key='module'
                        value='all'
                      >
                        All lessons
                      </option>,
                      ...lessons?.data?.map((lesson) => (
                        <option
                          key={lesson.id}
                          value={lesson.id}
                        >
                          {lesson.name}
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
          </>
        ) : (
          <>
            <Typography
              variant='h5'
              gutterBottom
              pl={2}
            >
              {translate('quest_select_module')}
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
                onChange={(event: any) => {
                  setModule(event.target.value)
                  methods.setValue('module', event.target.value)
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
          </>
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
        <RHFTextField name='description' />
      </FormGroup>
    </Stack>
  )
}
