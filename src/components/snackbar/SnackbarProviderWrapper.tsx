import { useRef } from 'react'

import { Box, IconButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { SnackbarProvider, SnackbarKey } from 'notistack'

import { Iconify, IconifyProps } from '../iconify'

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
              icon='eva:info-fill'
              color='info'
            />
          ),
          success: (
            <SnackbarIcon
              icon='eva:checkmark-circle-2-fill'
              color='success'
            />
          ),
          warning: (
            <SnackbarIcon
              icon='eva:alert-triangle-fill'
              color='warning'
            />
          ),
          error: (
            <SnackbarIcon
              icon='eva:alert-circle-fill'
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
            <Iconify icon='eva:close-fill' />
          </IconButton>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  )
}

interface SnackbarIconProps {
  icon: IconifyProps
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
      <Iconify
        icon={icon}
        width={24}
      />
    </Box>
  )
}
