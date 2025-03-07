import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  DialogActions,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import { useAddLessonToModuleMutation } from '@/redux/services/manager/modules-manager'
import { useTranslate } from '@/utils/translateHelper'
import { FormProvider, RHFSwitch, RHFTextField, useSnackbar } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { useProperties } from '@root/src/hooks/useProperties'
import {
  getToggleBtnGroupSx,
  TOGGLE_BUTTON_GROUP_STYLES,
} from '@root/src/sections/on-boarding-register/teacher/ai-generete-stepper/constants'

import { IntegrationsTab } from '../LessonStep/Modals/Preferences/IntegrationsTab'

import SkillsTab from './SkillsTab'

interface FormValuesProps {
  name: string
  description: string
  active: boolean
  independent: boolean
  head?: string
  type: 'practical' | 'exercise' | 'quiz'
  duration: number
  slug: string
  autoRun: boolean
  lock: boolean
}

export enum LessonTypeEnum {
  simple = 'simple',
  practical = 'practical',
  start_project = 'start_project',
  part_project = 'part_project',
  exercise = 'exercise',
  concept_exercises = 'concept_exercises',
  quiz = 'quiz',
  other = 'other',
}

interface IDefaultProps {
  name: string
  description: string
  active: boolean
  independent: boolean
  head?: string
  type: 'practical' | 'exercise' | 'quiz'
  duration?: Record<string, number> | null | undefined
  slug?: string
  autoRun?: boolean
  lock?: boolean
}

interface ICreateLessonDialogProps {
  defaultValues?: IDefaultProps
  children: React.ReactElement
  isEdit?: boolean
  id?: string
  contentId?: string
  refetch?: () => void
}

export default function CreateLessonDialog({
  id,
  isEdit,
  children,
  defaultValues,
  refetch,
}: ICreateLessonDialogProps): React.ReactElement {
  const theme = useTheme()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const translate = useTranslate()

  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)

  const [editLesson, { isLoading: isLoadingUpdate }] = useUpdateLessonMutation()
  const [createLesson, { isLoading: isLoadingCreate }] = useCreateLessonMutation()
  const [addLessonToModule, { isLoading: isLoadingAdd }] = useAddLessonToModuleMutation()

  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  const [autoRun, autoRunSet, autoRunDelete] = useProperties({
    entityType: 'lesson',
    entityId: id,
    propertyName: 'autoRun',
  })
  const [lessonLock, lessonLockSet, lessonLockDelete] = useProperties({
    entityType: 'lesson',
    entityId: id,
    propertyName: 'lock',
  })

  const timeConvertorToSeconds = (time: Record<string, number> | null | undefined) => {
    if (time) {
      return Object.entries(time).reduce((acc, [timeTipe, time]) => {
        if (timeTipe === 'minutes') {
          return (acc += time)
        }
        return (acc += time * 60 + acc * 60)
      }, 0)
    }
    return 0
  }

  const defaultLessonValue = {
    name: translate('default_values.createLesson.name'),
    description: translate('default_values.createLesson.description'),
    autoRun: false,
    lock: false,
    ...defaultValues,
    duration: timeConvertorToSeconds(defaultValues?.duration),
  }

  useEffect(() => {
    methods.reset({
      ...defaultLessonValue,
      autoRun: autoRun ? true : false,
      lock: lessonLock ? true : false,
    })
  }, [autoRun, lessonLock])
  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required(translate('required_name')),
    description: Yup.string().required(translate('required_description')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues: defaultLessonValue,
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    let lesson
    let lessonData = {
      ...data,
      duration: `${data.duration * 60}`,
      autoRun: undefined,
      lock: undefined,
    }
    try {
      if (isEdit && id) {
        lesson = await editLesson({ id, ...lessonData }).unwrap()
        data.autoRun ? autoRunSet('true') : autoRunDelete()
        data.lock ? lessonLockSet('true') : lessonLockDelete()
        if (refetch) refetch()
      } else {
        lesson = await createLesson(lessonData).unwrap()
        if (data.autoRun) {
          autoRunSet('true')
        }
        if (data.lock) {
          lessonLockSet('true')
        }
        if (refetch) refetch()
        if (router.query.module_id || router.query.moduleId) {
          addLessonToModule({
            id: (router.query.module_id || router.query.moduleId) as string,
            lesson_id: lesson.id,
          })
        }
        methods.reset()
      }
      enqueueSnackbar(translate(!isEdit ? 'messages_create_success' : 'messages_update_success'))
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      })
    }

    handleClose()
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }
  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 9999 }}
        PaperProps={{
          sx: {
            background: theme.palette.background.default,
          },
        }}
      >
        <DialogTitle>
          {isEdit ? translate('lessons_edit_lesson') : translate('lessons_create_lesson')}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {isEdit ? (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', pl: 2 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label={translate('main')}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={translate('skills')}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={translate('integration')}
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
            ) : null}
            <TabPanel
              value={value}
              index={0}
            >
              <Stack gap={2}>
                <RHFTextField
                  name='name'
                  label={translate('lessons_name')}
                  required
                />

                <RHFTextField
                  name='description'
                  label={translate('lessons_description')}
                  required
                  multiline
                  rows={3}
                />
                <Stack
                  direction='row'
                  gap={1}
                  mb={-1}
                  ml={1}
                >
                  <Typography
                    variant='h6'
                    color='#5C5C5C'
                  >
                    {translate('lessons_type')}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#5C5C5C'
                  >
                    {translate('lessons_type_select_one')}
                    <sup>{translate('lessons_type_select_one_star')}</sup>
                  </Typography>
                </Stack>
                <RHFToggleButtonGroup
                  name='type'
                  options={_mochLessonTypes}
                  sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
                  sxButton={toggleButtonStyles}
                  tooltip
                />

                <RHFTextField
                  name='slug'
                  label={translate('lessons_slug')}
                  size='small'
                />

                <RHFTextField
                  name='duration'
                  label={translate('lessons_duration')}
                  size='small'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>min</InputAdornment>,
                  }}
                />

                <Stack
                  direction='row'
                  flexWrap='wrap'
                  justifyContent='space-between'
                  sx={{ '& > *': { width: '45%' } }}
                >
                  <Tooltip
                    slotProps={{ popper: { disablePortal: true } }}
                    title={translate('lessons_active_tooltip')}
                  >
                    <Box>
                      <RHFSwitch
                        name='active'
                        label={translate('lessons_active')}
                      />
                    </Box>
                  </Tooltip>
                  <RHFSwitch
                    name='independent'
                    label={translate('lessons_independent_lesson')}
                  />
                  <Tooltip
                    slotProps={{ popper: { disablePortal: true } }}
                    title={translate('lessons_autoRun_tooltip')}
                  >
                    <Box>
                      <RHFSwitch
                        name='autoRun'
                        label={translate('lessons_autoRun')}
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    slotProps={{ popper: { disablePortal: true } }}
                    title={translate('lesson_lock_tooltip')}
                  >
                    <Box>
                      <RHFSwitch
                        name='lock'
                        label={translate('lessons_lock')}
                      />
                    </Box>
                  </Tooltip>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
            >
              <SkillsTab lessonId={id as string} />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
            >
              <IntegrationsTab contentId={id as string} />
            </TabPanel>
            {value === 0 ? (
              <DialogActions>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    {translate('actions_close')}
                  </Button>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    loading={isLoadingAdd || isLoadingCreate || isLoadingUpdate}
                  >
                    {translate('actions_save')}
                  </LoadingButton>
                </Box>
              </DialogActions>
            ) : (
              <DialogActions>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    {translate('actions_close')}
                  </Button>
                </Box>
              </DialogActions>
            )}
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            pt: { xs: 2, sm: 3 },
            width: { xs: '360px', sm: '440px', md: '500px', lg: '580px' },
            height: 'auto',
            minHeight: '400px',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

