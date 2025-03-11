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

import { useJoinClassMutation } from '@/redux/services/manager/classes-student'
import { RootState } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { FormProvider } from '@root/src/components/hook-form/FormProvider'
import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'
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
  const theme = useTheme()
  const translate = useTranslate()

  const [open, setOpenDialog] = useState<boolean>(false)
  const [tribeInfo, setTribeInfo] = useState<null | IClass>(null)

  const profile = useSelector((state: RootState) => state.global.user)

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
        maxWidth='sm'
        fullWidth
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
      >
        {!isSuccess ? (
          <>
            <DialogTitle
              variant='h3'
              textAlign='center'
            >
              {translate(!isError ? 'join_class_dialog_title' : 'join_class_dialog_title_1')}

              <Typography
                textAlign='center'
                variant='body1'
                maxWidth={500}
              >
                {translate(
                  !isError ? 'join_class_dialog_enter_code' : 'join_class_dialog_enter_code_1'
                )}
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
              <Divider sx={{ m: '34px auto 0', maxWidth: '300px' }}>
                {translate('share_modal_or')}
              </Divider>
              <DialogActions>
                <LoadingButton
                  sx={buttonSx}
                  LinkComponent={Link}
                  href={PATH_AUTH.signIn}
                >
                  {translate('login')}
                </LoadingButton>
              </DialogActions>
            </FormProvider>
          </>
        ) : (
          <SuccessJoin
            name={tribeInfo?.mentors && tribeInfo?.mentors[0].first_name}
            icon={tribeInfo?.avatar}
            title={tribeInfo?.name}
            handleCloseModal={() => setOpenDialog(false)}
          />
        )}
      </Dialog>
    </>
  )
}
