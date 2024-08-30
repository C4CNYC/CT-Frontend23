import { useState } from 'react'

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'

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
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import CreateLessonDialog from '@root/src/sections/dashboard/lessons/CreateLessonDialog/CreateLessonDialog'

import DiamondFeatureModal from './diamond-feature-modal'

export default function MyCreationsMenu(): React.ReactElement {
  const { translate } = useLocales()
  const { themeLayout } = useSettingsContext()
  const isDesktop = useResponsive('up', 'md')
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const router = useRouter()

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
      <RoleBasedGuard roles={[Role.Admin, Role.Manager, Role.Owner]}>
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
          <CreateLessonDialog isEdit={false}>
            <MenuItem>Add New Lesson</MenuItem>
          </CreateLessonDialog>
          <MenuItem
            onClick={() => {
              router.push(STUDENT_PATH_DASHBOARD.myLessons, undefined, {
                shallow: true,
              })
              handleClosePopover()
            }}
          >
            My Lessons
          </MenuItem>
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
