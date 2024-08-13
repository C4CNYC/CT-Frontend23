import React from 'react'
import { useState } from 'react'

import { javascript } from '@codemirror/lang-javascript'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, DialogActions, Stack, Tab, Tabs, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import {
  FormProvider,
  RHFCode,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  useSnackbar,
} from '@/components'
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import { useAddLessonToModuleMutation } from '@/redux/services/manager/modules-manager'
import { useTranslate } from '@/utils/translateHelper'

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
}

interface IDefaultProps {
  name: string
  description: string
  active: boolean
  independent: boolean
  head?: string
  type: 'practical' | 'exercise' | 'quiz'
  duration?: Record<string, number> | null | undefined
}

interface ICreateLessonDialogProps {
  defaultValues?: IDefaultProps
  children: React.ReactElement
  isEdit?: boolean
  id?: string
  contentId?: string
}

export default function CreateLessonDialog({
  id,
  isEdit,
  children,
  defaultValues,
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

  const isRTL = theme.direction === 'rtl'

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
    ...defaultValues,
    duration: timeConvertorToSeconds(defaultValues?.duration),
  }

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
    try {
      if (isEdit && id) {
        await editLesson({
          id,
          ...data,
          duration: `${data.duration * 60}`,
        }).unwrap()
      } else {
        const lesson = await createLesson({
          ...data,
          duration: `${data.duration * 60}`,
        }).unwrap()
        if (router.query.module_id) {
          addLessonToModule({
            id: router.query.module_id as string,
            lesson_id: lesson.id,
          })
        }
        methods.reset()
      }
      enqueueSnackbar(
        !isEdit ? translate('messages_create_success') : translate('messages_update_success')
      )
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
                    sx={{
                      ...(isRTL && {
                        ml: 3,
                      }),
                    }}
                  />
                  <Tab
                    label={translate('integration')}
                    {...a11yProps(2)}
                    sx={{
                      ...(isRTL && {
                        ml: 3,
                      }),
                    }}
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

                <RHFCode
                  placeholder={translate('integrations_head_links_plh')}
                  name='head'
                  height='180px'
                  extensions={[javascript({ jsx: true })]}
                />

                <RHFTextField
                  name='duration'
                  label='duration'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>min</InputAdornment>,
                  }}
                />

                <RHFSelect
                  native
                  name='type'
                  size='small'
                  label='Lesson type'
                >
                  <option
                    key='practical'
                    value='practical'
                  >
                    {translate('lessons_practical')}
                  </option>
                  <option
                    key='exercise'
                    value='exercise'
                  >
                    {translate('lessons_exercise')}
                  </option>
                  <option
                    key='exercise1'
                    value='exercise1'
                  >
                    {translate('Lesson type 2')}
                  </option>
                  <option
                    key='exercise2'
                    value='exercise2'
                  >
                    {translate('Lesson type 3')}
                  </option>
                </RHFSelect>
                <RHFSwitch
                  name='active'
                  label={translate('lessons_active')}
                />

                <RHFSwitch
                  name='independent'
                  label={translate('lessons_inependent_lesson')}
                />
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
