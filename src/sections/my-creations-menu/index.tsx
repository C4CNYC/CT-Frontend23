import { useState } from 'react'

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'

import {
  useCreateByCloningLessonMutation,
  useCreateLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { Iconify, Image, MenuPopover, useSettingsContext } from '@root/src/components'
import { StyledIcon, StyledItem } from '@root/src/components/nav-section/mini/styles'
import {
  StyledIcon as StyledIconVertical,
  StyledItem as StyledItemVertical,
} from '@root/src/components/nav-section/vertical/styles'
import { useResponsive } from '@root/src/hooks'
import { Role } from '@root/src/redux/services/enums/role.enum'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { useTranslate } from '@root/src/utils/translateHelper'

import AiGenerateLessonDialog from './ai-generate-lesson-dialog'
import DiamondFeatureModal from './diamond-feature-modal'
import { SelectTemplateDialog } from './select-template-dialog'

export default function MyCreationsMenu(): React.ReactElement {
  const router = useRouter()
  const theme = useTheme()
  const translate = useTranslate()
  const { themeLayout } = useSettingsContext()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const isDesktop = useResponsive('up', 'md')
  const isRTL = theme.direction === 'rtl'

  const [createLesson] = useCreateLessonMutation()
  const [createByCloningLesson] = useCreateByCloningLessonMutation()

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  async function createByCloningLessonHandler() {
    let data = await createByCloningLesson()
    if ((data as any)?.data?.id) {
      router.push(
        `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: (data as any).data.id })}`,
        undefined,
        {
          shallow: true,
        }
      )
    }
  }

  const createNewLesson = async () => {
    const lesson = await createLesson({
      name: translate('my_new_lesson') as string,
      description: translate('my_lesson_description') as string,
      active: true,
      duration: '60',
    }).unwrap()
    return lesson
  }

  return (
    <>
      <RoleBasedGuard roles={[Role.SuperAdmin, Role.Admin, Role.Manager, Role.Owner]}>
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
          <AiGenerateLessonDialog>
            <MenuItem
              sx={{ justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              {translate('sidebar_menu_my_creations_item_1')}
              <ListItemIcon sx={{ pl: isRTL ? 0 : 2, mr: -2 }}>
                <Iconify
                  icon='mingcute:ai-line'
                  color='#FBDD3F'
                />
              </ListItemIcon>
            </MenuItem>
          </AiGenerateLessonDialog>
          <SelectTemplateDialog>
            <MenuItem sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {' '}
              {translate('sidebar_menu_my_creations_item_8')}
            </MenuItem>
          </SelectTemplateDialog>
          <MenuItem
            onClick={async () => {
              await createByCloningLessonHandler()
            }}
            sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            {translate('sidebar_menu_my_creations_item_2')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(STUDENT_PATH_DASHBOARD.myLessons, undefined, {
                shallow: true,
              })
              handleClosePopover()
            }}
            sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            {translate('sidebar_menu_my_creations_item_3')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(STUDENT_PATH_DASHBOARD.myModules, undefined, {
                shallow: true,
              })
              handleClosePopover()
            }}
            sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            {translate('sidebar_menu_my_creations_item_4')}
          </MenuItem>
          <DiamondFeatureModal>
            <MenuItem
              sx={{ justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              {translate('sidebar_menu_my_creations_item_5')}
              <ListItemIcon sx={{ pl: isRTL ? 0 : 2, mr: -2, ml: isRTL ? 2 : 0 }}>
                <Iconify
                  icon='ion:diamond-outline'
                  color='#43D4DD'
                />
              </ListItemIcon>
            </MenuItem>
          </DiamondFeatureModal>
          <DiamondFeatureModal>
            <MenuItem
              sx={{ justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              {translate('sidebar_menu_my_creations_item_6')}
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
          <DiamondFeatureModal>
            <MenuItem
              sx={{ justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              {translate('sidebar_menu_my_creations_item_7')}
              <ListItemIcon
                sx={{
                  pl: isRTL ? 0 : 2,
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
