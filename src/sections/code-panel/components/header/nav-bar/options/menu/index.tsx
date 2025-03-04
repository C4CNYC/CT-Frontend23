import { type ReactNode, useState } from 'react'

import { Divider, Link, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Hamburger from 'hamburger-react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'

import { useAuthContext } from '@/auth/useAuthContext'
import { MenuPopover } from '@/components'
import { useSettingsContext } from '@/components/settings'
import useIsDesktop from '@/hooks/useIsDesktop'
import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'
import { PATH_AUTH } from '@/routes/paths'
import { palette } from '@/theme/palette'
import { UserType } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

import config, { ILinks } from './config'
import {
  DESKTOP_ANCHOR_ORIGIN,
  HAMBURGER_SIZE,
  MENU_ITEM_STYLES,
  MENU_ITEM_TYPOGRAFY,
  MENU_POPOVER_STYLES,
  MOBILE_ANCHOR_ORIGIN,
  SNACKBAR_OPTIONS,
} from './constants'
import MobileHamburger from './MobileHamburger'

interface CustomMultiEvent {
  currentTarget: HTMLElement
}

const Menu = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { replace, pathname } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { themeMode } = useSettingsContext()
  const { isAuthenticated, logout } = useAuthContext()
  const translate = useTranslate()
  const isDesktop = useIsDesktop()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const userName = useSelector((state) => state.global.user?.first_name)
  const userId = useSelector((state) => state.global.user?.id)

  const anchorOriginProps = isDesktop ? DESKTOP_ANCHOR_ORIGIN : MOBILE_ANCHOR_ORIGIN

  const handleLogout = (): void => {
    try {
      logout()
      replace(PATH_AUTH.signIn)
      handleClosePopover()
    } catch (error: any) {
      enqueueSnackbar(translate('messages_unable_to_logout'), SNACKBAR_OPTIONS)
    }
  }

  const handleOpenPopover = (event: CustomMultiEvent): void => {
    setOpenPopover(event.currentTarget)
  }
  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const getHamburger = (isDesktop: boolean): ReactNode => {
    return isDesktop ? (
      <Hamburger
        size={HAMBURGER_SIZE}
        toggled={Boolean(openPopover)}
      />
    ) : pathname.includes('code-panel') ? (
      <MobileHamburger
        open={Boolean(openPopover)}
        handleOpenPopover={handleOpenPopover}
        handleClosePopover={handleClosePopover}
      />
    ) : (
      <Hamburger
        size={HAMBURGER_SIZE}
        toggled={Boolean(openPopover)}
      />
    )
  }

  return (
    <Box className='defaultIntroStudentStep3'>
      <Box
        onClick={handleOpenPopover}
        sx={{ color: palette(themeMode).text.secondary }}
      >
        {getHamburger(isDesktop)}
      </Box>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={MENU_POPOVER_STYLES}
        anchorOrigin={anchorOriginProps}
      >
        {isAuthenticated && (
          <Typography
            height='59px'
            p='16px 20px'
            variant='h6'
            component='h2'
          >
            {translate('hello')} {userName ?? ''}
          </Typography>
        )}

        <Divider />

        {config[userId ? UserType.Authorized : UserType.Anonim].map((menuItem) => {
          if (menuItem.href === ILinks.modal) {
            return menuItem.component?.(
              <MenuItem
                sx={MENU_ITEM_STYLES}
                onClick={() => {
                  if (menuItem.title === 'take_tour') {
                    handleClosePopover()
                    dispatch(setStartTour(true))
                  }
                }}
              >
                {menuItem.icon}
                <Box pr={1}>
                  <Typography
                    sx={MENU_ITEM_TYPOGRAFY}
                    variant='button'
                  >
                    {translate(menuItem.title)}
                  </Typography>
                </Box>
              </MenuItem>,
              menuItem.title
            )
          } else {
            return (
              <Link
                key={menuItem.title}
                component={NextLink}
                href={menuItem.href}
                target={menuItem.target ? menuItem.target : '_self'}
                onClick={() => {
                  if (menuItem.href === ILinks.logout) {
                    handleLogout()
                  }
                }}
                underline='none'
              >
                <MenuItem
                  sx={MENU_ITEM_STYLES}
                  onClick={handleClosePopover}
                >
                  {menuItem.icon}

                  <Box pr={1}>
                    <Typography
                      sx={MENU_ITEM_TYPOGRAFY}
                      variant='button'
                    >
                      {translate(menuItem.title)}
                    </Typography>

                    <br />

                    {menuItem.subTitle && (
                      <Typography variant='caption'>
                        {translate(menuItem.subTitle).toUpperCase()}
                      </Typography>
                    )}
                  </Box>
                </MenuItem>
              </Link>
            )
          }
        })}
      </MenuPopover>
    </Box>
  )
}

export default Menu
