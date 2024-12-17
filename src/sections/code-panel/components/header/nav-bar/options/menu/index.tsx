import { type ReactNode, useState } from 'react'

import { Divider, Link, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Hamburger from 'hamburger-react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'

import { useAuthContext } from '@/auth/useAuthContext'
import { Iconify, MenuPopover } from '@/components'
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
  GLOBAL_BOX_STYLES,
  HUMBURGER_SIZE,
  MENU_ICONIFY,
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
  const isDesktop = useIsDesktop()
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { themeMode } = useSettingsContext()
  const { isAuthenticated, logout } = useAuthContext()
  const userName = useSelector((state) => state.global.user?.first_name)
  const userId = useSelector((state) => state.global.user?.id)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const translate = useTranslate()
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

  const getHumburger = (isDesktop: boolean): ReactNode => {
    return isDesktop ? (
      <Hamburger
        size={HUMBURGER_SIZE}
        toggled={Boolean(openPopover)}
      />
    ) : (
      <MobileHamburger
        open={Boolean(openPopover)}
        handleOpenPopover={handleOpenPopover}
        handleClosePopover={handleClosePopover}
      />
    )
  }

  const anchorOriginProps = isDesktop ? DESKTOP_ANCHOR_ORIGIN : MOBILE_ANCHOR_ORIGIN

  return (
    <Box
      sx={!isDesktop ? GLOBAL_BOX_STYLES : null}
      className='defaultIntroStudentStep3'
    >
      <Box
        onClick={handleOpenPopover}
        sx={{ color: palette(themeMode).text.secondary }}
      >
        {getHumburger(isDesktop)}
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
                <Iconify
                  sx={MENU_ICONIFY}
                  icon={menuItem.icon}
                />

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
                  <Iconify
                    sx={MENU_ICONIFY}
                    icon={menuItem.icon}
                  />

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
