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
import { useProperties } from '@root/src/hooks/useProperties'

import { IntegrationsTab } from '../LessonStep/Modals/Preferences/IntegrationsTab'

import { FormValuesProps, ICreateLessonDialogProps, timeConvertorToSeconds } from './constants'
import { MainTab } from './MainTab'
import SkillsTab from './SkillsTab'

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
    autoRun: false,
    lock: false,
    ...defaultValues,
    duration: timeConvertorToSeconds(defaultValues?.duration),
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const CreateLessonSchema = Yup.object().shape({
    name: Yup.string().required(translate('required_name')),
    description: Yup.string().required(translate('required_description')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonSchema),
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

  useEffect(() => {
    methods.reset({
      ...defaultLessonValue,
      lock: lessonLock ? true : false,
    })
  }, [autoRun, lessonLock])

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
              <MainTab />
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
            {value !== 1 ? (
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
            minHeight: { xs: 'auto', md: '845px' },
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
