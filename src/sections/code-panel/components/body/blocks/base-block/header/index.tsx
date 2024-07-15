import { type FC, type ReactNode, useMemo } from 'react'

import { Box, Button, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose'

import useIsDesktop from '@/hooks/useIsDesktop'

// import { localStorageAvailable } from "@utils";
import { BUTTON_SX, TYP_SX, getHeaderWrapperSx } from './constants'

interface HeaderProps {
  title: ReactNode
  icon: React.ReactElement
  isLeftBtn?: boolean
  isLeftBlock?: boolean
  closeHandler: () => void
  hideTabsHandler?: () => void
}

const Header: FC<HeaderProps> = ({ title, icon, isLeftBtn, closeHandler, isLeftBlock }) => {
  const theme = useTheme()
  const isDesktop = useIsDesktop()
  const headerSx = useMemo(() => getHeaderWrapperSx(isDesktop), [isDesktop])

  return (
    <Tooltip
      title={title}
      placement='top'
    >
      <Box sx={headerSx}>
        <Stack direction='row'>
          {icon}

          <Typography
            variant='subtitle1'
            sx={TYP_SX}
          >
            {title}
          </Typography>
        </Stack>

        <Button
          onClick={() => {
            closeHandler()
          }}
          sx={BUTTON_SX}
        >
          <AiOutlineClose size={20} />
        </Button>
      </Box>
    </Tooltip>
  )
}

export default Header
