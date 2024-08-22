import { useState } from 'react'

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { Iconify, Image, MenuPopover, useSettingsContext } from '@root/src/components'
import { StyledIcon, StyledItem } from '@root/src/components/nav-section/mini/styles'
import {
  StyledIcon as StyledIconVertical,
  StyledItem as StyledItemVertical,
} from '@root/src/components/nav-section/vertical/styles'
import { useResponsive } from '@root/src/hooks'
import { useLocales } from '@root/src/locales'
import { Role } from '@root/src/redux/services/enums/role.enum'

import DiamondFeatureModal from './diamond-feature-modal'

export default function MyCreationsMenu(): React.ReactElement {
  const { translate } = useLocales()
  const { themeLayout } = useSettingsContext()
  const isDesktop = useResponsive('up', 'md')
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  return (
    <>
      <RoleBasedGuard roles={[Role.Admin]}>
        {themeLayout === 'vertical' || !isDesktop ? (
          <StyledItemVertical
            depth={1}
            onClick={handleOpenPopover}
          >
            <StyledIconVertical>
              <Image
                src='/assets/my-creations-menu/unicorn.svg'
                alt=''
              />
            </StyledIconVertical>
            <ListItemText
              primary={`${translate('sidebar_menu_my_creations')}`}
              primaryTypographyProps={{
                noWrap: true,
                component: 'span',
                variant: openPopover ? 'subtitle2' : 'body2',
                fontSize: 18,
              }}
              secondaryTypographyProps={{
                noWrap: true,
                variant: 'caption',
              }}
            />
          </StyledItemVertical>
        ) : (
          <StyledItem
            depth={1}
            onClick={handleOpenPopover}
          >
            <StyledIcon>
              <Image
                src='/assets/my-creations-menu/unicorn.svg'
                alt=''
              />
            </StyledIcon>
            <ListItemText
              primary={`${translate('sidebar_menu_my_creations')}`}
              primaryTypographyProps={{
                noWrap: true,
                sx: {
                  width: 72,
                  fontSize: 10,
                  lineHeight: '16px',
                  textAlign: 'center',
                },
              }}
            />
          </StyledItem>
        )}

        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow='left-center'
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        >
          <MenuItem>Add New Lesson</MenuItem>
          <MenuItem>My Lessons</MenuItem>
          <MenuItem>My Modules</MenuItem>
          <DiamondFeatureModal>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              My Courses
              <ListItemIcon sx={{ pl: 2, mr: -2 }}>
                <Iconify
                  icon='ion:diamond-outline'
                  color='#43D4DD'
                />
              </ListItemIcon>
            </MenuItem>
          </DiamondFeatureModal>
          <DiamondFeatureModal>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              Integrations
              <ListItemIcon
                sx={{
                  pl: 2,
                  mr: -2,
                }}
              >
                <Iconify
                  icon='ion:diamond-outline'
                  color='#43D4DD'
                />
              </ListItemIcon>
            </MenuItem>
          </DiamondFeatureModal>
        </MenuPopover>
      </RoleBasedGuard>
    </>
  )
}
