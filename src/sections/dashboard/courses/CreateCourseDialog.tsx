import React from 'react'
import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  DialogContent,
  FormGroup,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import {
  CourseModuleAutocomplete,
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  SingleFilePreview,
  useSnackbar,
} from '@/components'
import {
  useCreateCourseMutation,
  useUpdateCourseCoverMutation,
  useUpdateCourseMutation,
} from '@/redux/services/manager/courses-manager'
import { useTranslate } from '@/utils/translateHelper'

import AuthorsTab from './authors-tab/AuthorsTab'

interface FormValuesProps {
  name: string
  content_id: string
  level: string
  price: string
  description: string
  active: boolean
  public: boolean
  catalog: boolean
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  skills: []
}

interface Prop {
  defaultValues?: FormValuesProps
  children: React.ReactElement
  isEdit?: boolean
  id: string
}

export default function CreateCourseDialog({
  id,
  isEdit = false,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<null | File>(null)

  const [editCourse, { isLoading: isEditLoading }] = useUpdateCourseMutation()
  const [createCourse, { isLoading: isCreateLoading }] = useCreateCourseMutation()
  const [updateCover] = useUpdateCourseCoverMutation()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required(translate('required_name')),
    level: Yup.string().required(translate('required_level')),
    price: Yup.string().required(translate('required_price')),
    description: Yup.string().required(translate('required_description')),
    content_id: Yup.string().required(translate('required_content_id')),
    initial_likes: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(translate('required_initial_likes')),
    initial_stars: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(translate('required_initial_stars')),
    initial_enrolled: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(translate('required_initial_enrolled')),
    skills: Yup.array(),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues,
  })

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }
  const handleDrop = (files: File[]): void => {
    setUploadedFile(files[0])
  }

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const file = new FormData()
      if (isEdit && id) {
        await editCourse({
          id,
          ...data,
        }).unwrap()

        if (uploadedFile) {
          file.append('file', uploadedFile)
          await updateCover({ id, file }).unwrap()
        }
      } else {
        const course = await createCourse(data).unwrap()

        if (uploadedFile) {
          file.append('file', uploadedFile)
          await updateCover({ id: course.id, file }).unwrap()
        }
      }

      enqueueSnackbar(
        !isEdit ? translate('messages_create_success') : translate('messages_update_success')
      )
      methods.reset()
      setOpen(false)
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      })
    }
  }
  const clearFileHandler = (): void => {
    setUploadedFile(null)
  }

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          variant='h5'
          sx={{
            pb: 1,
            pt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {isEdit ? translate('actions_edit') : translate('courses_create')}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {isEdit ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{ ml: 3 }}
              >
                <Tab
                  label={translate('general')}
                  {...a11yProps(0)}
                />

                <Tab
                  label={translate('courses_modules')}
                  {...a11yProps(1)}
                />
                {isEdit ? (
                  <Tab
                    label={translate('courses_authors')}
                    {...a11yProps(2)}
                  />
                ) : null}
              </Tabs>
            </Box>
          ) : null}
          <TabPanel
            value={value}
            index={0}
          >
            <FormProvider
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Stack gap={3}>
                <Box sx={{ position: 'relative' }}>
                  {uploadedFile ? (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '5px',
                        top: '5px',
                        zIndex: 10,
                        width: '20px',
                        height: '20px',
                        p: 0,
                      }}
                      onClick={clearFileHandler}
                    >
                      <IoMdClose size='20px' />
                    </IconButton>
                  ) : null}
                  <RHFUpload
                    name='course_img'
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant='caption'
                        noWrap
                        width='90px'
                        sx={{
                          mt: 1,
                          mb: -1,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        {uploadedFile?.name}
                      </Typography>
                    }
                  />
                  <SingleFilePreview
                    file={uploadedFile ? URL.createObjectURL(uploadedFile) : null}
                  />
                </Box>
                <RHFTextField
                  sx={{ width: '100%' }}
                  name='name'
                  label={translate('courses_course_name')}
                />
                <RHFTextField
                  sx={{ width: '100%' }}
                  name='content_id'
                  label={translate('courses_content_id')}
                  placeholder='W1'
                />
                <RHFSelect
                  native
                  name='level'
                  label={translate('courses_course_level')}
                >
                  <option
                    key='empty'
                    value='empty'
                  >
                    {translate('courses_select_level')}
                  </option>
                  <option
                    key='beginner'
                    value='beginner'
                  >
                    {translate('beginner')}
                  </option>
                  <option
                    key='intermediate'
                    value='intermediate'
                  >
                    {translate('intermediate')}
                  </option>
                  <option
                    key='advanced'
                    value='advanced'
                  >
                    {translate('advanced')}
                  </option>
                </RHFSelect>
                <FormGroup
                  row
                  style={{ flexWrap: 'nowrap' }}
                >
                  <Button
                    variant='contained'
                    sx={{
                      maxHeight: '56px',
                      bgcolor: 'grey.400',
                      color: 'grey.800',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    disableElevation
                  >
                    $
                  </Button>
                  <RHFTextField
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeftColor: 'transparent',
                      },
                    }}
                    name='price'
                    label={translate('courses_course_price')}
                    type='number'
                  />
                </FormGroup>
                <RHFTextField
                  sx={{ width: '100%' }}
                  name='initial_likes'
                  label={translate('courses_initial_likes')}
                  type='number'
                />
                <RHFTextField
                  sx={{ width: '100%' }}
                  name='initial_stars'
                  label={translate('courses_initial_stars')}
                  type='number'
                />
                <RHFTextField
                  sx={{ width: '100%' }}
                  name='initial_enrolled'
                  label={translate('courses_initial_enrolled')}
                  type='number'
                />
                <RHFTextField
                  name='description'
                  label={translate('courses_course_description')}
                  multiline
                  rows={3}
                />
                <Stack direction='row'>
                  <RHFSwitch
                    name='active'
                    label={translate('courses_course_active')}
                  />
                  <RHFSwitch
                    name='public'
                    label={translate('public')}
                  />
                  <RHFSwitch
                    name='catalog'
                    label={translate('Catalog')}
                  />
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  mt: { xs: 3, sm: 7 },
                }}
              >
                <Button
                  color='error'
                  variant='soft'
                  onClick={handleClose}
                >
                  {translate('actions_close')}
                </Button>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={isEditLoading || isCreateLoading}
                >
                  {translate('actions_save')}
                </LoadingButton>
              </Box>
            </FormProvider>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
          >
            <CourseModuleAutocomplete id={id} />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
          >
            <AuthorsTab courseId={id} />
          </TabPanel>
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
            py: { xs: 1, sm: 3 },
            px: { xs: 2, sm: 3 },
            height: 'auto',
            minHeight: 600,
            overflowY: 'auto',
            width: { xs: '330px', sm: '350px', md: '450px' },
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
