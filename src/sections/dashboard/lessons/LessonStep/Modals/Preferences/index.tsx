import React, { useState } from 'react'

import { javascript } from '@codemirror/lang-javascript'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'
import omit from 'lodash-es/omit'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFCode, RHFTextField } from '@/components'
import { ModalCodeFullscreen } from '@/components/modal-code-fullscreen'
import { LessonContentType } from '@/redux/enums/lesson-content-type.enum'
import { LessonContentComplexity } from '@/redux/services/enums/lesson-content-complexity.enum'
import { useUpdateLessonContentMutation } from '@/redux/services/manager/lesson-content-manager'
import { useTranslate } from '@/utils/translateHelper'
import { MediaModal } from '@root/src/sections/dashboard/medias/MediaModal'

import { GeneralTab } from './GeneralTab'
import PreloadTab from './preload-tab'

interface FormValuesProps {
  slug: string
  title: string
  description: string
  active: boolean
  draft: boolean
  tags: string[]
  complexity: LessonContentComplexity
  preload_body: string
  solution_body: string
  body?: string
  type?: LessonContentType
  cover?: string
}

interface Props {
  children?: React.ReactElement
  lessonId: string
  contentId: string
  defaultValues?: FormValuesProps
  defaultTab?: number
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Preferences({
  children,
  lessonId,
  contentId,
  defaultValues = {
    active: false,
    draft: false,
    complexity: LessonContentComplexity.Beginner,
    slug: '',
    title: '',
    cover: '',
    description: '',
    preload_body: '',
    solution_body: '',
    tags: [],
  },
  defaultTab = 0,
}: Props): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false)
  const [value, setValue] = useState(defaultTab)
  const translate = useTranslate()

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const CreateLessonDemoSchema = Yup.object().shape({
    title: Yup.string().required(translate('required_title')),
    skills: Yup.array(),
  })

  const { enqueueSnackbar } = useSnackbar()
  const [updateLessonContent, { isLoading }] = useUpdateLessonContentMutation()
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonDemoSchema),
    defaultValues,
  })

  const insertImage = (imageAttributes: any) => {
    methods.setValue('cover', imageAttributes.src)
  }

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    if (!data.body) {
      delete data.body
    }
    try {
      await updateLessonContent({
        lessonId,
        ...omit(data, ['body', 'createdAt', 'updatedAt']),
        type: defaultValues?.type,
        id: contentId,
      }).unwrap()
      enqueueSnackbar(translate('step_updated'))
      setOpenDialog(false)
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
        title={translate('lesson_step_preferences')}
      >
        {children}
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
      >
        <DialogTitle
          variant='h5'
          sx={{ pb: 1, pt: 2 }}
        >
          {translate('lesson_step_preferences')}
        </DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box sx={{ width: '100%' }}>
            <DialogContent sx={{ p: 0, height: '470px' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', pl: 3 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label={translate('general')}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={translate('solution')}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={translate('preload')}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label={translate('tips')}
                    {...a11yProps(3)}
                  />
                  <Tab
                    label={translate('cover')}
                    {...a11yProps(4)}
                  />
                </Tabs>
              </Box>
              <TabPanel
                value={value}
                index={0}
              >
                <GeneralTab />
              </TabPanel>
              <TabPanel
                value={value}
                index={1}
              >
                <Box>
                  <ModalCodeFullscreen
                    title={translate('this_code_would_be_hint')}
                    name='solution_body'
                  />
                  <RHFCode
                    placeholder={translate('this_code_would_be_hint')}
                    name='solution_body'
                    height='350px'
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
              </TabPanel>
              <TabPanel
                value={value}
                index={2}
              >
                <PreloadTab
                  lessonId={lessonId}
                  contentId={contentId}
                />
              </TabPanel>
              <TabPanel
                value={value}
                index={3}
              >
                <RHFTextField
                  multiline
                  rows={3}
                  name='tips'
                  label={translate('tips')}
                />
              </TabPanel>
              <TabPanel
                value={value}
                index={4}
              >
                <RHFTextField
                  rows={3}
                  name='cover'
                  label={translate('cover')}
                />
                <MediaModal insertImage={insertImage}>
                  <Button sx={{ gap: 1, mt: 1 }}>
                    <TbPhoto size={20} />
                    {translate('insert_media_btn')}
                  </Button>
                </MediaModal>
              </TabPanel>
            </DialogContent>

            <DialogActions sx={{ minHeight: '84px' }}>
              {value !== 2 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpenDialog(false)
                    }}
                  >
                    {translate('actions_close')}
                  </Button>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    loading={isLoading}
                  >
                    {translate('actions_save')}
                  </LoadingButton>
                </Box>
              )}
            </DialogActions>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  )
}
