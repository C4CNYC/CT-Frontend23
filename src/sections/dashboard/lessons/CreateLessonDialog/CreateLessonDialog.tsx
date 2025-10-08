import React, { useEffect } from 'react'
import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, DialogActions, Tab, Tabs, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, useSnackbar } from '@/components'
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import { useAddLessonToModuleMutation } from '@/redux/services/manager/modules-manager'
import { useTranslate } from '@/utils/translateHelper'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useProperties } from '@root/src/hooks/useProperties'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { LessonMeta } from '@root/src/redux/services/interfaces/lesson.interface'

import { IntegrationsTab } from '../LessonStep/Modals/Preferences/IntegrationsTab'

import { DisplayEngine } from './DisplayEngine'
import { MainTab } from './MainTab'
import { SettingsTab } from './SettingsTab'
import SkillsTab from './SkillsTab'
import { TabPanel } from './TabPanel'
import { handleConvertAutoRunToBolean, timeConvertorToSeconds, typeDefaultSettings } from './utils'

interface FormValuesProps {
  name: string
  description: string
  active: boolean
  independent: boolean
  head?: string
  type: LessonType
  duration: number
  slug: string
  lock: boolean
  meta: LessonMeta
  grading_method: 'autoRun' | 'manual'
}

export interface CreateLessonIDefaultProps {
  name: string
  description: string
  active: boolean
  independent: boolean
  head?: string
  type: LessonType
  duration?: Record<string, number> | null | undefined
  slug?: string
  lock?: boolean
  meta?: LessonMeta
  grading_method?: 'autoRun' | 'manual'
}

interface ICreateLessonDialogProps {
  defaultValues?: CreateLessonIDefaultProps
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
  const { value: open, onTrue: handleClickOpen, onFalse: handleClose } = useBoolean(false)

  const [editLesson, { isLoading: isLoadingUpdate }] = useUpdateLessonMutation()
  const [createLesson, { isLoading: isLoadingCreate }] = useCreateLessonMutation()
  const [addLessonToModule, { isLoading: isLoadingAdd }] = useAddLessonToModuleMutation()

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

  const defaultLessonValue = {
    name: translate('default_values.createLesson.name'),
    description: translate('default_values.createLesson.description'),
    grading_method: 'autoRun' as 'autoRun' | 'manual',
    lock: false,
    ...defaultValues,
    duration: timeConvertorToSeconds(defaultValues?.duration),
  }

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required(translate('required_name')),
    description: Yup.string().required(translate('required_description')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues: defaultLessonValue,
  })

  const gradingMethodWatcher = methods.watch('grading_method')
  const lessonTypeWatcher = methods.watch('type')

  useEffect(() => {
    const currentValues = methods.getValues()

    methods.reset({
      ...currentValues,
      grading_method: handleConvertAutoRunToBolean(autoRun) ? 'autoRun' : 'manual',
      lock: lessonLock ? true : false,
    })
  }, [autoRun, lessonLock])

  useEffect(() => {
    const currentValues = methods.getValues()

    methods.reset({
      ...currentValues,
      type: lessonTypeWatcher,
      grading_method: typeDefaultSettings(lessonTypeWatcher).autoRun ? 'autoRun' : 'manual',
    })
  }, [lessonTypeWatcher])

  useEffect(() => {
    if (gradingMethodWatcher === 'autoRun') {
      autoRunSet('true')
    } else if (gradingMethodWatcher === 'manual') {
      autoRunSet('false')
    }
  }, [gradingMethodWatcher])

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    let lesson
    let lessonData = {
      name: data.name,
      description: data.description,
      active: data.active,
      head: data.head,
      slug: data.slug,
      duration: `${data.duration * 60}`,
      independent: typeDefaultSettings(data.type).independent,
      type: data.type,
      meta: data.meta,
    }
    try {
      if (isEdit && id) {
        lesson = await editLesson({ id, ...lessonData }).unwrap()
        data.lock ? lessonLockSet('true') : lessonLockDelete()
        if (refetch) refetch()
      } else {
        lesson = await createLesson(lessonData).unwrap()
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
        fullWidth
        maxWidth={'sm'}
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
                    label={translate('settings')}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={translate('skills')}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label={translate('integration')}
                    {...a11yProps(3)}
                  />
                  <Tab
                    label={translate('type')}
                    {...a11yProps(4)}
                  />
                </Tabs>
              </Box>
            ) : null}
            <TabPanel
              value={value}
              index={0}
            >
              <MainTab />
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
            >
              <SettingsTab handleAutoRunSet={autoRunSet} />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
            >
              <SkillsTab lessonId={id as string} />
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
            >
              <IntegrationsTab contentId={id as string} />
            </TabPanel>
            <DisplayEngine open={value === 4} />
            <DialogActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <Button onClick={handleClose}>{translate('actions_close')}</Button>

                {[0, 1, 4].includes(value) ? (
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    loading={isLoadingAdd || isLoadingCreate || isLoadingUpdate}
                  >
                    {translate('actions_save')}
                  </LoadingButton>
                ) : null}
              </Box>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
