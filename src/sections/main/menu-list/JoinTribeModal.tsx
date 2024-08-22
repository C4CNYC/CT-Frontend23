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
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFTextField } from '@/components'
import { useJoinClassMutation } from '@/redux/services/manager/classes-student'
import { useTranslate } from '@/utils/translateHelper'

const CreateClassSchema = Yup.object().shape({
  code: Yup.string().required('code is required'),
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

export const AVATAR_SX = {
  position: 'absolute',
  left: {
    xs: 'calc(50% - 20px)',
    sm: 'calc(50% - 25px)',
    md: 'calc(50% - 35px)',
  },
  top: 0,
  width: { xs: '40px', sm: '60px', md: '80px', lg: '100px' },
  height: { xs: '40px', sm: '60px', md: '80px', lg: '100px' },
  background: '#1ACB7F',
  fontSize: { xs: '35px', sm: '40px', md: '60px', lg: '70px' },
  zIndex: 15,
}

export const inputNameStyles = (theme: Theme) => ({
  background: theme.palette.mode === 'light' ? '#fff' : '',
  border: theme.palette.mode === 'light' ? '' : '1px solid #fff',
  pt: 4,
  pb: 3,
  px: { xs: 0, sm: 3 },
  maxWidth: { xs: '300px', sm: '400px', md: '550px' },

  borderRadius: 2,
  '& fieldset': { border: 'none' },
  '.MuiInputBase-input': {
    fontSize: { sm: '30px', md: '30px', lg: '80px' },
    letterSpacing: '28px',
    fontWeight: '700',
  },
})
export const getButtonSx = (theme: Theme) => ({
  background: '#43D4DD33',
  color: '#43D4DD',
  fontSize: '1.5rem',
  m: '0 auto 24px',
  minWidth: '300px',
  '&:hover': {
    background: theme.palette.mode === 'light' ? '' : '#fff',
  },
})

export default function JoinClassModal({ children }: IJoinClassModal): React.ReactElement {
  const { push } = useRouter()
  const [open, setOpenDialog] = useState<boolean>(false)
  const translate = useTranslate()
  const theme = useTheme()

  const [joinClass, { isLoading, isError, isSuccess }] = useJoinClassMutation()
  const buttonSx = useMemo(() => getButtonSx(theme), [theme])
  const methods = useForm<FormJoinClassProps>({
    resolver: yupResolver(CreateClassSchema),
  })
  const onSubmit = async ({ code }: FormJoinClassProps): Promise<void> => {
    try {
      const { status, tribe } = await joinClass({ share_token: code }).unwrap()
      if (status === JoinStatus.JOINED) {
        // setOpenDialog(false)
        // push(STUDENT_PATH_DASHBOARD.class.id(tribe.id))
      }
    } catch (error: any) {
      // enqueueSnackbar(translate('messages_error'), { variant: 'error' })
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
      >
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
                sx={inputNameStyles(theme)}
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
                          color={'#43D4DD'}
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
              disabled={false}
              loading={false}
              sx={buttonSx}
            >
              LOGIN
            </LoadingButton>
          </DialogActions>
          {/* <DialogActions>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                color='error'
                onClick={() => {
                  setOpenDialog(false)
                }}
              >
                {translate('actions_cancel')}
              </Button>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                {translate('actions_lets_go')}
              </LoadingButton>
            </Box>
          </DialogActions> */}
        </FormProvider>
      </Dialog>
    </>
  )
}