// @TODO: uncomment after updating backend

const _mochLessonTypes = [
  // {
  //   key: LessonTypeEnum.simple,
  //   value: 'Simple',
  //   tooltip: 'An engaging, single-page lesson with coding exercises.',
  //   icon: 'material-symbols:info-outline',
  // },
  {
    key: LessonTypeEnum.practical,
    value: 'Practical',
    tooltip: 'Building a project line-by-line with explanations and step-by-step guidance.',
    icon: 'material-symbols:info-outline',
  },
  // {
  //   key: LessonTypeEnum.start_project,
  //   value: 'Start of Project',
  //   tooltip:
  //     'The beginning lesson of a project. Subsequent lessons will build on the code typed here.',
  //   icon: 'material-symbols:info-outline',
  // },
  // {
  //   key: LessonTypeEnum.part_project,
  //   value: 'Part of Project',
  //   tooltip:
  //     'Build things with this lesson type: The code you type in one lesson, flows to the next, if the lesson is completed.',
  //   icon: 'material-symbols:info-outline',
  // },
  {
    key: LessonTypeEnum.exercise,
    value: 'Exercises',
    tooltip:
      'Exercises with instructions and examples. Great for reinforcing learning or evaluating competency.',
    icon: 'material-symbols:info-outline',
  },
  // {
  //   key: LessonTypeEnum.concept_exercises,
  //   value: 'Concept & Exercises',
  //   tooltip: 'Learn a concept, then immediately practice it in different ways.',
  //   icon: 'material-symbols:info-outline',
  // },
  // {
  //   key: LessonTypeEnum.quiz,
  //   value: 'Quiz',
  // },
  // {
  //   key: LessonTypeEnum.other,
  //   value: 'Other',
  // },
]
