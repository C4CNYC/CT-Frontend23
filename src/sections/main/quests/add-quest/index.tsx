import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Button,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline'
import { TbListDetails } from '@react-icons/all-files/tb/TbListDetails'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator'

import { FormProvider, useSnackbar } from '@/components'
import CustomTabPanel, { customTabProps } from '@/components/custom-tab-panel'
import { AssignmentTypes } from '@/redux/enums/assignment-types.enum'
import { ISkill } from '@/redux/interfaces/content.interface'
import {
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
  useUpdateClassAssignmentMutation,
  useUpdateCourseAssignmentMutation,
} from '@/redux/services/manager/assignments-manager'
import { useManagerGetCourseQuery } from '@/redux/services/manager/courses-manager'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'

import {
  CONTAINER_INNER_SX,
  DATE_FORMAT,
  DATE_PARSER,
  DAYS_TO_CLOSE,
  DAYS_TO_END,
  TABS_SX,
  TOOLTIP_TEXT,
  mainContainerStyles,
} from './constants'
import DetailsStep from './DetailsStep'
import { CreateQuestSchema } from './helpers/create-quest.schema'
import { FormQuestProps } from './helpers/quest.interface'
import SettingsStep from './SettingsStep'

export default function AddQuest(): React.ReactElement {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { query, push, reload } = useRouter()
  const translate = useTranslate()
  const [assignmentsSkillsId, setAssignmentsSkillsId] = useState<ISkill[]>()
  const [value, setValue] = useState(0)
  const RANDOM_NAME = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: ' ',
    length: 2,
    style: 'capital',
  })

  const { data: assignment, isLoading: isAssignmentLoading } = useGetAssignmentQuery(
    {
      schoolId: query.schoolId as string,
      assignmentId: query.assignmentId as string,
    },
    { skip: !query.assignmentId || !query.schoolId }
  )
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation()
  const [updateAssignment, { isLoading: isUpdating }] = useUpdateAssignmentMutation()
  const [addCourseToAssignment, { isLoading: isAddingToClass }] =
    useUpdateCourseAssignmentMutation()
  const [addAssignmentToClass] = useUpdateClassAssignmentMutation()

  const coursesData = useManagerGetCourseQuery({})

  useEffect(() => {
    if (assignment) {
      methods.reset({
        name: assignment?.name,
        description: JSON.parse(assignment?.description ?? '{}'),
        type: assignment?.type ?? AssignmentTypes.COURSE,
        module: assignment?.courseUnit?.id,
        course: assignment?.course?.id,
        startDate: format(DATE_PARSER(assignment?.start_date), DATE_FORMAT),
        dueDate: format(DATE_PARSER(assignment?.end_date), DATE_FORMAT),
        closeDate: format(DATE_PARSER(assignment?.close_date), DATE_FORMAT),
        active: assignment?.active,
      })
    }
  }, [isAssignmentLoading])

  useEffect(() => {
    if (coursesData?.data?.data[0]?.id && !methods.getValues().course) {
      methods.setValue('course', coursesData.data?.data[0]?.id)
    }
  }, [coursesData])

  const methods = useForm<FormQuestProps>({
    resolver: yupResolver(CreateQuestSchema),
    mode: 'all',
    defaultValues: {
      name: assignment?.name ?? RANDOM_NAME,
      description: JSON.parse(assignment?.description ?? '{}'),
      type: assignment?.type ?? AssignmentTypes.COURSE,
      course: assignment?.course?.id ?? coursesData.data?.data[0]?.id,
      startDate: format(DATE_PARSER(assignment?.start_date), DATE_FORMAT),
      dueDate: format(DATE_PARSER(assignment?.end_date, DAYS_TO_END), DATE_FORMAT),
      closeDate: format(DATE_PARSER(assignment?.close_date, DAYS_TO_CLOSE), DATE_FORMAT),
      active: assignment?.active ?? true,
    },
  })

  const onSubmit = async (formData: FormQuestProps) => {
    if (assignment) {
      try {
        updateAssignment({
          schoolId: query.schoolId as string,
          assignmentId: query.assignmentId as string,
          name: formData.name,
          description: JSON.stringify(formData.description ?? {}),
          start_date: formData.startDate,
          end_date: formData.dueDate,
          close_date: formData.closeDate,
          active: Boolean(formData.active),
          courseUnitId: formData.module,
        }).unwrap()
        await addAssignmentToClass({
          assignmentId: assignment.id,
          schoolId: query.schoolId as string,
          class_id: query.id as string,
        }).unwrap()
        await addCourseToAssignment({
          assignmentId: assignment.id,
          schoolId: query.schoolId as string,
          course_id: formData.course,
        }).unwrap()
        enqueueSnackbar(translate('assignments_updated_successfuly'))
        push(
          STUDENT_PATH_DASHBOARD.class.id(query.id as string, {
            schoolId: query.schoolId as string,
            assignmentId: assignment.id,
          })
        )
      } catch (error: any) {
        enqueueSnackbar(error.data.message, {
          variant: 'error',
        })
      }
    } else {
      try {
        const newAssignment = await createAssignment({
          schoolId: query.schoolId as string,
          name: formData.name,
          description: JSON.stringify(formData.description),
          type: formData.type,
          start_date: formData.startDate,
          end_date: formData.dueDate,
          close_date: formData.closeDate,
          courseUnitId: formData.module,
          active: Boolean(formData.active),
          skill_tags: assignmentsSkillsId?.map((el) => el.id) ?? [],
          classes: [query.id as string],
        }).unwrap()
        await addAssignmentToClass({
          assignmentId: newAssignment.id,
          schoolId: query.schoolId as string,
          class_id: query.id as string,
        }).unwrap()
        await addCourseToAssignment({
          assignmentId: newAssignment.id,
          schoolId: query.schoolId as string,
          course_id: formData.course,
        })
        push(
          STUDENT_PATH_DASHBOARD.class.id(query.id as string, {
            schoolId: query.schoolId as string,
            assignmentId: newAssignment.id,
            ...(query.onBoarding ? { onBoarding: 'on-boarding' } : {}),
          })
        )
        enqueueSnackbar(translate('assignments_created_successfuly'))
      } catch (error: any) {
        enqueueSnackbar(error.data.message, {
          variant: 'error',
        })
      }
    }
  }

  if (isAssignmentLoading && query.assignmentId) {
    return (
      <Skeleton
        variant='rounded'
        sx={{ height: '988px', maxWidth: '1152px', borderRadius: 4 }}
      />
    )
  }

  return (
    <>
      <Stack sx={mainContainerStyles(theme)}>
        <Stack sx={CONTAINER_INNER_SX}>
          <Stack>
            <Typography variant='h2'>{translate('actions_add_quest')}</Typography>
            <Tooltip title={<Typography variant='body2'>{TOOLTIP_TEXT}</Typography>}>
              <Typography
                variant='caption'
                sx={{ textDecoration: 'underline' }}
              >
                {translate('quest_whats_quest')}
              </Typography>
            </Tooltip>
          </Stack>
          <Typography
            variant='subtitle2'
            textAlign='left'
          >
            {translate('quest_type')}
          </Typography>
        </Stack>
        <Box sx={{ px: { xs: 1, sm: 3, md: 5, lg: 12 } }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Tabs
              onChange={(_: any, newValue: number) => {
                setValue(newValue)
              }}
              value={value}
              scrollButtons={false}
              sx={TABS_SX}
            >
              <Tab
                label={translate('details')}
                icon={<TbListDetails size={20} />}
                sx={{ fontSize: '1.1rem' }}
                {...customTabProps(0)}
              />
              <Tab
                label={translate('settings')}
                icon={<IoSettingsOutline size={20} />}
                sx={{ fontSize: '1.1rem' }}
                {...customTabProps(0)}
              />
            </Tabs>

            <CustomTabPanel
              value={value}
              index={0}
            >
              {!isLoading && (
                <DetailsStep
                  methods={methods}
                  initialValue={JSON.parse(assignment?.description ?? '{}')?.doc}
                  coursesData={{
                    data: coursesData.data?.data,
                    isLoading: coursesData.isLoading,
                  }}
                />
              )}
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={1}
            >
              <SettingsStep
                control={methods.control}
                setAssignmentsSkillsId={(s: ISkill[]) => {
                  setAssignmentsSkillsId(s)
                }}
                assignmentsSkillsId={assignmentsSkillsId}
                existedSkills={assignment?.skill_tags ?? []}
              />
            </CustomTabPanel>
            <Stack
              mt={3}
              gap={3}
              flexDirection='row'
              justifyContent='flex-end'
            >
              <Button
                onClick={() => {
                  push(STUDENT_PATH_DASHBOARD.class.id(query.id as string))
                }}
                size='large'
                variant='soft'
                color='error'
              >
                {translate('actions_cancel')}
              </Button>
              <LoadingButton
                type='submit'
                color='secondary'
                variant='contained'
                loading={isLoading || isUpdating || isAddingToClass}
              >
                {assignment ? translate('actions_update') : translate('actions_launch')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </>
  )
}
