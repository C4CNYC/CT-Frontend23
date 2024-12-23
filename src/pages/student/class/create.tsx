import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, useSnackbar } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import {
  useCreateClassesMutation,
  useUpdateClassesAvatarMutation,
} from '@/redux/services/manager/classes-manager'
import { useGetMySchoolsQuery } from '@/redux/services/manager/schools-manager'
import { useStudentJoinClassMutation } from '@/redux/services/manager/students-manager'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import ChooseShoolModal from '@/sections/main/create-class/ChooseShoolModal'
import CreateClassSkeleton from '@/sections/main/create-class/CreateClassSkeleton'
import CreateHeader from '@/sections/main/create-class/createHeader'
import CreatePalette, { CLASS_PALETTE } from '@/sections/main/create-class/createPalette'
import { createRandomAvatar } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

export function randomInArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

CreateClass.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

interface FormValueProps {
  name: string
  description: string
}

export default function CreateClass(): React.ReactElement {
  const { push, query } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [openDialog, setOpenDialog] = useState(false)
  const [schoolId, setSchoolId] = useState('')
  const [choosenColor, setChoosenColor] = useState(randomInArray(CLASS_PALETTE))
  const translate = useTranslate()
  const { data, isLoading } = useGetMySchoolsQuery({})

  const studentId = useSelector((state) => state.global.user?.student_profile.id)
  const [createClassByManager, { isLoading: createClassLoading }] = useCreateClassesMutation()
  const [studentJoin, { isLoading: isStudentJoining }] = useStudentJoinClassMutation()
  const [updateClassAvatar, { isLoading: isUpdatingAvatar }] = useUpdateClassesAvatarMutation()
  const CreateEmailSchema = Yup.object().shape({
    name: Yup.string().required(translate('required_name')),
    description: Yup.string(),
  })
  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateEmailSchema),
  })

  const onSubmit = async (data: FormValueProps) => {
    try {
      if (schoolId && choosenColor) {
        const classInfo = await createClassByManager({
          schoolId,
          name: data.name,
          description: data.description ?? '',
          cover: choosenColor,
        }).unwrap()
        await studentJoin({
          classId: classInfo.id,
          student_id: studentId as string,
        }).unwrap()
        const file = new FormData()
        const randomAvatar = await createRandomAvatar()
        file.append('file', randomAvatar)
        await updateClassAvatar({
          schoolId,
          classId: classInfo.id,
          file,
        }).unwrap()
        enqueueSnackbar(translate('messages_class_created'))
        if (query.onBoarding) {
          push(
            STUDENT_PATH_DASHBOARD.class.addQuest(classInfo.id, {
              schoolId,
              onBoarding: query.onBoarding as string,
            })
          )
          return
        } else {
          push(STUDENT_PATH_DASHBOARD.class.id(classInfo.id))
        }
      }
    } catch (error: any) {
      enqueueSnackbar(error.data.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    if (data?.data && data?.data.length > 1) {
      setOpenDialog(true)
    }
  }, [isLoading])

  if (isLoading) {
    return <CreateClassSkeleton />
  }

  return (
    <>
      <Head>
        <title>{translate('class_create_class')} | CodeTribe</title>
      </Head>
      <Container
        maxWidth={false}
        disableGutters
      >
        <ChooseShoolModal
          openDialog={openDialog}
          setOpenDialog={(open: boolean) => {
            setOpenDialog(open)
          }}
          schoolId={schoolId}
          setSchoolId={(id: string) => {
            setSchoolId(id)
          }}
          schools={data?.data}
        />
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <CreateHeader choosenColor={choosenColor} />
          <CreatePalette
            choosenColor={choosenColor}
            setChoosenColor={(color: string) => {
              setChoosenColor(color)
            }}
          />
          <Stack
            sx={(theme) => ({
              position: 'sticky',
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 3,
              pr: { xs: 2, sm: 3, lg: 4 },
              pt: 2,
              pb: 2,
              backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : 'initial',
            })}
            className='tourClassStep1'
          >
            <Button
              size='large'
              variant='soft'
              color='error'
              onClick={async () => await push(STUDENT_PATH_DASHBOARD.class.root)}
            >
              {translate('actions_cancel')}
            </Button>
            <LoadingButton
              size='large'
              variant='contained'
              color='secondary'
              type='submit'
              loading={createClassLoading || isUpdatingAvatar || isStudentJoining}
            >
              {translate('actions_create')}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  )
}
