import { ReactNode, useRef } from 'react'

import { Box, IconButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { IoIosCheckmarkCircle } from '@react-icons/all-files/io/IoIosCheckmarkCircle'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { LuInfo } from '@react-icons/all-files/lu/LuInfo'
import { TbAlertCircleFilled } from '@react-icons/all-files/tb/TbAlertCircleFilled'
import { TbAlertTriangleFilled } from '@react-icons/all-files/tb/TbAlertTriangleFilled'
import { SnackbarProvider, SnackbarKey } from 'notistack'

import { StyledNotistack } from './styles'

export interface SnackbarProviderWrapperProps {
  children: React.ReactNode
}

export function SnackbarProviderWrapper({
  children,
}: SnackbarProviderWrapperProps): React.ReactElement | null {
  const notistackRef = useRef<any>(null)

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <>
      <SnackbarProvider
        Components={{
          default: StyledNotistack,
          info: StyledNotistack,
          success: StyledNotistack,
          warning: StyledNotistack,
          error: StyledNotistack,
        }}
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant='success' // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: (
            <SnackbarIcon
              icon={<LuInfo size={24} />}
              color='info'
            />
          ),
          success: (
            <SnackbarIcon
              icon={<IoIosCheckmarkCircle size={24} />}
              color='success'
            />
          ),
          warning: (
            <SnackbarIcon
              icon={<TbAlertTriangleFilled size={24} />}
              color='warning'
            />
          ),
          error: (
            <SnackbarIcon
              icon={<TbAlertCircleFilled size={24} />}
              color='error'
            />
          ),
        }}
        // With close as default
        action={(key) => (
          <IconButton
            size='small'
            onClick={onClose(key)}
            sx={{ p: 0.5 }}
          >
            <IoClose />
          </IconButton>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  )
}

interface SnackbarIconProps {
  icon: ReactNode
  color: 'info' | 'success' | 'warning' | 'error'
}

function SnackbarIcon({ icon, color }: SnackbarIconProps): React.ReactElement | null {
  return (
    <Box
      component='span'
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      {icon}
    </Box>
  )
}
