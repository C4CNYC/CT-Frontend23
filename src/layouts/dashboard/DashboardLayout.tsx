import { useState } from 'react'

import { Box } from '@mui/material'

import { useSettingsContext } from '@/components/settings'
// hooks
import { useResponsive } from '@/hooks/useResponsive'

// auth
import AuthGuard from '../../auth/AuthGuard'

import Header from './header'
import Main from './Main'
import NavHorizontal from './nav/NavHorizontal'
import NavMini from './nav/NavMini'
import NavVertical from './nav/NavVertical'

interface Props {
  children?: React.ReactNode
}

export default function DashboardLayout({ children }: Props): React.ReactElement | null {
  const { themeLayout } = useSettingsContext()

  const isDesktop = useResponsive('up', 'md')

  const [open, setOpen] = useState(false)

  const isNavHorizontal = themeLayout === 'horizontal'
  const isNavMini = themeLayout === 'mini'

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const renderNavVertical = (
    <NavVertical
      isManager
      openNav={open}
      onCloseNav={handleClose}
    />
  )

  const renderContent = (): React.ReactElement => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal isManager /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      )
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { md: 'flex' },
              minHeight: { md: 1 },
            }}
          >
            {isDesktop ? <NavMini isManager /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      )
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { md: 'flex' },
            minHeight: { md: 1 },
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    )
  }

  return <AuthGuard> {renderContent()} </AuthGuard>
}
