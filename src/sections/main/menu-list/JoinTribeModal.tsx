import { useMemo, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormGroup,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

import { FormProvider, RHFTextField } from '@/components'
import { useJoinClassMutation } from '@/redux/services/manager/classes-student'
import { RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { IClass } from '@root/src/redux/interfaces/class.interface'
import { PATH_AUTH } from '@root/src/routes/paths'

import { AVATAR_SX, getButtonSx, inputNameStyles } from './constants'
import SuccessJoin from './SuccessJoin'

const CreateClassSchema = Yup.object().shape({
  code: Yup.string().required('code is required').min(10),
})

export interface FormJoinClassProps {
  code: string
}

interface IJoinClassModal {
  children: React.ReactElement
}

enum JoinStatus {
  JOINED = 'joined',
  PENDING = 'pending',
}

export default function JoinClassModal({ children }: IJoinClassModal): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false)
  const [tribeInfo, setTribeInfo] = useState<null | IClass>(null)
  const translate = useTranslate()
  const profile = useSelector((state: RootState) => state.global.user)
  const theme = useTheme()

  const [joinClass, { isError, isSuccess }] = useJoinClassMutation()
  const buttonSx = useMemo(() => getButtonSx(theme), [theme])
  const methods = useForm<FormJoinClassProps>({
    resolver: yupResolver(CreateClassSchema),
    mode: 'onChange',
  })
  const isValid = methods.formState.isValid

  const onSubmit = async ({ code }: FormJoinClassProps): Promise<void> => {
    if (profile) {
      try {
        const { status, tribe } = await joinClass({ share_token: code }).unwrap()
        if (status === JoinStatus.JOINED) {
          setTribeInfo(tribe)
        }
      } catch (error: any) {}
    }
  }

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        {children}
      </Box>
      <Dialog
        maxWidth='md'
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
        PaperProps={{
          sx: {
            minWidth: { xs: '300px', sm: '300px', md: '500px', lg: '550px' },
          },
        }}
      >
        {!isSuccess ? (
          <>
            <DialogTitle
              variant='h3'
              textAlign='center'
            >
              {!isError ? 'I got a join-code' : 'We can’t find this tribe or quest'}
              <Typography
                textAlign='center'
                variant='body1'
                maxWidth={500}
              >
                {!isError
                  ? 'Enter your join-code below'
                  : 'Either you typed it wrong or this tribe is no longer available. Ask your lead or teacher.'}
              </Typography>
            </DialogTitle>
            <FormProvider
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <DialogContent>
                <FormGroup sx={{ position: 'relative', pt: 4 }}>
                  <Avatar sx={AVATAR_SX}>{!isError ? '🤩' : '🤔'}</Avatar>
                  <RHFTextField
                    sx={inputNameStyles(theme, isValid)}
                    required
                    name='code'
                    placeholder={translate('tribes_code_example')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            type='submit'
                          >
                            <FaArrowRight
                              color={isValid ? '#75CF6D' : '#43D4DD'}
                              size={40}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormGroup>
              </DialogContent>
              <Divider sx={{ m: '34px auto 0', maxWidth: '300px' }}>OR</Divider>
              <DialogActions>
                <LoadingButton
                  sx={buttonSx}
                  LinkComponent={Link}
                  href={PATH_AUTH.signIn}
                >
                  LOGIN
                </LoadingButton>
              </DialogActions>
            </FormProvider>
          </>
        ) : (
          <SuccessJoin
            name={tribeInfo?.mentors && tribeInfo?.mentors[0].first_name}
            icon={tribeInfo?.avatar}
            location={'Bali, Indonesia'}
            title={tribeInfo?.name}
            handleCloseModal={() => setOpenDialog(false)}
          />
        )}
      </Dialog>
    </>
  )
}
