import { useState } from 'react'

import { Box } from '@mui/material'

import { useSettingsContext } from '@/components/settings'
import { useResponsive } from '@/hooks/useResponsive'

import AuthGuard from '../../auth/AuthGuard'

import Header from './header'
import Main from './Main'
import NavHorizontal from './nav/NavHorizontal'
import NavMini from './nav/NavMini'
import NavVertical from './nav/NavVertical'

interface IStudentDashboardLayoutProps {
  children?: React.ReactNode
}

export function StudentDashboardLayout({
  children,
}: IStudentDashboardLayoutProps): React.ReactElement | null {
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
      openNav={open}
      onCloseNav={handleClose}
    />
  )

  const renderContent = (): React.ReactElement => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

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
            {isDesktop ? <NavMini /> : renderNavVertical}

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
